import React, { useState } from 'react'
import { Card,Button,Modal, Col,Row } from 'react-bootstrap'
import mediaPlayer from "../assets/mediaplayer.png"
import { Link } from 'react-router-dom';
function ProjectCard() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
   <>
   <Card style={{ width: '100%' }} className='shadow rounded-0 border-0' onClick={handleShow}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Media Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6} lg={6}>
                <img src={mediaPlayer} alt="" width={'100%'}/>
                </Col>
                <Col md={6} lg={6}>
                <h5>Description:</h5>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae maxime quasi qui eum voluptate at placeat laboriosam, commodi eveniet itaque perspiciatis excepturi repellat, nesciunt quisquam eaque nulla corrupti aliquam ea.</p>
                <h5>Technologies:</h5>
                <p>React, JSON Server, BootStrap</p>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
         <Link to={"https://github.com/abiyababy8/mediaplayer-frontend"} target='_blank'><i className="fa-brands fa-github me-3"></i></Link>
         <Link to={"https://mediaplayer-react-abiyababy8.netlify.app/"} target='_blank'><i className="fa-solid fa-link"></i></Link>
        </Modal.Footer>
      </Modal>
   </>
  )
}

export default ProjectCard