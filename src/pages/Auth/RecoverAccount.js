import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { resetPassword } from "../../store/actions/auth";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "@mui/material";

import Input from './Input';
import { toastProperties } from "../../utils/toastProperties"

const theme = createTheme();

export default function RecoverAccount() {
  const initialState = {
    email: "",
  };
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      resetPassword(
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
  }; // end handleSubmit

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
            Recover Account AVL
          </Typography>
          <Box
            // component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <form onSubmit={handleSubmit} autoComplete="on">
              <Grid container >
                <Input
                  fullWidth
                  required
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChange}
                />
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Recover Account
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item xs={12} sm={8} textAlign="left">
                    <Link href="/resetPassword" variant="subtitle1" style={{ textDecoration: "none" }}>
                      Forgot password ?
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={4} textAlign="right">
                    <Link href="/" variant="body2" style={{ textDecoration: "none" }}>
                      Go to Homepage
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Card>
      </Container>
    </ThemeProvider>
  );
}
