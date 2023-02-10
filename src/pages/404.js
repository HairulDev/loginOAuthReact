import { Button } from "@mui/material";
import React from "react";

import { useHistory } from "react-router-dom";


function NotFound(props) {
  const history = useHistory();

  return (
    <div className="container">
      <div
        className="row align-items-center justify-content-center text-center"
        style={{ height: "100vh" }}
      >
        <div className="col-4">
          Are you lost?
          <p className="pt-4">
            Some page are still in development, maybe you can go back if you
            want
          </p>
          <div>
            <Button
              variant="outlined"
              onClick={() => history.push("/")}
            >
              Yes, bring me to homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound
