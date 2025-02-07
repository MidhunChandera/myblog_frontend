import React from 'react';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <div className='footer'>
      <div id='contact' style={{ backgroundColor: 'black' }} className="container-fluid app-container text-white p-5 py-5">
        <div className="row">
    
          <div className="col-md-3 mb-4">
            <h4>MyBlogsIn</h4>
            <p>
              Welcome to the ultimate source for fresh perspectives! Explore curated content to enlighten, entertain, and engage global readers.
            </p>
          </div>

          {/* Vertical Divider */}
          <div className="col-md-1 d-flex justify-content-center mb-4">
          <div className="border-end d-none d-sm-block" style={{ height: "200px" }}></div>
          </div>

          {/* Categories Section */}
          <div className="col-md-2 d-flex flex-column align-items-start mb-4">
            <h5>Categories</h5>
            <a href="/technology" className="text-white mb-2 hover-effect">Technology</a>
            <a href="/health-fitness" className="text-white mb-2 hover-effect">Health & Fitness</a>
            <a href="/personal-development" className="text-white mb-2 hover-effect">Personal Development</a>
            <a href="/finance-business" className="text-white mb-2 hover-effect">Finance & Business</a>
            <a href="/lifestyle" className="text-white mb-2 hover-effect">Lifestyle</a>
          </div>

          {/* Vertical Divider */}
          <div className="col-md-1 d-flex justify-content-center mb-4 hide-on-small">
          <div className="border-end d-none d-sm-block" style={{ height: "200px" }}></div>


          </div>


          <div className="col-md-4 mb-4">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3">
              <a target='_blank' href="https://facebook.com" className="text-white hover-icon">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a target='_blank' href="https://twitter.com" className="text-white hover-icon">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a target='_blank' href="https://instagram.com" className="text-white hover-icon">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a target='_blank' href="https://www.youtube.com/" className="text-white hover-icon">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
              </a>
            </div>
            <input  type="text" placeholder='E-Mail' className='form-control mt-2' />
            <p>By pressing the Subscribe button, you confirm that you have read and are agreeing to our Privacy Policy and Terms of Use</p><button className='btn btn-light mt-1'>SUBSCRIBE</button>
          </div>
        </div>

        <hr className="my-4" />

 
        <div className="text-center mt-5">
          <p className="small">&copy; 2024 MyBlogsIn. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;