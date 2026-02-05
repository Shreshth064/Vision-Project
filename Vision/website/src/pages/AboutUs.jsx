import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Quotes from "../components/Quotes";
import Heading from "../components/Heading";
import OurTeam from "../components/OurTeam";

function AboutUs() {
    return (
        <>
            <Header />
            <Quotes />
            <Heading title="Meet Our Team"/>
            <OurTeam />
            <Footer />
        </>
    );
}

export default AboutUs;