import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <>
      <div className='d-flex justify-content-center align-items-center bg-primary'>
        <div className='d-flex justify-content-center align-items-evenly'>
          <div className='overview mt-1' style={{ width: '400px' }}>
            <h5><i class="fa-brands fa-stack-overflow text-warning me-3"></i>
              <span style={{ color: 'white' }}>PROJECT FAIR</span></h5>
            <p style={{ color: 'white', textAlign: 'justify' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident deleniti velit eligendi voluptatum ipsum quia assumenda nemo nisi ipsam, voluptas unde maiores. Quam veniam repudiandae cumque voluptas tenetur nostrum repellat.</p>
          </div>
          <div className='links d-flex flex-column ms-5 mt-1' style={{ color: 'white' }}>
            <h6 className='text-light' style={{fontWeight:'700'}}>LINKS</h6>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}> Home </Link>

            <Link to={'/auth'} style={{ textDecoration: 'none', color: 'white' }}>Log in</Link>

            <Link to={'/project'} style={{ textDecoration: 'none', color: 'white' }}>Projects</Link>
          </div>
          <div className='links d-flex flex-column ms-5 mt-1' style={{ color: 'white' }}>
            <h6 className='text-light' style={{fontWeight:'700'}}>GUIDES</h6>
            React
            <br />
            React Bootstrap
            <br />
            Font Awesome
          </div>
          <div className='contact_us ms-5 mt-1' style={{ color: 'white' }}>
            <h6 className='text-light' style={{fontWeight:'700'}}>CONTACT US</h6>
            <div className='d-flex'>
              <input type="text" placeholder='Enter Your Email' className='form-control' style={{borderRadius:'5px'}}/>
              <button className='btn btn-warning ms-3'>Subscribe</button>
            </div>
            <div className='d-flex justify-content-evenly align-items-center mt-3'>
              <i className="fa-brands fa-instagram fa-2x"></i>
              <i className="fa-brands fa-facebook fa-2x"></i>
              <i className="fa-brands fa-whatsapp fa-2x"></i>
              <i className="fa-brands fa-x-twitter fa-2x"></i>
            </div>
          </div>
        </div>
      </div>
      <p className='text-center textStyle'>COPY RIGHT © 2025 PROJECT FAIR BUILT WITH REACT</p>
    </>
  )
}

export default Footer