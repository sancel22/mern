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
import { IFormUser } from "../interface/app";
import { useUserApi } from "../services/UserApi";
import { useSession } from "../context/session";
import { useEffect } from "react";
import * as Yup from "yup";
import classnames from "classnames";

const roles = Object.entries(Roles);

const UserSchema = Yup.object().shape({
  name: Yup.string().required("Please input name"),
  email: Yup.string().email().required("Please input email"),
  password: Yup.string().required("Please input password"),
  password2: Yup.string()
    .required("Please retype password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  roles: Yup.array(Yup.string().required("Please select Role")).min(
    1,
    "Please select at least 1 role"
  ),
});

const Register = () => {
  const userApi = useUserApi();
  const { isLoggedIn } = useSession();
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
            validationSchema={UserSchema}
            onSubmit={async (values: IFormUser) => {
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
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldValue,
              handleSubmit,
            }) => (
              <Form>
                <FloatingLabel label="Name" className="mb-3">
                  <FormControl
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Type your name"
                    isInvalid={touched.name && !!errors.name}
                    className={classnames("form-control")}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.name}
                  </FormControl.Feedback>
                </FloatingLabel>
                <FloatingLabel label="Email" className="mb-3">
                  <FormControl
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Type your email"
                    isInvalid={touched.email && !!errors.email}
                    className={classnames("form-control")}
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
                    onChange={handleChange}
                    placeholder="Type your password"
                    isInvalid={touched.password && !!errors.password}
                    className={classnames("form-control")}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.password}
                  </FormControl.Feedback>
                </FloatingLabel>
                <FloatingLabel label="Confirm Password" className="mb-3">
                  <FormControl
                    id="password2"
                    type="password"
                    name="password2"
                    value={values.password2}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    isInvalid={touched.password2 && !!errors.password2}
                    className={classnames("form-control")}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.password2}
                  </FormControl.Feedback>
                </FloatingLabel>
                <div className="mb-3">
                  <b>Select Role</b>
                  {roles.map(([key, value]) => (
                    <FormCheck
                      key={value}
                      id={key}
                      type="checkbox"
                      label={value}
                      isInvalid={touched.roles && !!errors.roles}
                      className={classnames(errors.roles && "is-invalid")}
                      checked={values.roles.includes(value)}
                      onChange={(e) => {
                        const check = values.roles.includes(value);
                        if (check) {
                          const newArray = values.roles.filter(
                            (role) => role !== value
                          );
                          setFieldValue("roles", newArray);
                        } else {
                          const newArray = values.roles.concat();
                          setFieldValue("roles", [...newArray, value]);
                        }
                      }}
                    />
                  ))}
                  <FormControl.Feedback type="invalid">
                    {touched.roles && errors.roles}
                  </FormControl.Feedback>
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
