import React from "react";
import productbg from "../assets/products-bg.png";
import Button from "react-bootstrap/Button";
import '../styles/productbanner.css';
function ProductBanner() {
  return (
    <>
      <div className="product-banner">
        <img className="product-image" src={productbg} />
        <Button href="/contactus" className="product-banner-button" variant="outline-light">
          Reach Out To Us
        </Button>
      </div>
    </>
  );
}

export default ProductBanner;
