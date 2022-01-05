import React from "react";
import { useLocation } from "react-router-dom";
import axios from "../../Api/Api";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik } from "formik";
import { useToasts } from "react-toast-notifications";
import { useLoader } from "../../Providers/LoaderProvider.js";
import { useHistory } from "react-router-dom";
import { changePasswordSchema } from "../../helpers/validationSchema";

function Index() {
  const INPUTS = [
    { name: "password", label: "Password" },
    { name: "confirmPassword", label: "Confirm Password" },
  ];
  const { search } = useLocation();
  const { addToast } = useToasts();
  const { setLoading } = useLoader();
  const history = useHistory();
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get("token");
  const id = queryParams.get("id");

  const handleChangePassword = (values) => {
    setLoading(true);
    axios
      .put(`/users/resetpassword`, {
        token: token,
        id: id,
        password: values.password,
      })
      .then((res) => {
        addToast(res.data.message, { appearance: "success" });
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        addToast(err.response.data.message, { appearance: "error" });
      });
  };
  console.log("token", queryParams.get("location"));
  return (
    <div className="auth-wrapper">
      <h1 className="edit-head">Reset Password</h1>

      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={changePasswordSchema}
        enableReinitialize
        onSubmit={(values) => {
          handleChangePassword(values);
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
                    type={"password"}
                  />
                );
              })}

              <Button variant="outlined" type="submit" fullWidth="100px">
                Submit
              </Button>
            </Box>
          );
        }}
      </Formik>
    </div>
  );
}

export default Index;
