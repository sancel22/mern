import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import {
  Button,
  FloatingLabel,
  Row,
  Col,
  FormControl,
  FormCheck,
} from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { Roles } from "../constants/app";
import { FormUser } from "../interface/app";
import { useUserApi } from "../services/UserApi";

const roles = Object.entries(Roles);

const Register = () => {
  const userApi = useUserApi();
  const navigate = useNavigate();
  return (
    <Col md={{ span: 4, offset: 4 }}>
      <Row>
        <section className="heading">
          <h1>
            <FaUser /> Register
          </h1>
          <p>Please create an account</p>
        </section>
      </Row>
      <Row>
        <Col>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              password2: "",
              roles: [] as string[],
            }}
            onSubmit={async (values: FormUser) => {
              const { password2, ...rest } = values;
              try {
                const { data } = await userApi.create({ ...rest });
                if (data.success) {
                  toast.success("Successfully Registered");
                  navigate("/login");
                }
              } catch (error) {
                const err = error as { status: number; message: any };
                if (err.status === 400) {
                  toast.error(err.message.message);
                }
              }
            }}
          >
            {({ values, handleChange, setFieldValue }) => (
              <Form>
                <FloatingLabel label="Name" className="mb-3">
                  <FormControl
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Type your name"
                    className="form-control"
                  />
                </FloatingLabel>
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
                <FloatingLabel label="Confirm Password" className="mb-3">
                  <FormControl
                    id="password2"
                    type="password"
                    name="password2"
                    value={values.password2}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="form-control"
                  />
                </FloatingLabel>
                <div className="mb-3">
                  <b>Select Role</b>
                  {roles.map(([key, value]) => (
                    <FormCheck
                      key={value}
                      id={key}
                      type="checkbox"
                      label={value}
                      checked={values.roles.includes(key)}
                      onChange={(e) => {
                        const check = values.roles.includes(key);
                        if (check) {
                          const newArray = values.roles.filter(
                            (role) => role !== key
                          );
                          setFieldValue("roles", newArray);
                        } else {
                          const newArray = values.roles.concat();
                          setFieldValue("roles", [...newArray, key]);
                        }
                      }}
                    />
                  ))}
                </div>
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

export default Register;
