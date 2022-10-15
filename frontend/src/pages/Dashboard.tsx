import Loader from "../components/Loader";
import { useSession } from "../context/session";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import AddBook from "../components/books/AddBooks";
import Books from "../components/books/Books";
import { Roles } from "../constants/app";
import { IBook } from "../interface/app";
import { useBookApi } from "../services/Books";

const Dashboard = () => {
  const { user, isLoggedIn } = useSession();
  const booksApi = useBookApi();
  const navigate = useNavigate();
  const [books, setBooks] = useState<IBook[]>([]);

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
        />
      </Col>
      <Col>
        <Books books={books} setBooks={setBooks} roles={user.roles} />
      </Col>
    </Row>
  );
};

export default Dashboard;
