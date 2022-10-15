import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Button, FloatingLabel, Row, Col, FormControl } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { IFormUser } from "../interface/app";
import { useUserApi } from "../services/UserApi";
import { useSession } from "../context/session";
import { useEffect } from "react";
import * as Yup from "yup";

interface FormValues extends Pick<IFormUser, "email" | "password"> {}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Please type an email"),
  password: Yup.string().required("Please type password"),
});

const Login = () => {
  const userApi = useUserApi();
  const { setSession, isLoggedIn } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

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
            validationSchema={LoginSchema}
            onSubmit={async (values: FormValues) => {
              try {
                const { data } = await userApi.login(values);
                if (data.success) {
                  setSession({ token: data.token, user: data.user });
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
            {({ values, errors, handleChange }) => (
              <Form>
                <FloatingLabel label="Email" className="mb-3">
                  <FormControl
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Type your email"
                    className="form-control"
                    isInvalid={!!errors.email}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.email}
                  </FormControl.Feedback>
                </FloatingLabel>
                <FloatingLabel label="Password" className="mb-3">
                  <FormControl
                    id="password"
                    type="password"
                    name="password"
                    value={values.password}
                    isInvalid={!!errors.password}
                    onChange={handleChange}
                    placeholder="Type your password"
                    className="form-control"
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.password}
                  </FormControl.Feedback>
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
