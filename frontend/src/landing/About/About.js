import React from 'react';
import DeleteAccountButton from 'landing/DeleteAccount/DeleteAccountButton';
import './About.css';

function About(props) {

  const accessToken = props.accessToken;
  const setAccessToken = props.setAccessToken;
  var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"));

  let delAccButton;

  if (jwtToken) {
    delAccButton = <DeleteAccountButton />
  } else {
    delAccButton = null
  }
  
  return (

    <div className="AboutPage">
      
      <div className="AboutPageFirstSection">
        <p className="AboutPageText">About U-Impactify</p>
        <div className="AboutPageIMac"></div>
        {delAccButton}
      </div>

      <div className="AboutPageSecondSection">
        <div className="AboutPageText1"></div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        {/* <p className="AboutPageText">What are we aiming for?</p> */}
        <div className="textBG"></div>
        <div className="AboutPageImg1"></div>
        <div className="AboutPageImg2"></div>
      </div>

      <div className="AboutPageThirdSection">
        <div>
          <a href="/SignUp">
            <button className="">GET STARTED</button>
          </a>
          <p className="HomePageRequestDemoText">Request an instant demo</p>
        </div>
      </div>

      <div className="footer"> 
        <div className="footerImg">
          <img id="footerLogo" src={require('../../images/logo.svg')} alt="Logo"/>
        </div>
          
        <div className="footerText">
          <div className="footerColumn">
            <p>Product</p>
            <p>Help Centre</p>
            <p>Platform</p>
            <p>Accessibility</p>
            <p>Terms of Use</p>
            <p>Privacy Policy</p>
          </div>

          <div className="footerColumn">
            <p>Use Cases</p>
            <p>Non-Profits</p>
            <p>Governments</p>
            <p>Social Enterprises</p>
            <p>Charities</p>
          </div>

          <div className="footerColumn">
            <p>About</p>
            <p>About Us</p>
            <p>Contact Us</p>
            <p>Blog</p>
            <p>FAQ</p>
          </div>

          <div className="footerColumn">
            <p>Follow Us</p>
            <a href="/">Facebook</a>
            <br></br>
            <a href="/">Instagram</a>
            <br></br>
            <a href="/">LinkedIn</a>
            <p>Language&nbsp;&nbsp;🌏</p>
            <select className="languageSelect">
              <option selected="selected" value="0">English (CA)</option>
              <option value="1">English (US)</option>
              <option value="2">اَلْعَرَبِيَّةُ‎</option>
              <option value="3">Türkçe</option>
              <option value="4">Español</option>
              <option value="4">français</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
