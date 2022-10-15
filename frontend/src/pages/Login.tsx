import { Formik, Form } from "formik";
import { Button, FloatingLabel, Row, Col, FormControl } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { User } from "../interface/app";

interface FormValues extends Pick<User, "email"> {
  password: string;
}

const Login = () => {
  return (
    <Col md={{ span: 4, offset: 4 }}>
      <Row>
        <section className="heading">
          <h1>
            <FaSignInAlt /> Login
          </h1>
          <p>Login to access the dashboard.</p>
        </section>
      </Row>
      <Row>
        <Col>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values: FormValues) => console.log(values)}
          >
            {({ values, handleChange }) => (
              <Form>
                <FloatingLabel label="Email" className="mb-3">
                  <FormControl
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Type your email"
                    className="form-control"
                  />
                </FloatingLabel>
                <FloatingLabel label="Password" className="mb-3">
                  <FormControl
                    id="password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Type your password"
                    className="form-control"
                  />
                </FloatingLabel>
                <Button type="submit" variant="success">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Col>
  );
};

export default Login;
