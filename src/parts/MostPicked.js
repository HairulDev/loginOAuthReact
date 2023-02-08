import React from "react";
import Fade from "react-reveal/Fade";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Container,
  Grid,
} from "@mui/material";

export default function MostPicked({ data }) {
  return (
    <Container fixed sx={{ mb: 5 }}>
      <Grid sx={{ display: "flex" }}>
        {data?.map((item, index) => {
          return (
            <Card sx={{ maxWidth: 345, mr: 2 }} key={index}>
              <CardMedia
                component="img"
                height="140"
                image={
                  item?.imageId[0]
                    ? `https://kalbarvacation.s3.ap-southeast-1.amazonaws.com/item/${item?.imageId[0].imageUrl}`
                    : ""
                }
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item?.city}, {item?.country}
                </Typography>
              </CardContent>
              <CardActions>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="text.secondary"
                >
                  {item?.price}K / {item?.unit}
                </Typography>
              </CardActions>
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
}
