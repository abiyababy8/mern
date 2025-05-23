import React, { useEffect, useState, useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import firstImage from '../assets/image1.png'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { getHomeProjectApi } from '../services/allApi'
import { isAuthTokenContext } from '../Context/ContextShare'
function Home() {
  const [isLogin, setIsLogin] = useState(false)
  const [homeProject, setHomeProject] = useState([])
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)
  const getHomeProject = async () => {
    const result = await getHomeProjectApi()
    console.log("Home Project:", result)
    setHomeProject(result.data)
  }
  useEffect(() => {
    getHomeProject()
  }, [])
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true)
    }
  }, [])
  return (
    <>
      <div className='container-fluid bg-success p-5' style={{ width: '100%', height: '100vh' }}>
        <Row className='mt-5'>
          <Col md={6} lg={6} className='d-flex justify-content-center align-items-center flex-column'>
            <div>
              <h3 className='text-light'>PROJECT FAIR</h3>
              <h6>One stop destination for all software projects</h6>
              {
                !isAuthToken ?
                  <Link to={"/login"}><button className='btn btn-outline-light mt-3'>GET STARTED <i class="fa-solid fa-arrow-right ms-2"></i></button></Link>
                  :
                  <Link to={"/dashboard"}><button className='btn btn-outline-light mt-3'>MANAGE PROJECTS <i class="fa-solid fa-arrow-right ms-2"></i></button></Link>
              }

            </div>
          </Col>
          <Col md={6} lg={6}>
            <img src={firstImage} alt="" style={{ width: '75%', height: '100%' }} />
          </Col>
        </Row>
      </div>
      <div className='container-fluid'>
        <h3 className='text-center my-5'>EXPLORE YOUR PROJECTS</h3>
        <div className='row mb-5'>
          <marquee scrollAmount={10}>
            <div className="row">
              {
                homeProject.length > 0 &&
                homeProject.map(item => (
                  <div className='col-md-5 col-lg-4 justify-content-center d-flex p-4'>
                    <ProjectCard projectData={item} />
                  </div>
                ))
              }
            </div>
          </marquee>
          <Link to={'/project'} style={{ textDecoration: 'none' }}>
            <h5 className='text-center text-warning fw-bold my-5'>SEE MORE PROJECTS</h5>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home