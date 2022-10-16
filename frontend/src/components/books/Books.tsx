import { Dispatch, FC, useState } from "react";
import { Table, ButtonGroup, Button, Card, FormCheck } from "react-bootstrap";
import { FaPenAlt, FaTrashAlt, FaSort, FaFilter } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "react-toastify";
import { Roles } from "../../constants/app";
import {
  ApiResponseError,
  IBook,
  IBookInitialValues,
} from "../../interface/app";
import { useBookApi } from "../../services/Books";

dayjs.extend(relativeTime);

interface IProps extends IBook {
  hideInfo?: boolean;
  handleDelete: (param: string) => void;
  handleEdit: (param: string) => void;
  haveActions?: boolean;
}
const DisplayBook: FC<IProps> = ({
  id,
  title,
  author,
  publishedYear,
  createdAt,
  handleDelete,
  handleEdit,
  hideInfo = false,
  haveActions = false,
}) => {
  return (
    <tr>
      {hideInfo ? (
        <td colSpan={4}> No Viewer Role</td>
      ) : (
        <>
          <td>{title}</td>
          <td>{author}</td>
          <td>{publishedYear}</td>
          <td>{dayjs(createdAt).fromNow()}</td>
        </>
      )}
      <td>
        {haveActions && (
          <>
            <ButtonGroup>
              <Button
                variant="primary"
                size="sm"
                onClick={handleEdit.bind(null, id)}
              >
                <FaPenAlt /> Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete.bind(null, id)}
              >
                <FaTrashAlt /> Delete
              </Button>
            </ButtonGroup>
          </>
        )}
      </td>
    </tr>
  );
};

interface IBooksProps {
  userId: string;
  roles: string[];
  books?: IBook[];
  setBooks: Dispatch<React.SetStateAction<IBook[]>>;
  setInitialValues: Dispatch<React.SetStateAction<IBookInitialValues>>;
}

const Books: FC<IBooksProps> = ({
  books,
  setBooks,
  roles,
  userId,
  setInitialValues,
}) => {
  const bookApi = useBookApi();
  const [oldNew, setOldNew] = useState<string>();

  const handleDelete = async (id: string) => {
    try {
      const { data } = await bookApi.delete(id);
      if (data.success) {
        setBooks((prev) => prev.filter((book) => book.id !== data.id));
        toast.success("Successfully deleted");
      }
    } catch (error) {
      const err = error as ApiResponseError;
      if ([400, 401].includes(err.status)) {
        toast.error(err.message.message);
      }
    }
  };

  const handleEdit = async (id: string) => {
    const book = books?.find((r) => r.id === id);
    if (book) {
      setInitialValues({
        id: book.id,
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
      });
    }
  };

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const query = e.currentTarget.name;
    if (oldNew) {
      (async () => {
        try {
          const { data } = await bookApi.get(`/?${oldNew}=${query}`);
          setBooks(data);
        } catch {}
      })();
    }
  };
  const handleOldNew = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setOldNew(e.currentTarget.value);
  };
  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <div className="mb-3">
            <FormCheck
              type="radio"
              name="timeframe"
              value="new"
              id="new"
              label="Within 10 minutes"
              onClick={handleOldNew}
            />
            <FormCheck
              type="radio"
              name="timeframe"
              value="old"
              onClick={handleOldNew}
              id="old"
              label="10 minutes ago"
            />
          </div>
          <ButtonGroup>
            <Button name="1" variant="warning" onClick={handleFilter}>
              <FaFilter /> Filter
            </Button>
            <Button name="2" variant="info" onClick={handleFilter}>
              <FaSort /> Sort
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year Published</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books && books.length > 0 ? (
            books.map((book, key) => (
              <DisplayBook
                {...book}
                key={key}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                haveActions={book.createdBy === userId}
                hideInfo={
                  !roles
                    .map((role) => role.toLocaleUpperCase())
                    .some(
                      (r) =>
                        r === Roles.VIEWER.toLocaleUpperCase() ||
                        r === Roles.VIEW_ALL.toLocaleUpperCase()
                    )
                }
              />
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No books found!
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Books;
