import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import { base_url } from '../services/base_url';
function EditProject({ project }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("Edit project:", project)
  const [projectDetails, setProjectDetails] = useState({
    title: project.title,
    language: project.language,
    githubLink: project.github,
    websiteLink: project.website,
    overview: project.overview,
    projectImage: project.projectImage
  })
  return (
    <>
      <i className="fa-solid fa-pen-to-square ms-3 text-danger" onClick={handleShow}></i>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>EDIT PROJECT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 mt-3">
              <label htmlFor="projectImg">
                <input type="file" id='projectImg' style={{ display: 'none' }} />
                <img src={`${base_url}/uploads/${projectDetails.projectImage}`} alt="" className='w-100' />
              </label>
            </div>
            <div className="col-md-6">
              <div className='mt-3'><input type="text" placeholder='Project Title' className='form-control' value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} /></div>
              <div className='mt-3'><input type="text" placeholder='Technologies Used' className='form-control' value={projectDetails.language} onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} /></div>
              <div className='mt-3'><input type="text" placeholder='Github Link' className='form-control' value={projectDetails.githubLink} onChange={(e) => setProjectDetails({ ...projectDetails, githubLink: e.target.value })} /></div>
              <div className='mt-3'><input type="text" placeholder='Website Link' className='form-control' value={projectDetails.websiteLink} onChange={(e) => setProjectDetails({ ...projectDetails, websiteLink: e.target.value })} /></div>
              <div className='mt-3'><textarea placeholder='Project Overview' rows={4} className='form-control' value={projectDetails.overview} onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}></textarea></div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Edit Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject