import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { signin, signup } from "../store/actions/auth";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "@mui/material";
import decode from "jwt-decode";

import Input from './Input';
import Icon from "../pages/icon";
import GoogleLogin from "react-google-login";
import { AUTH } from "../constants/actionTypes";

const theme = createTheme();

export default function SignUp() {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: "",
  };
  const [form, setForm] = useState(initialState);
  const [fileName, setFileName] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [disable, setDisable] = useState(true);
  const [agree, setAgree] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [errorPasswordMatch, setErrorMatch] = useState("");
  const [errorPasswordValidated, setErrorValidated] = useState("");

  const [passwordName, setPasswordName] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");


  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(
        signup(
          form,
          (res) => {
            toast.success(res?.data?.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            history.push("/auth");
          },
          (error) => {
            toast.error(
              error?.response?.data?.message ||
              "You dont have Authorized networks",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }
        )
      );
    } else {
      dispatch(
        signin(
          form,
          (res) => {
            toast.success(res?.data?.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            history.push("./");
          },
          (error) => {
            toast.error(
              error?.response?.data?.message ||
              "You dont have Authorized networks",
              {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              }
            );
          }
        )
      );
    }
  }; // end handleSubmit


  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    console.log("validatePassword===>", regex.test(password));
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

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    console.log("nama file", file.name);
    setForm({ ...form, [e.target.name]: file });
    setFileName(file.name);
  };

  const handleAgree = (event) => {
    setAgree(event.target.checked);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');



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
            {isSignup ? `Sign Up AVL` : `Sign In AVL`}
          </Typography>
          <Box
            // component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <form onSubmit={handleSubmit} autoComplete="on">
              <Grid container spacing={2}>
                {isSignup && (
                  <>
                    <Input
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={onChange}
                      half
                    />
                    <Input
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      onChange={onChange}
                      half
                    />
                  </>
                )}
                <Input
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChange}
                />
                <Input
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  onChange={onChange}
                  type={showPassword ? 'text' : 'password'}
                  handleShowPassword={handleShowPassword}
                  isLogin={true}
                  error={Boolean(errorPasswordValidated)}
                  helperText={errorPasswordValidated}
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
                {isSignup && (
                  <>
                    <Grid item xs={12}>
                      <Button
                        sx={{
                          zIndex: 1,
                          marginTop: "-1px",
                          paddingTop: "8px",
                          paddingBottom: "9px",
                        }}
                        variant="contained"
                        component="label"
                      >
                        Browse
                        <input
                          type="file"
                          name="file"
                          hidden
                          onChange={onChangeFile}
                        />
                      </Button>
                      <TextField
                        inputProps={{ style: { textAlign: "center" } }}
                        disabled
                        size="small"
                        sx={{ marginLeft: "-2rem", border: "none" }}
                        onChange={onChangeFile}
                        value={fileName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={handleAgree}
                            checked={agree}
                            color="primary"
                          />
                        }
                        label={
                          <Typography sx={{ fontSize: 12 }}>
                            I hereby declare that all the information above is
                            true and correct.
                          </Typography>
                        }
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              {agree || !isSignup ? (
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isSignup ? "Sign Up" : "Sign In"}
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={disable}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isSignup ? "Sign Up" : "Sign In"}
                </Button>
              )}
              <GoogleLogin
                clientId="27480440896-lf3kal9654sqh0acbqk361bibe4dsrhf.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
              <Grid container justifyContent="flex-end">
                <Grid item xs={12} sm={6} textAlign='left'>
                  <Typography variant="subtitle1" onClick={switchMode}>
                    {isSignup
                      ? "Already have an account? Sign In"
                      : "Don't have an account? Sign Up"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} textAlign='right' >
                  <Link href="/resetPassword" variant="body2" style={{ textDecoration: "none" }}>
                    Reset Password ?
                  </Link>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
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
