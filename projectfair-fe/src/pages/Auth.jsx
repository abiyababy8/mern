import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import authImage from '../assets/image2.png'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import { isAuthTokenContext } from '../Context/ContextShare'
function Auth({ registerPage }) {
  const isRegisterPage = registerPage ? true : false
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)
  // useNavigate() hook is used to navigate to another page
  const navigate = useNavigate()
  // create a state to hold all input values
  const [userData, setUserData] = useState({
    name: "", email: "", password: ""
  })
  const handleRegister = async () => {
    console.log("User entered data", userData)
    const { name, email, password } = userData
    if (!name || !email || !password) {

      toast.warning('Please fill the form completely!!!');
    }
    else {
      //call api to register the user
      const result = await registerApi(userData)

      if (result.status == 201) {
        toast.success(`${userData.name} Registered Successfully!!!`)
        setUserData({
          name: "",
          email: "",
          password: ""
        })
        // navigate to login page
        navigate('/login')

      }
      else if (result.status == 409) {
        toast.warning(`${userData.email} already exists, Please Login!`)
      }
      else {
        toast.error("Something Happened!!!")
      }
    }
  }
  const handleLogin = async () => {
    const { email, password } = userData
    console.log(email, password)
    if (!email || !password) {
      toast.warning("Please fill the form completely!")
    }
    else {
      //call api to login the user
      const result = await loginApi(userData)
      if (result.status == 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.user_data))
        sessionStorage.setItem("token", result.data.jwt_token)
        setIsAuthToken(true)
        toast.success("Login Successfull!")
        navigate('/')
      }
      else if (result.status == 406) {
        toast.error("Invalid Email or Password!")
      }
      else {
        toast.error("Something bad happened!")
      }
    }
  }
  useEffect(() => {
    setUserData({
      name: "", email: "", password: ""
    })
  }, [registerPage])
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
            {
              isRegisterPage ?
                <h5 className='text center mt-2'>Sign Up to Your Account</h5>
                :
                <h5 className='text center mt-2'>Sign In to Your Account</h5>
            }
            <div className='w-100 d-flex justify-content-center align-items-center flex-column'>
              {
                isRegisterPage &&
                <input type="text" placeholder='Enter Your Name' className='form-control w-50 rounded mt-3' onChange={(e) => setUserData({ ...userData, name: e.target.value })} value={userData.name} />
              }

              <input type="text" placeholder='Enter Your Email' className='form-control w-50 rounded mt-3' onChange={(e) => setUserData({ ...userData, email: e.target.value })} value={userData.email} />
              <input type="password" placeholder='Enter Your Password' className='form-control w-50 rounded mt-3' onChange={(e) => setUserData({ ...userData, password: e.target.value })} value={userData.password} />
              {
                isRegisterPage ?
                  <button className='btn btn-warning mt-3 w-50' onClick={handleRegister}>REGISTER</button>
                  :
                  <button className='btn btn-warning mt-3 w-50' onClick={handleLogin}>LOG IN</button>
              }

            </div>
            <div>
              {
                isRegisterPage ?
                  <Link to={'/login'} style={{ textDecoration: "none" }}><p className='mt-2'>ALREADY A USER? <span style={{ color: 'blue' }}>LOG IN</span></p></Link>
                  :
                  <Link to={'/register'} style={{ textDecoration: "none" }}><p className='mt-2'>NOT REGISTERED YET? <span style={{ color: 'blue' }}>REGISTER</span></p></Link>
              }

            </div>
          </Col>
        </Row>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default Auth