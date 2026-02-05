import { TypeAnimation } from 'react-type-animation';

const Typewriter = ({ text, delay }) => {
    return (
        <TypeAnimation
            sequence={[
                'FINDING THE RIGHT SOLUTION FOR YOUR BUSINESS IN SUPPLY CHAIN ANALYSIS',
                1000,
                'FINDING THE RIGHT SOLUTION FOR YOUR BUSINESS IN TRANSPORT MONITORING',
                1000,
                'FINDING THE RIGHT SOLUTION FOR YOUR BUSINESS IN DEMAND FORECASTING',
                1000
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '1.5em', display: 'inline-block'}}
            repeat={Infinity}
        />
    );
};

export default Typewriter;