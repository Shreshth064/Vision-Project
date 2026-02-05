import React from "react";
import '../styles/whycard.css';

function WhyCard(props){
    return (
        <>
        <div className="why-row">
            <img className="why-icon" src={props.src}></img>
            <div className="why-col">
                <h1 className="why-heading">
                    {props.heading}
                </h1>
                <p className="why-text">
                    {props.text}
                </p>
            </div>
        </div>
        </>
    );
}

export default WhyCard;