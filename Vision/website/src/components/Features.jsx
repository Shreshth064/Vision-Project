import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "../styles/features.css";
import demandForecasting from "../assets/demand-forecasting.jpg";
import supplyChain from "../assets/supplychainmgmt.jpg";
import transportMonitoring from "../assets/transport-monitoring.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  delay: 350,
  once: false,
});

function Features() {
  return (
    <>
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={4} lg={2} className="card-container">
          <div
            data-aos="zoom-out-right"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <Card style={{ width: "18rem" }} className="features-card">
              <Card.Img variant="top" src={supplyChain} />
              <Card.Body>
                <Card.Title className="features-heading">Supply Chain Analysis</Card.Title>
                <Card.Text className="features-text">
                  Our software provides powerful supply chain analysis tools
                  that help you optimize your supply chain operations, identify
                  inefficiencies, and improve overall performance.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col xs={10} sm={8} md={4} lg={2} className="card-container">
          <div
            data-aos="zoom-out-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            data-aos-once="false"
          >
            <Card style={{ width: "18rem" }} className="features-card">
              <Card.Img variant="top" src={transportMonitoring} />
              <Card.Body>
                <Card.Title className="features-heading">Transport Monitoring</Card.Title>
                <Card.Text className="features-text">
                  Our software offers comprehensive transport monitoring
                  capabilities, allowing you to track and manage your fleet in
                  real-time.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col xs={10} sm={8} md={4} lg={2} className="card-container">
          <div
            data-aos="zoom-out-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            data-aos-once="false"
          >
            <Card style={{ width: "18rem" }} className="features-card">
              <Card.Img variant="top" src={demandForecasting} />
              <Card.Body>
                <Card.Title className="features-heading">Demand Forecasting</Card.Title>
                <Card.Text className="features-text">
                  Our software leverages advanced algorithms and historical data
                  analysis to provide accurate demand forecasts. Anticipate
                  future demand trends, optimize inventory levels, and improve
                  supply chain efficiency.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Features;
