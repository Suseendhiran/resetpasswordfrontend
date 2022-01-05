import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { useLoader } from "../../Providers/LoaderProvider.js";
import { useAuth } from "../../Providers/AuthProvider";
import { useToasts } from "react-toast-notifications";
import axios from "../../Api/Api";
import { forgotPasswordSchema } from "../../helpers/validationSchema";

function Index() {
  const history = useHistory();
  const { setLoading } = useLoader();
  const { addToast } = useToasts();

  const INPUTS = [{ name: "email", label: "Email" }];
  const handleForgotPassword = (values) => {
    setLoading(true);
    axios
      .put(`/users/forgotpassword`, {
        ...values,
      })
      .then((res) => {
        addToast(res.data.message, { appearance: "success" });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        addToast(err.response.data.message, { appearance: "error" });
      });
  };
  return (
    <div className="auth-wrapper">
      <h1 className="edit-head">Forgot Password</h1>

      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={forgotPasswordSchema}
        enableReinitialize
        onSubmit={(values) => {
          handleForgotPassword(values);
        }}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => {
          return (
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "80%" },
              }}
              onSubmit={handleSubmit}
              autoComplete="off"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "30px",
              }}
            >
              {INPUTS.map((input, index) => {
                return (
                  <TextField
                    error={touched[input.name] && errors[input.name]}
                    id={
                      input.name === "password"
                        ? "outlined-password-input"
                        : "outlined-basic"
                    }
                    label={input.label}
                    variant="outlined"
                    value={values[input.name]}
                    name={input.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    key={index}
                    helperText={
                      touched[input.name] && errors[input.name]
                        ? errors[input.name]
                        : null
                    }
                    type={input.name}
                  />
                );
              })}

              <Button variant="outlined" type="submit">
                Submit
              </Button>
              <div className="otheroptions">
                <p>
                  No Account?
                  <button
                    className="auth-route-text"
                    onClick={() => history.push("/signup")}
                  >
                    Create Account
                  </button>
                </p>
                <button
                  className="auth-route-text"
                  onClick={() => history.push("/login")}
                >
                  Login
                </button>
              </div>
            </Box>
          );
        }}
      </Formik>
    </div>
  );
}

export default Index;
