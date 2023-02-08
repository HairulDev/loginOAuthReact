import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AuthVerify = () => {
  const { token } = useParams();
  const history = useHistory();

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await axios.get(
        `${process.env.REACT_APP_HOST}/v1/auth/verifyReg?token=${token}`
      );
      setData(data);
    }
    history.push("/auth");
    fetchData();
    toast.success("Verification successfull", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, [0]);

  return <div>{data}</div>;
};

export default AuthVerify;
