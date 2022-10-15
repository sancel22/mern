import { Card, FormControl, FloatingLabel, Button } from "react-bootstrap";
import { FaBook } from "react-icons/fa";
import { Formik, Form } from "formik";
import { Dispatch, FC } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useBookApi } from "../../services/Books";
import { ApiResponseError, IBook } from "../../interface/app";

const BookSchema = Yup.object().shape({
  title: Yup.string().required("Please input book title"),
  author: Yup.string().required("Please input author"),
  publishedYear: Yup.number()
    .typeError("Published year must be a number")
    .required("Please input year it was published"),
});
interface IAddBook {
  canAdd: boolean;
  setBooks: Dispatch<React.SetStateAction<IBook[]>>;
}

const AddBook: FC<IAddBook> = ({ canAdd, setBooks }) => {
  const bookApi = useBookApi();
  return (
    <Card>
      <Card.Header as="h3">
        <FaBook />
        <span className="ms-2">Add Book</span>
      </Card.Header>
      <Card.Body>
        {canAdd ? (
          <Formik
            initialValues={{
              title: "",
              author: "",
              publishedYear: "",
            }}
            validationSchema={BookSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const { data } = await bookApi.create(values);
                if (data.success) {
                  resetForm();
                  setBooks((prev) => [...prev, data.book]);
                  toast.success("Successfully Added");
                }
              } catch (error) {
                const err = error as ApiResponseError;
                if (err.status === 400) {
                  toast.error(err.message.message);
                }
              }
            }}
          >
            {({ values, errors, touched, handleChange }) => (
              <Form>
                <FloatingLabel label="Title of the book" className="mb-3">
                  <FormControl
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    placeholder="Type the title of the book"
                    isInvalid={touched.title && !!errors.title}
                    className="form-control"
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.title}
                  </FormControl.Feedback>
                </FloatingLabel>
                <FloatingLabel label="Author" className="mb-3">
                  <FormControl
                    id="author"
                    name="author"
                    value={values.author}
                    onChange={handleChange}
                    placeholder="Type the author"
                    isInvalid={touched.author && !!errors.author}
                    className="form-control"
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.author}
                  </FormControl.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  label="Year the book was published e.g 2000"
                  className="mb-3"
                >
                  <FormControl
                    id="publishedYear"
                    name="publishedYear"
                    value={values.publishedYear}
                    onChange={handleChange}
                    placeholder="Type the author"
                    isInvalid={touched.publishedYear && !!errors.publishedYear}
                    className="form-control"
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.publishedYear}
                  </FormControl.Feedback>
                </FloatingLabel>
                <div className="d-grid">
                  <Button type="submit" variant="success" className="d-grid">
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <>Cannot add a book</>
        )}
      </Card.Body>
    </Card>
  );
};

export default AddBook;
