import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Card } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from './Input';
import { AUTH } from "../../constants/actionTypes";
import { signin, signup } from "../../store/actions/auth";

import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Axios from "axios";
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import GoogleIcon from '@mui/icons-material/Google';
import { toastProperties } from "../../utils/toastProperties"
import { fbAppId, fbSecretKey, fbToken, googleClientId } from "config/vars";


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

  // switching to mode sign in or sign up
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  // end switching to mode sign in or sign up

  const handleAgree = (event) => {
    setAgree(event.target.checked);
  };

  //  submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(
        signup(
          form,
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
    } else {
      dispatch(
        signin(
          form,
          (res) => {
            toast.success(res?.data?.message, {
              toastProperties
            });
            history.push("./");
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
    }
  }; // end submit form


  // checking match password
  useEffect(() => {
    if (form.password !== form.confirmPassword) {
      setErrorMatch("Password don't match")
    } else {
      setErrorMatch("")
    }
  }, [form.password, form.confirmPassword]);
  // end checking match password

  // validation password
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  useEffect(() => {
    const checkPass = validatePassword(form.password);
    if (form.password && checkPass === false) {
      setErrorValidated(`Your password must contain:\n At least 8 characters\n At least 3 of the following:\n Lower case letters (a-z)\n Upper case letters (A-Z)\n Numbers (0-9)\n Special characters (e.g. !@#$%^&*)`)
    } else {
      setErrorValidated("")
    }
  }, [form.password]);
  // end validation password

  // handle change form
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, [e.target.name]: file });
    setFileName(file.name);
  };
  // end handle change form

  // OAuth Google
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleClientId,
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  }, []);

  const onSuccess = async (res) => {
    const result = {
      user_id: null,
      name: res?.profileObj.name,
      imageUrl: res?.profileObj.imageUrl
    }
    const token = res?.tokenId;
    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const onFailure = (error) => console.log('Google Sign In was unsuccessful', error);
  // end OAuth Google

  // OAuth Facebook

  const componentClicked = (response) => {
    const result = {
      user_id: null,
      name: response?.name,
      imageUrl: response?.picture.data.url
    }
    try {
      dispatch({ type: AUTH, data: { result } });
      const url = `https://graph.facebook.com/debug_token?input_token=${fbToken}&access_token=${fbAppId}|${fbSecretKey}`
      Axios.get(url).then(function (response) {
        console.log("APITokenFB", (response.data));
      })
        .catch(function (error) {
          console.log(error);
        });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  // end OAuth Facebook

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
            noValidate
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
                <>
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3, mb: 2, backgroundColor: '#29b6f7',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#1d8bbc',
                      },
                      '&:focus': {
                        boxShadow: '0 0 0 0.2rem rgba(0,200,255,.5)',
                      },
                    }}
                  >
                    {isSignup ? "Sign Up" : "Sign In"}
                  </Button>
                  <GoogleLogin
                    clientId={googleClientId}
                    render={(renderProps) => (
                      <Button fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<GoogleIcon />} variant="contained"
                        sx={{
                          mb: 2, backgroundColor: 'red',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#d00e00',
                          },
                          '&:focus': {
                            boxShadow: '0 0 0 0.2rem rgba(0,200,255,.5)',
                          },
                        }}>
                        Google Sign In
                      </Button>
                    )}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy="single_host_origin"
                  />

                  <FacebookLogin
                    appId={fbAppId}
                    render={renderProps => (
                      <Button color="primary" fullWidth onClick={renderProps.onClick} startIcon={<FacebookTwoToneIcon />} variant="contained"
                        sx={{
                          mb: 2
                        }}>
                        Facebook Sign In
                      </Button>
                    )}
                    // autoLoad={true}
                    fields="name,email,picture"
                    scope="public_profile,email"
                    onlogin={componentClicked}
                    callback={componentClicked}
                  />
                </>
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
