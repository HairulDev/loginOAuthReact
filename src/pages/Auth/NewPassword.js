import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { createNewPassword } from "../../store/actions/auth";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "@mui/material";

import Input from './Input';
import { toastProperties } from "../../utils/toastProperties"

const theme = createTheme();

export default function NewPassword() {
  const initialState = {
    password: "",
    confirmPassword: "",
  };
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const token = useParams();
  console.log(token);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [errorPasswordMatch, setErrorMatch] = useState("");
  const [errorPasswordValidated, setErrorValidated] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createNewPassword(
        form, token,
        (res) => {
          toast.success(res?.data?.message, {
            toastProperties
          });
          history.push("/auth");
        },
        (error) => {
          toast.error(
            error?.response?.data?.message ||
            "You dont have Authorized networks",
            {
              toastProperties
            }
          );
        }
      )
    );
  }; // end handleSubmit


  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  useEffect(() => {
    if (form.password !== form.confirmPassword) {
      setErrorMatch("Password don't match")
    } else {
      setErrorMatch("")
    }
  }, [form.password, form.confirmPassword]);


  useEffect(() => {
    const checkPass = validatePassword(form.password);
    if (form.password && checkPass === false) {
      setErrorValidated(`Your password must contain:\n At least 8 characters\n At least 3 of the following:\n Lower case letters (a-z)\n Upper case letters (A-Z)\n Numbers (0-9)\n Special characters (e.g. !@#$%^&*)`)
    } else {
      setErrorValidated("")
    }
  }, [form.password]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Card
          variant="outlined"
          sx={{
            marginTop: 8,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://aikerja.com/wp-content/uploads/job-manager-uploads/company_logo/2021/02/AVL_logo-2.png"
            width={35} style={{ marginBottom: 10 }} />
          <Typography component="h1" variant="h5">
            Create New Password AVL
          </Typography>
          <Box
            // component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <form onSubmit={handleSubmit} autoComplete="on">
              <Grid container spacing={2}>
                <Input
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  onChange={onChange}
                  type={showPassword ? 'text' : 'password'}
                  handleShowPassword={handleShowPassword}
                  error={Boolean(errorPasswordValidated)}
                  helperText={errorPasswordValidated}
                  isLogin={true}
                />
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={onChange}
                  handleShowPassword={handleShowPassword}
                  error={Boolean(errorPasswordMatch)}
                  helperText={errorPasswordMatch}
                />
              </Grid>
              <Button
                onClick={handleSubmit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create New Password
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item xs={12} sm={8} textAlign="left">
                  Dont't have access Account? &nbsp;
                  <Link href="/recoverAccount" variant="subtitle1" style={{ textDecoration: "none" }}>
                    Recover Now
                  </Link>
                </Grid>
                <Grid item xs={12} sm={4} textAlign="right">
                  <Link href="/" variant="body2" style={{ textDecoration: "none" }}>
                    Go to Homepage
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
