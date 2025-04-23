import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import authImage from '../assets/image2.png'
function Auth() {
  return (
    <>
      <div className='container-fluid ms-5 mt-3 mb-3'>
        <Link to={'/'} style={{ textDecoration: "none" }}>
          <h5 className='text-warning fw-bold'><i className="fa-solid fa-arrow-left me-3"></i>BACK TO HOME</h5>
        </Link>
      </div>
      <div className='container-fluid bg-light'>
        <Row>
          <Col md={5} className='ms-5 mb-5 mt-5 d-flex justify-content-center align-items-center'>
            <img src={authImage} alt="" width={'70%'} />
          </Col>
          <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
            <h4 className='text-center'><i class="fa-brands fa-stack-overflow text-warning me-3"></i> PROJECT FAIR</h4>
            <h5 className='text center mt-2'>Sign Up to Your Account</h5>
            <div className='w-100 d-flex justify-content-center align-items-center flex-column'>
              <input type="text" placeholder='Enter Your Name' className='form-control w-50 rounded mt-3' />
              <input type="text" placeholder='Enter Your Email' className='form-control w-50 rounded mt-3' />
              <input type="password" placeholder='Enter Your Password' className='form-control w-50 rounded mt-3' />

              <button className='btn btn-warning mt-3 w-50'>
                <Link to={'/dashboard'} style={{ textDecoration: "none", width: '100%' }}>
                  REGISTER
                </Link>
              </button>
            </div>
            <div>
              <p className='mt-2'>ALREADY A USER? <span style={{ color: 'blue' }}>LOG IN</span></p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Auth