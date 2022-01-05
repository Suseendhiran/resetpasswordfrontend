import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import { useLoader } from "../../Providers/LoaderProvider";
import { useToasts } from "react-toast-notifications";
import { useAuth } from "../../Providers/AuthProvider";
import axios from "../../Api/Api";
import { signupSchema } from "../../helpers/validationSchema";

function Index() {
  const { addToast } = useToasts();
  const history = useHistory();
  const { setLoading } = useLoader();
  const { setToken } = useAuth();

  const INPUTS = [
    { name: "email", label: "Email" },
    { name: "password", label: "Password" },
  ];
  const handleSignUp = (values) => {
    setLoading(true);
    axios
      .post(`/users/signup`, values)
      .then((res) => {
        history.push("/home");
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setLoading(false);
        addToast(res.data.message, { appearance: "success" });
      })
      .catch((err) => {
        setLoading(false);
        addToast(err.response.data.message, { appearance: "error" });
      });
  };
  return (
    <div className="auth-wrapper">
      <h1 className="edit-head"> Signup</h1>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={signupSchema}
        enableReinitialize
        onSubmit={(values) => {
          handleSignUp(values);
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
                Sign Up
              </Button>
              <p>
                Already have an account?{" "}
                <button
                  className="auth-route-text"
                  onClick={() => history.push("/")}
                >
                  Login
                </button>
              </p>
            </Box>
          );
        }}
      </Formik>
    </div>
  );
}

export default Index;
