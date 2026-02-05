import React from "react";
import support from "../assets/support.png";
import dataImg from "../assets/monitor.png";
import visibility from "../assets/high-visibility.png";
import ProductCard from "./ProductCard";
import "../styles/productsection.css";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  delay: 100,
  once: false,
});

function ProductSection() {
  return (
    <>
      <div className="product-section-container">
        <div
          data-aos="zoom-in"
          data-aos-easing="ease-out-sine"
          data-aos-duration="300"
        >
          <ProductCard
            src={visibility}
            heading="Supply Chain Visualizer"
            text="Gain real-time, end-to-end visibility into your entire supply chain.  No more scrambling for data across different systems.  See inventory levels, track shipments, and monitor fulfillment processes - all in one central location.  This clear picture empowers you to identify bottlenecks, optimize workflows, and make data-driven decisions that streamline your operations."
          ></ProductCard>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-easing="ease-out-sine"
          data-aos-duration="300"
        >
          <ProductCard
            src={support}
            heading="Transport Analyzer"
            text="Don't let inefficient routes and hidden costs eat away at your bottom line.  Transport Analyzer analyzes your entire transportation network, pinpointing areas for improvement.  Optimize delivery routes, identify cost-saving opportunities, and gain real-time insights into potential disruptions.  This allows you to proactively adjust routes, predict delays before they happen, and ensure on-time deliveries at a lower cost."
          ></ProductCard>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-easing="ease-out-sine"
          data-aos-duration="300"
        >
          <ProductCard
            src={dataImg}
            heading="Forecasting AI"
            text="Stop reacting to supply chain challenges and start predicting them.  Our Prediction AI leverages cutting-edge artificial intelligence to forecast demand fluctuations, optimize inventory levels, and mitigate potential risks.  Stay ahead of the curve by anticipating market shifts and customer trends.  This proactive approach ensures you always have the right products in stock, minimizing stockouts and lost sales."
          ></ProductCard>
        </div>
      </div>
    </>
  );
}

export default ProductSection;
