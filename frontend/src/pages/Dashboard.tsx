import Loader from "../components/Loader";
import { useSession } from "../context/session";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import AddBook from "../components/books/AddBooks";
import Books from "../components/books/Books";
import { Roles } from "../constants/app";
import { IBook, IBookInitialValues } from "../interface/app";
import { useBookApi } from "../services/Books";

const Dashboard = () => {
  const { user, isLoggedIn } = useSession();
  const booksApi = useBookApi();
  const navigate = useNavigate();
  const [books, setBooks] = useState<IBook[]>([]);
  const [initialValues, setInitialValues] = useState<IBookInitialValues>({
    id: "",
    author: "",
    title: "",
    publishedYear: "",
  });

  useEffect(() => {
    (async () => {
      const { data } = await booksApi.get("/");
      setBooks(data);
    })();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!user) {
    return <Loader />;
  }

  return (
    <Row>
      <Col md={4}>
        <AddBook
          canAdd={user.roles
            .map((role) => role.toUpperCase())
            .includes(Roles.CREATOR.toUpperCase())}
          setBooks={setBooks}
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      </Col>
      <Col>
        <Books
          books={books}
          setBooks={setBooks}
          roles={user.roles}
          userId={user.id}
          setInitialValues={setInitialValues}
        />
      </Col>
    </Row>
  );
};

export default Dashboard;
