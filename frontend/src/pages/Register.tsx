import { Formik, Form } from "formik";
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
import { User } from "../interface/app";

interface FormValues extends User {
  password: string;
  password2: string;
}

const roles = Object.entries(Roles);

const Register = () => {
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
              roles: ["CREATOR"],
            }}
            onSubmit={(values: FormValues) => console.log(values)}
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
