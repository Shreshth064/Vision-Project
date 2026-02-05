import React from "react";
import Button from 'react-bootstrap/Button';
import Typewriter from './Typewriter';
import img from '../assets/banner-mockup.png';
import '../styles/banner.css'

function Banner() {
    return (
        <div className="banner-container">
            <img className="banner-image" src={img} />
            <p className="banner-heading"><Typewriter className="typewriter" text="FINDING THE RIGHT SOLUTION FOR YOUR BUSINESS IN SUPPLY CHAIN ANALYSIS, TRANSPORT MONITORING, DEMAND FORECASTING" delay={1000} /></p>
            <p className="banner-content">We are aiming to build a Supply Chain Management Solution, which will help all the stakeholders of the Supply Chain to manage and access data of quantity ordered and how much to keep in buffer stock, in order to mitigate the impact of bullwhip effect.</p>
            <Button href="/contactus" className='banner-button' variant="btn btn-primary">Request a demo</Button>
        </div>
    )
};

export default Banner;