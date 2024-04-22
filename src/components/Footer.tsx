import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

function Footer(){
    return (
      <MDBFooter bgColor='light' className='text-left text-lg-left'>
        <div className='text-left p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', textAlign: 'left' }}>
          <div>
            <a href='#/'>
              Home
            </a>
          </div>
          &copy; {new Date().getFullYear()} Company Name
        </div>
      </MDBFooter>
    );
}

export default Footer;