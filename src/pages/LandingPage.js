import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";

import Header from "parts/Header";
import Hero from "parts/Hero";
import MostPicked from "parts/MostPicked";
import Footer from "parts/Footer";

import { getAllLandingPage } from "../store/actions/landingPage";
import { Container, Grid, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

export default function LandingPage() {
  const dispatch = useDispatch();
  const { dataLandingPageReducerAll } = useSelector(
    (state) => state.landingPageReducer
  );
  const [dataLandingPage, setLandingPage] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Home";
    dispatch(getAllLandingPage());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (dataLandingPageReducerAll) {
      setLandingPage(dataLandingPageReducerAll);
    }
  }, [dataLandingPageReducerAll]);


  console.log("dataLandingPage ", dataLandingPage);

  return (
    <Container spacing={2}>
      <Header ></Header>
      <ToastContainer autoClose={8000} />
      <Hero data={dataLandingPage.hero} />
      <MostPicked
        data={dataLandingPage?.mostPicked}
      />
      <Footer />
    </Container>
  );
}
