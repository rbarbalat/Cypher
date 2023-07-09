import React from "react";
import "./landing.css";
import { useHistory } from "react-router-dom";
import {
  FaPython,
  FaReact,
  FaCss3,
  FaAws,
  FaJsSquare,
} from "react-icons/fa";
import logo from "../../assets/cypher-white.svg";
import logo2 from "../../assets/cypher-logo.svg";
import omar_Elsahlah from "../../assets/omar_Elsahlah.jpeg";
import chris_Eke from "../../assets/chris_Eke.jpeg";
import roman_Barbalat from "../../assets/roman_Barbalat.jpeg";
import jonathan_Carter from "../../assets/jonathan_Carter.jpeg";
import landing from '../../assets/landing.svg';
import { FaTwitter, FaLinkedinIn, FaGithub, FaDribbble } from "react-icons/fa6";
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
            <button onClick={() => history.push("/sign-up")} className="landing_splash--text_btn btn">
              Sign Up
            </button>
          </div>
          <img src={landing} className="landing_splash--image"/>
          {/* <div className="landing_splash--image"></div> */}
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
      <section className="landing_about">
        <h1 className="landing_about--heading">Meet Your Developers</h1>
        <div className="landing_about--boxes">
            <div className="landing_about--box">
              <img src={jonathan_Carter} alt="Jonathan Carter" />
              <p>
                Hi! My name is <strong>Jonathan</strong>, and I used work in sales. I have a new
                found passion for backend development
              </p>
              <div className="social-icons">
                <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/jonathan-carter-12b600174/">
                  <FaLinkedinIn className="social-icon" />
                </a>
                <a rel="noreferrer" target="_blank" href="https://github.com/JonathanSCarter">
                  <FaGithub className="social-icon" />
                </a>
              </div>
            </div>
            <div className="landing_about--box">
              <img src={omar_Elsahlah} alt="Omar Elsahlah" />
              <p>
                Hi! My name is <strong>Omar</strong>, I used to be a Technical Recruiter. Excited
                to work as a Software Engineer!
              </p>
              <div className="social-icons">
                <a rel="noreferrer" target="_blank" href="https://twitter.com/TallTechTitan">
                  <FaTwitter className="social-icon" />
                </a>
                <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/omarelsahlah">
                  <FaLinkedinIn className="social-icon" />
                </a>
                <a rel="noreferrer" target="_blank" href="https://github.com/FullStackin">
                  <FaGithub className="social-icon" />
                </a>
              </div>
            </div>
            <div className="landing_about--box">
              <img src={chris_Eke} alt="Chris Eke" />
              <p>
                Hi! I am <strong>Chris</strong>, and I was a self taught developer then joined
                a/A to further my knowledge!
              </p>
              <div className="social-icons">
                <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/iamchriseke/">
                  <FaLinkedinIn className="social-icon" />
                </a>
                <a rel="noreferrer" target="_blank" href="https://github.com/ChrisEkeDev">
                  <FaGithub className="social-icon" />
                </a>
                <a rel="noreferrer" target="_blank" href="https://dribbble.com/chriseke">
                  <FaDribbble className="social-icon"/>
                </a>
              </div>
            </div>
            <div className="landing_about--box">
              <img src={roman_Barbalat} alt="Roman Barbalat" />
              <p>
                Hi! I am <strong>Roman</strong>, I was an options trader. Looking for Software engineering role!
              </p>
              <div className="social-icons">
                <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/roman-barbalat-00140a63/">
                  <FaLinkedinIn className="social-icon" />
                </a>
                <a rel="noreferrer" target="_blank" href="https://github.com/rbarbalat">
                  <FaGithub className="social-icon" />
                </a>
              </div>
            </div>
          </div>
      </section>
      <footer className="landing_footer--wrapper">
        <div className="landing_footer--contents">
          <img src={logo2} className="landing_footer--logo"/>
          <div className="landing_footer--section">
            <h4>Jonathan Carter</h4>
            <ul>
              <li>Sample Interests</li>
              <li>Sample Interests</li>
              <li>Sample Interests</li>
              <li>Sample Interests</li>
            </ul>
          </div>
          <div className="landing_footer--section">
            <h4>Omar El Sahlah</h4>
            <ul>
              <li>Sample Interests</li>
              <li>Sample Interests</li>
              <li>Sample Interests</li>
              <li>Sample Interests</li>
            </ul>
          </div>
          <div className="landing_footer--section">
            <h4>Chris Eke</h4>
            <ul>
              <li>Sample Interests</li>
              <li>Sample Interests</li>
              <li>Sample Interests</li>
              <li>Sample Interests</li>
            </ul>
          </div>
          <div className="landing_footer--section">
            <h4>Roman Barbalat</h4>
            <ul>
              <li>Sample Interests</li>
              <li>Sample Interests</li>
              <li>Sample Interests</li>
              <li>Sample Interests</li>
            </ul>
          </div>
        </div>
        <div className="landing_footer--footer">
          <p>Copyright Cypher 2023</p>
        </div>
      </footer>
    </main>
  );
}

export default Landing;
