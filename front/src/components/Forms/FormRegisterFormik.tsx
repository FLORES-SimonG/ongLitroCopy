import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import warningIcon from "../../assets/IconWarrning.svg";
import { useState } from "react";
import showPasswordWarning from "../../assets/showPasswordWarning.svg";
import showPassword from "../../assets/showPassword.svg";

interface IFormValues {
  email: string;
  password: string;
  passwordVerify: string;
}

const initialValues = {
  email: "",
  password: "",
  passwordVerify: "",
};

const validate = (values: IFormValues) => {
  const errors: Record<string, string> = {};
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!values.email) {
    errors.email = "El correo electrónico es requerido";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "El correo electrónico no es válido";
  }

  if (!values.password) {
    errors.password = "La contraseña es requerida";
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número";
  }

  if (!values.passwordVerify) {
    errors.passwordVerify = "La contraseña es requerida";
  } else if (values.passwordVerify !== values.password) {
    errors.passwordVerify = "La contraseña no coincide";
  }

  return errors;
};

const FormRegisterFormik = () => {
  const [passwordText, setPasswordText] = useState("password");
  const [passwordText2, setPasswordText2] = useState("password");

  const handleShow = () => {
    setPasswordText((prev) => (prev === "password" ? "text" : "password"));
  };
  const handleShow2 = () => {
    setPasswordText2((prev) => (prev === "password" ? "text" : "password"));
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }: FormikHelpers<IFormValues>) => {
        localStorage.setItem("registerUser", JSON.stringify(values));
        setSubmitting(false);
        window.location.href = "/auth/register/personalInformation";
      }}
    >
      {({ errors, touched }) => (
        <Form className="text-sm text-textParagraph flex flex-col justify-center h-5/6">
          <div className="flex flex-col">
            <label htmlFor="title" className="font-medium my-2 ">
              Correo electronico
            </label>
            <div className="flex w-full">
              <Field
                type="email"
                name="email"
                placeholder="you@example.com"
                className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                  errors.email && touched.email
                    ? "border-warningBorder text-warningText font-medium"
                    : ""
                }`}
              />
              <div
                className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                  errors.email && touched.email
                    ? "border-warningBorder text-warningText font-medium "
                    : ""
                }`}
              >
                <img
                  src={warningIcon.src}
                  alt="warningIcon"
                  className={`${
                    errors.email && touched.email ? "block" : "hidden"
                  }`}
                />
              </div>
            </div>
            <div className="h-4 text-warning">
              <ErrorMessage name="email" component="span" />
            </div>
            
          </div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col w-full pr-4">
              <label htmlFor="title" className="font-medium my-2 ">
                Contraseña
              </label>
              <div className="flex w-full">
                <Field
                  type={passwordText}
                  name="password"
                  placeholder="contraseña"
                  className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                    errors.password && touched.password
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                />
                <div
                  className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                    errors.password && touched.password
                      ? "border-warningBorder text-warningText font-medium "
                      : ""
                  }`}
                >
                  <img
                    src={showPasswordWarning.src}
                    alt="warningIcon"
                    className={`${
                      errors.password && touched.password ? "block" : "hidden"
                    }`}
                    onClick={handleShow}
                  />
                  <img
                    src={showPassword.src}
                    alt="warningIcon"
                    className={`${
                      errors.password && touched.password ? "hidden" : "block"
                    }`}
                    onClick={handleShow}
                  />
                </div>
              </div>
              <div className="h-4 text-warning">
                <ErrorMessage name="password" component="span" />
              </div>
            </div>
            <div className="flex flex-col w-full pl-4">
              <label htmlFor="title" className="font-medium my-2 ">
                Repetir contraseña
              </label>
              <div className="flex w-full">
                <Field
                  type={passwordText2}
                  name="passwordVerify"
                  placeholder="contraseña"
                  className={`w-full rounded-l-md border-backgroundGrey border-r-transparent border placeholder:text-textParagraph px-3 py-2 focus-visible:outline-none  ${
                    errors.passwordVerify && touched.passwordVerify
                      ? "border-warningBorder text-warningText font-medium"
                      : ""
                  }`}
                />
                <div
                  className={`flex justify-center rounded-r-md px-4 bg-white  border-backgroundGrey border border-l-transparent focus-visible:outline  ${
                    errors.passwordVerify && touched.passwordVerify
                      ? "border-warningBorder text-warningText font-medium "
                      : ""
                  }`}
                >
                  <img
                    src={showPasswordWarning.src}
                    alt="warningIcon"
                    className={`${
                      errors.passwordVerify && touched.passwordVerify
                        ? "block"
                        : "hidden"
                    }`}
                    onClick={handleShow2}
                  />
                  <img
                    src={showPassword.src}
                    alt="warningIcon"
                    className={`${
                      errors.passwordVerify && touched.passwordVerify
                        ? "hidden"
                        : "block"
                    }`}
                    onClick={handleShow2}
                  />
                </div>
              </div>
              <div className="h-4 text-warning">
              <ErrorMessage name="passwordVerify" component="span"/>
              </div>
            </div>
          </div>
          <div className="my-20 w-full flex justify-end">
            <button
              type="submit"
              className="bg-primary transition-all text-textPrimary absolute bottom-14 right-20 px-10 py-1 rounded-full text-lg shadow-3xl hover:scale-105 focus:shadow-none font-medium h-min w-min whitespace-nowrap disabled:bg-backgroundGrey disabled:shadow-none disabled:scale-100"
              disabled={
                Object.keys(errors).length !== 0 ||
                Object.keys(touched).length === 0
              }
            >
              Siguiente
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default FormRegisterFormik;
