import React from "react";
import story from "../assets/story-background.png";
import "../styles/quotes.css";
import logo from "../assets/logo.png";

function Quotes() {
  return (
    <>
      <div className="about-story">
        <img className="story-image" src={story} />
      </div>
      <div className="about-quote">
        <h2 className="about-quote-quote">
          "We believe the supply chain is the backbone of every business. That's why we're dedicated to crafting the most effective, tailored solutions to optimize the unique flow of your operations."
        </h2>
        <img className="about-quote-logo" src={logo}></img>
        <h4 className="about-quote-text"><b>TEAM VISIONNAIRES</b></h4>
      </div>
    </>
  );
}

export default Quotes;
