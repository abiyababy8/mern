import React, { useContext } from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthTokenContext } from '../Context/ContextShare'
function Header() {
  const navigate = useNavigate()
  const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)

  const logout = () => {
    if (sessionStorage.getItem("token")) {
      sessionStorage.removeItem("token")
    }
    if (sessionStorage.getItem("existingUser")) {
      sessionStorage.removeItem("existingUser")
    }
    setIsAuthToken(false)
    navigate('/')
  }
  return (
    <>
      <Navbar className="bg-primary">
        <Container>

          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Navbar.Brand href="#home" className='text-light'>
              <i class="fa-brands fa-stack-overflow text-warning me-3"></i>
              PROJECT FAIR
            </Navbar.Brand>
          </Link>
          {
            isAuthToken ?
              <button className='btn btn-warning me-2' onClick={logout}><i class="fa-solid fa-power-off"></i> LOG OUT</button>
              :
              <Link to={'/login'}>
                <button className='btn btn-warning me-2'><i class="fa-solid fa-power-off"></i> LOG IN</button>
              </Link>

          }
        </Container>
      </Navbar>
    </>
  )
}

export default Header