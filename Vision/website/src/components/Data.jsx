import React from "react";
import DataImg from '../assets/data-background.png';
import '../styles/data.css';
import { useSpring, animated } from "react-spring";
import { useInView } from "framer-motion";

function Number({ n }) {
    const { number } = useSpring({
        from: { number: 0 },
        number: n,
        delay: 2500,
        config: { mass: 1, tension: 20, friction: 10 },
        loop: true
    });
    return (
        <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
    )
};

function Data() {
    return (
        <>
            <div className="data-container">
                <img className="data-image" src={DataImg} />
                <div className="data-container-column">
                    <div className="data-row">
                        <div className="data-column">
                            <div className="data-data">
                                <h1 className="data-number"><Number n={10}></Number></h1>
                                <p className="data-data-data"> plus regions of operation. </p>
                            </div>
                            <div className="data-data">
                                <h1 className="data-number"><Number n={53}></Number></h1>
                                <p className="data-data-data"> plus happy customers. </p>
                            </div>
                        </div>
                        <div className="data-column">
                            <div className="data-data">
                                <h1 className="data-number"><Number n={10000}></Number></h1>
                                <p className="data-data-data"> plus dollars saved. </p>
                            </div>
                            <div className="data-data">
                                <h1 className="data-number"><Number n={2300}></Number></h1>
                                <p className="data-data-data"> plus hours waste prevented. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Data;