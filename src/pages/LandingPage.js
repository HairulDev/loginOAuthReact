import React, { useState, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "parts/Header";
import Hero from "parts/Hero";
import Users from "../parts/Users";

import { getAllLandingPage } from "../store/actions/landingPage";
import { Container } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

export default function LandingPage() {
  const dispatch = useDispatch();
  const { dataLandingPageReducer } = useSelector(
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
    if (dataLandingPageReducer) {
      setLandingPage(dataLandingPageReducer);
    }
  }, [dataLandingPageReducer]);


  return (
    <Container spacing={2}>
      <Header ></Header>
      <ToastContainer autoClose={8000} />
      <Hero data={dataLandingPage.dashboard} />
      <Users
        data={dataLandingPage?.users}
      />
    </Container>
  );
}
