import React from 'react'
import { Navbar,Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Header() {
  return (
   <>
   <Navbar className="bg-primary">
        <Container>
          
         <Link to={'/'} style={{textDecoration:'none'}}>
         <Navbar.Brand href="#home"  className='text-light'>
          <i class="fa-brands fa-stack-overflow text-warning me-3"></i>
            PROJECT FAIR
          </Navbar.Brand>
         </Link>
          <button className='btn btn-warning me-2'><i class="fa-solid fa-power-off"></i> LOG OUT</button>
          
        </Container>
      </Navbar>
   </>
  )
}

export default Header