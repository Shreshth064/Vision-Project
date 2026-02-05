import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import walmart from '../assets/walmart.png';
import dmart from '../assets/dmart.png';
import mcdonalds from '../assets/mcdonalds.png';
import lotus from '../assets/lotus.png';
import lakme from '../assets/lakme.png';
import '../styles/footer.css';

function Footer() {
  return (
    <MDBFooter  className='custom-footer text-center text-lg-start text-muted'>
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='4' lg='5' xl='6' className='bg-color mx-auto mb-4'>
              <h6 className='footer-title footer-top text-uppercase fw-bold mb-4'>
                 Our Vision
              </h6>
              <p className='footer-text'>
              We are aiming to build a Supply Chain Management Solution, which will help all the stakeholders of the Supply Chain to manage and access data of quantity ordered and how much to keep in buffer stock, in order to mitigate the impact of bullwhip effect.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='bg-color mx-auto mb-4'>
              <h6 className='footer-title footer-top text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Chain Visualizer
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Transport AI
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Forecast AI
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='bg-color mx-auto mb-4'>
              <h6 className='footer-title footer-top text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Our Products
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  About Us
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                   Contact Us
                </a>
              </p>
             
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
        
      <div className='company-name text-center p-4 custom-background custom-text-color' >
        <img className='footer-logo' src={walmart}></img>
        <img className='footer-logo' src={lotus}></img>
        <img className='footer-logo' src={dmart}></img>
        <img className='footer-logo' src={lakme}></img>
        <img className='footer-logo' src={mcdonalds}></img>
      </div>

      <div className='footer-foot text-center p-4 custom-background custom-text-color' >
        © 2024 Copyright  All Rights Reserved 
      </div>

      

     
    </MDBFooter>
  );
}



export default Footer;