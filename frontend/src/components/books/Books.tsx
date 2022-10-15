import { FC } from "react";
import { Table, ButtonGroup, Button } from "react-bootstrap";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { IBook } from "../../interface/app";

const DisplayBook: FC<IBook> = ({ title, author, publishedYear }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{author}</td>
      <td>{publishedYear}</td>
      <td>
        <ButtonGroup>
          <Button variant="primary" size="sm">
            <FaPenAlt /> Edit
          </Button>
          <Button variant="danger" size="sm">
            <FaTrashAlt /> Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

interface IBooksProps {
  books?: IBook[];
}

const Books: FC<IBooksProps> = ({ books }) => {
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
            books.map((book, key) => <DisplayBook {...book} key={key} />)
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
