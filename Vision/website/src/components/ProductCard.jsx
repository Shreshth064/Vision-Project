import React from "react";
import "../styles/productcard.css";

function ProductCard(props) {
  return (
    <>
      <div className="product-container">
       <div className="product-img"> <img className="product-icon" src={props.src}></img></div>
    
        <div className="product-heading">
          <h3 className="product-title"><b>{props.heading}</b></h3>
        </div>
        <div className="product-text">
          <p className="product-text-text">{props.text}</p>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
