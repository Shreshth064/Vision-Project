import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Features from "../components/Features";
import Heading from "../components/Heading";
import WhySection from "../components/WhySection";
import Data from "../components/Data";

function Home() {
    return (
        <>
            <Header />
            <Banner />
            <Heading title="Key Features" />
            <Features />
            <Data />
            <Heading title="Why Choose Us?" />
            <WhySection />
            <Footer />
        </>
    );
}

export default Home;