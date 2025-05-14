import React, { useContext, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import { base_url } from '../services/base_url';
import { toast, ToastContainer } from 'react-toastify';
import { updateProjectApi } from '../services/allApi';
import { editProjectResponseContext } from '../Context/ContextShare';

function EditProject({ project }) {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("")
  const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
  const handleClose = () => {
    setShow(false)
    resetForm()
  };
  const handleShow = () => setShow(true);
  console.log("Edit project:", project)
  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    language: project.language,
    githubLink: project.github,
    websiteLink: project.website,
    overview: project.overview,
    projectImage: ""
  })
  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])
  // to reset the user fields
  const resetForm = () => {
    setProjectDetails({
      id: project._id,
      title: project.title,
      language: project.language,
      githubLink: project.github,
      websiteLink: project.website,
      overview: project.overview,
      projectImage: ""
    })
    setPreview("")
  }
  const handleUpdate = async () => {
    console.log('Updated Project Details:', projectDetails)
    const { id, title, language, githubLink, websiteLink, overview, projectImage } = projectDetails

    if (!title || !language || !githubLink || !websiteLink || !overview) {
      toast.warning("Please fill the form completely!!")
    }
    else {
      // send data to backend
      // here we have to send a file, so instead of sending as object, we are passing data as formdata
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("githubLink", githubLink)
      reqBody.append("websiteLink", websiteLink)
      reqBody.append("overview", overview)
      preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", project.projectImage)
      const token = sessionStorage.getItem("token")
      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateProjectApi(id, reqBody, reqHeader)
        if (result.status === 200) {
          setEditProjectResponse(result.data)
          toast.success(`${title} updated successfully!`)
          setShow(false)

        }
        else {
          toast.error("Something Happened!")
        }
      }
      else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateProjectApi(id, reqBody, reqHeader)
        if (result.status === 200) {
          setEditProjectResponse(result.data)
          toast.success(`${title} updated successfully!`)
          setShow(false)

        }
        else {
          toast.error("Something Happened!")
        }
      }
    }
  }
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
                <input type="file" id='projectImg' style={{ display: 'none' }} onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                <img src={preview ? preview : `${base_url}/uploads/${project.projectImage}`} alt="" className='w-100' />
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
          <Button variant="secondary" onClick={resetForm}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update Project
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        autoClose={1000} />
    </>
  )
}

export default EditProject