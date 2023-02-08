import React, { useState, useEffect } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Fade from "react-reveal/Fade";
import decode from "jwt-decode";
import { LOGOUT } from "../constants/actionTypes";

import BrandIcon from "parts/IconText";
import { Button } from "@mui/material";

const Header = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      setUser(decodedToken);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location]);

  console.log("user:", (user));
  return (
    <Fade>
      <header className="spacing-sm">
        <nav className="navbar navbar-expand-lg navbar-light">
          <BrandIcon />
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className={`nav-item dropdown`}>
                {user ? (
                  <div className="navbar-nav mr-auto">
                    {" "}
                    <img
                      className="img rounded mx-auto d-block"
                      style={{ height: 40 }}
                      src={`https://kalbarvacation.s3.ap-southeast-1.amazonaws.com/token/${user?.file}`}
                    />
                    <span className="navbar-nav mr-5">
                      &nbsp; Hi there, {user?.name}
                    </span>
                    <Button
                      variant='outlined'
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" >Sign In</Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </Fade>
  );
};

export default Header;
