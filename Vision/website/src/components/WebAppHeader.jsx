import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../styles/webappheader.css';
import Button from "react-bootstrap/Button";
import Visualizer from '../components/Visualizer';
import BarChartAnalysis from './BarChartAnalysis';
import DataTable from './DataTable';

function WebAppHeader(props) {
  return (
    <>
   <div className="webapp-tabs">
    <Tabs
      defaultActiveKey="visualize"
      id="uncontrolled-tab-example"
      className="web-app-tab mb-3"
    >
      
      <Tab eventKey="visualize" title={<span className="tab-title">Visualize</span>}>
        <Visualizer edges={props.edges}/>
      </Tab>
      <Tab  eventKey="forecast" title={<span className="tab-title">Forecast</span>}>
        <BarChartAnalysis data={props.values}/>
      </Tab>
      <Tab eventKey="data" title={<span className="tab-title">Data</span>} >
        <DataTable data={props.values}/>
      </Tab>
    </Tabs>
    <Button href="/login" className='webapp-logout' variant="primary">Logout</Button>
    </div>
     
    
     </>
  );
}

export default WebAppHeader;