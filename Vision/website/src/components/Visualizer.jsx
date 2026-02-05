import React from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true
});

class Mermaid extends React.Component {
  componentDidMount() {
    mermaid.contentLoaded();
  }
  render() {
    return <div className="mermaid">{this.props.chart}</div>;
  }
}

class Mermaid1 extends React.Component {
  componentDidMount() {
    var hack = Math.random().toString(36).substring(7).replace(/\d/, "a");
  }

  render() {
    return <div style={{ width: 500, height: 300 }}>{this.props.chart}</div>;
  }
}

function Visualizer(props) {
  return (
      <Mermaid
        chart={`graph LR;
        A[Manufacturer 1] --${props.edges[0]}--> B[Distributor 1];
        A[Manufacturer 1] --${props.edges[1]}--> C[Distributor 2];
        B[Distributor 1] --${props.edges[2]}--> D[Retailer 1];
        B[Distributor 1] --${props.edges[3]}--> E[Retailer 2];
        C[Distributor 2] --${props.edges[4]}--> F[Retailer 3]
        `}
        orientation="vertical"
      />
  );
}

export default Visualizer;