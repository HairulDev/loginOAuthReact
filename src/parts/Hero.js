import * as React from "react";
import Fade from "react-reveal/Fade";


import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, Container, SvgIcon } from "@mui/material";


export default function Hero({ data }) {
  const handleClick = () => {
    window.scrollTo(0, document.body.scrollHeight);
  }

  return (
    <Container fixed sx={{ display: "flex", mb: 5 }}>
      <Grid xs={10}>
        <CardContent sx={{ flex: 1 }}>
          <Fade left>
            <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
              All Remote Team
            </Typography>
            <Typography variant="subtitle1" paragraph>
              We incubate, accelerate and implement the ideas our team develops internally.<br />
              You can find more information about us in our AVL manual.
            </Typography>
            <Button
              variant="contained"
              onClick={handleClick}
            >
              Let's go
            </Button>
          </Fade>
          <Typography variant="subtitle2" color="primary" sx={{ mt: 5 }}>
            <OnlinePredictionIcon sx={{ mr: 1 }} />
            {data?.total_active_today} Total{data?.total_active_today > 1 ? "s" : ""} Active Today &nbsp;&nbsp;
            <SupervisedUserCircleIcon sx={{ mr: 1 }} />
            {data?.total_signup} Total{data?.total_signup > 1 ? "s" : ""} SignUp &nbsp;&nbsp;
          </Typography>
        </CardContent>
      </Grid>
      <Grid xs={2}>
        <Fade right>

          <CardMedia
            sx={{
              maxWidth: 500,
              maxHeight: 300,
              borderRadius: 2,
            }}
            src="https://images.pexels.com/photos/3769118/pexels-photo-3769118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            component="img"
          />
        </Fade>
      </Grid>
    </Container>
  );
}
