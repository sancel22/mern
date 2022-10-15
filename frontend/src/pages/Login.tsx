import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Button, FloatingLabel, Row, Col, FormControl } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { IFormUser } from "../interface/app";
import { useUserApi } from "../services/UserApi";

interface FormValues extends Pick<IFormUser, "email" | "password"> {}

const Login = () => {
  const userApi = useUserApi();
  const navigate = useNavigate();
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
            onSubmit={async (values: FormValues) => {
              try {
                const { data } = await userApi.login(values);
                if (data.success) {
                  toast.success("Login Successfully");
                  navigate("/");
                }
              } catch (error) {
                const err = error as { status: number; message: any };
                if (err.status === 400) {
                  toast.error(err.message.message);
                }
              }
            }}
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
