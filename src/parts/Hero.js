import * as React from "react";
import Fade from "react-reveal/Fade";

import ImageHero from "assets/images/img-hero.jpg";

import formatNumber from "utils/formatNumber";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PinDropIcon from "@mui/icons-material/PinDrop";

import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Container } from "@mui/material";
import Button from "elements/Button";

export default function Hero({ data }) {
  function showMostPicked() {
    window.scrollTo({
      behavior: "smooth",
    });
  }

  return (
    <Container fixed sx={{ display: "flex", mb: 5 }}>
      <Grid xs={10}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
            Begin your excursion journey with us
          </Typography>
          <Typography variant="subtitle1" paragraph>
            We offer what you want to revel in your vacation with own circle of
            relatives, <br />
            Time to make every other memorable moments.
          </Typography>
          <Button
            className="btn px-4"
            hasShadow
            isSmall
            isPrimary
            onClick={showMostPicked}
          >
            Let's go
          </Button>
          <Typography variant="subtitle2" color="primary" sx={{ mt: 5 }}>
            <LoyaltyIcon sx={{ mr: 1 }} />
            {formatNumber(data?.travelers)} travelers &nbsp;&nbsp;
            &nbsp;&nbsp;
            <PhotoCameraIcon sx={{ mr: 1 }} />
            {formatNumber(data?.treasures)} treasures &nbsp;&nbsp;
            &nbsp;&nbsp;
            <PinDropIcon sx={{ mr: 1 }} />
            {formatNumber(data?.cities)} cities
          </Typography>
        </CardContent>
      </Grid>
      <Grid xs={2}>
        <CardMedia
          sx={{
            maxWidth: 500,
            maxHeight: 300,
            borderRadius: 2,
          }}
          image={ImageHero}
          component="img"
        />
      </Grid>
    </Container>
  );
}
