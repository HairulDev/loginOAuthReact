import React from "react";

import Button from "elements/Button";
import IconText from "parts/IconText";
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-auto" style={{ width: 350 }}>
            <IconText />
            <p className="brand-tagline">
              We happy your beauty holiday instantly and memorable.
            </p>
          </div>
          <div className="col-3">
            <h6 className="mt-2">Connect Us</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <Button
                  isExternal
                  type="link"
                >Follow Us | Facebook | Instagram | LinkedIn | GitHub
                  Contact Us
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col text-center copyrights">
            ©Avancevl
          </div>
        </div>
      </div>
    </footer>
  );
}
