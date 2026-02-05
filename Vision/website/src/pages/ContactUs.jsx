import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import reachout from "../assets/reach-out.png";
import AnimatedHand from "../assets/man-waiving-hand.json";
import Lottie from 'lottie-react';
import '../styles/contactus.css';
function ContactUs() {
    return (
        <>
            <Header />
            <img className="contact-image" src={reachout} />
            <div className="contact-animation">
                <div className="contact-form">
                    <ContactForm />
                </div>
                <Lottie className='hand-animation' animationData={AnimatedHand} />
            </div>
            <Footer />
        </>
    );
}

export default ContactUs;