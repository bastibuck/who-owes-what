import React from "react";
import bulma from "../../assets/made-with-bulma--white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer has-background-primary">
      <div className="content has-text-centered">
        <p>
          <strong>Who-Owes-What</strong> by{" "}
          <a
            href="https://bastibuck.de"
            target="_blank"
            rel="noopener noreferrer"
            title={"This needs a rework as well."}
          >
            Basti Buck
          </a>
          .<br />
          <br />
        </p>
        <p>
          <span className="icon">
            <a
              href={"https://github.com/bastibuck/who-owes-what"}
              title="View on GitHub"
              className={"has-text-light"}
              target={"_blank"}
            >
              <FontAwesomeIcon icon={faGithub} size={"2x"} />
            </a>
          </span>
        </p>
        <p>
          <a href="https://bulma.io" target={"_blank"} title={"<3 Bulma"}>
            <img src={bulma} alt="Made with Bulma" width="128" height="24" />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
