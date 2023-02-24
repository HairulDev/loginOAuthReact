import React from "react";
import Fade from "react-reveal/Fade";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
    Container,
    Grid,
} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';

import moment from 'moment';
import env from "config/vars";

export default function Users({ data }) {
    return (
        <Container fixed sx={{ mb: 5 }}>
            <Grid sx={{ display: "flex" }}>
                {data?.map((item, index) => {
                    return (
                        <>
                            <Fade bottom>
                                <Card sx={{ maxWidth: 250, mr: 2 }} key={index}>
                                    <CardMedia
                                        component="img"
                                        image={`${env.urlBucket}/user/${item?.usr_file}`}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Grid item xs={12}>
                                            <Typography gutterBottom variant="h6">
                                                {item?.usr_name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" color="text.secondary">
                                                <EmailIcon></EmailIcon> {item?.usr_email}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="caption" color="text.secondary">
                                                <CalendarMonthIcon></CalendarMonthIcon>
                                                {item?.usrh_total_login} Total{item?.usrh_total_login > 1 ? "s" : ""} Sign In &nbsp;&nbsp;
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="caption" color="text.secondary">
                                                <AccessTimeIcon> </AccessTimeIcon> Sign Up on {moment(item?.usr_timecreated).format("DD MMMM YYYY")}
                                            </Typography>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </>
                    );
                })}
            </Grid>
        </Container >
    );
}
