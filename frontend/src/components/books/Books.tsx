import { Dispatch, FC } from "react";
import { Table, ButtonGroup, Button } from "react-bootstrap";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { ApiResponseError, IBook } from "../../interface/app";
import { useBookApi } from "../../services/Books";

interface IProps extends IBook {
  hideInfo?: boolean;
  handleDelete: (param: string) => void;
}
const DisplayBook: FC<IProps> = ({
  id,
  title,
  author,
  publishedYear,
  handleDelete,
  hideInfo = false,
}) => {
  return (
    <tr>
      {hideInfo ? (
        <td colSpan={3}> No Viewer Role</td>
      ) : (
        <>
          <td>{title}</td>
          <td>{author}</td>
          <td>{publishedYear}</td>
        </>
      )}
      <td>
        <ButtonGroup>
          <Button
            variant="primary"
            size="sm"
            onClick={() => console.log("Edit")}
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
      </td>
    </tr>
  );
};

interface IBooksProps {
  roles: string[];
  books?: IBook[];
  setBooks: Dispatch<React.SetStateAction<IBook[]>>;
}

const Books: FC<IBooksProps> = ({ books, setBooks, roles }) => {
  const bookApi = useBookApi();
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
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year Published</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books && books.length > 0 ? (
            books.map((book, key) => (
              <DisplayBook
                {...book}
                key={key}
                handleDelete={handleDelete}
                hideInfo
              />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
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
