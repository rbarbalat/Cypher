import React from "react";
import "./landing.css";
import { useHistory } from "react-router-dom";
import {
  FaPython,
  FaReact,
  FaCss3,
  FaAws,
  FaGithub,
  FaJsSquare,
} from "react-icons/fa";
import logo from "../../assets/cypher-white.svg";
import omar_Elsahlah from "../../assets/omar_Elsahlah.jpeg";
import chris_Eke from "../../assets/chris_Eke.jpeg";
import roman_Barbalat from "../../assets/roman_Barbalat.jpeg";
import jonathan_Carter from "../../assets/jonathan_Carter.jpeg";
import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillGithub,
} from "react-icons/ai";

function Landing() {
  const history = useHistory();

  return (
    <main id="landing--wrapper">
      <header className="landing_header--wrapper">
        <div className="landing_header--contents">
          <div className="landing_header--logo">
            <img src={logo} className="landing_header--image" />
            <span className="landing_header--text">cypher</span>
          </div>
          <div className="landing_header--actions">
            <button
              onClick={() => history.push("/sign-in")}
              id="sign-in"
              className="btn"
            >
              Sign In
            </button>
            <button
              onClick={() => history.push("/sign-up")}
              id="sign-up"
              className="btn"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>
      <section className="landing_splash--wrapper">
        <div className="landing_splash--contents">
          <div className="landing_splash--text">
            <h1>
              Made for people.
              <br />
              <span className="accent">Built for productivity.</span>
            </h1>
            <p>
              Connect the right people, find anything you need and automate the
              rest. That’s work in Cypher, your productivity platform.
            </p>
            <button onClick={() => history.push("/sign-up")} className="btn">
              Sign Up
            </button>
          </div>
          <div className="landing_splash--image"></div>
        </div>
      </section>
      <section className="landing_technologies--wrapper">
        <div className="landing_technologies--contents">
          <p>Technologies we trust to build this application</p>
          <div className="landing_technologies--icons">
            <FaAws className="landing_technologies--icon" />
            <FaCss3 className="landing_technologies--icon" />
            <FaGithub className="landing_technologies--icon" />
            <FaJsSquare className="landing_technologies--icon" />
            <FaPython className="landing_technologies--icon" />
            <FaReact className="landing_technologies--icon" />
          </div>
        </div>
      </section>
      <section className="landing_outro--wrapper">
        <div className="landing_outro--contents">
          <div className="landing_outro--boxes">
            <div className="landing_outro--box">
              <img src={jonathan_Carter} alt="Jonathan Carter" />
              <p>
                Hi! My name is Jonathan, and I used to be a Galactic Emperor. I
                have a passion for backend development
              </p>
              <div className="social-icons">
                <a href="https://twitter.com/jonathan_carter">
                  <AiFillTwitterCircle className="social-icon" />
                </a>
                <a href="https://www.linkedin.com/in/jonathan-carter">
                  <AiFillLinkedin className="social-icon" />
                </a>
                <a href="https://github.com/jonathan-carter-dev">
                  <AiFillGithub className="social-icon" />
                </a>
              </div>
            </div>
            <div className="landing_outro--box">
              <img src={omar_Elsahlah} alt="Omar Elsahlah" />
              <p>
                Hi! My name is Omar, I used to be a Technical Recruiter. Excited
                to work as a Software Engineer!
              </p>
              <div className="social-icons">
                <a href="https://twitter.com/omar_elsahlah">
                  <AiFillTwitterCircle className="social-icon" />
                </a>
                <a href="https://www.linkedin.com/in/omar-elsahlah">
                  <AiFillLinkedin className="social-icon" />
                </a>
                <a href="https://github.com/omar-elsahlah">
                  <AiFillGithub className="social-icon" />
                </a>
              </div>
            </div>
            <div className="landing_outro--box">
              <img src={chris_Eke} alt="Chris Eke" />
              <p>
                Hi! I am Chris, and I was a self taught developer then joined
                a/A to further my knowledge!
              </p>
              <div className="social-icons">
                <a href="https://twitter.com/chris_eke">
                  <AiFillTwitterCircle className="social-icon" />
                </a>
                <a href="https://www.linkedin.com/in/chris-eke">
                  <AiFillLinkedin className="social-icon" />
                </a>
                <a href="https://github.com/chris-eke">
                  <AiFillGithub className="social-icon" />
                </a>
              </div>
            </div>
            <div className="landing_outro--box">
              <img src={roman_Barbalat} alt="Roman Barbalat" />
              <p>
                Hi! My name is Roman, I used to be a day trader. I'm passionate
                about Software engineering!
              </p>
              <div className="social-icons">
                <a href="https://twitter.com/roman_barbalat">
                  <AiFillTwitterCircle className="social-icon" />
                </a>
                <a href="https://www.linkedin.com/in/roman-barbalat">
                  <AiFillLinkedin className="social-icon" />
                </a>
                <a href="https://github.com/roman-barbalat">
                  <AiFillGithub className="social-icon" />
                </a>
              </div>
            </div>
          </div>
          <h2>See all you can accomplish with Cypher</h2>
          <div className="landing_outro--actions">
            <button
              onClick={() => history.push("/sign-up")}
              id="outro-sign-up"
              className="btn"
            >
              Sign Up
            </button>
            <button
              onClick={() => history.push("/sign-in")}
              id="outro-sign-in"
              className="btn"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>
      <footer className="landing_footer--wrapper">
        <div className="landing_footer--contents"></div>
      </footer>
    </main>
  );
}

export default Landing;
