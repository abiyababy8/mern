import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectApi } from '../services/allApi'

function Project() {
  const [allProject, setAllProject] = useState([])
  const getAllProject = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      const header = {
        'Content_Type': "application/json",
        'Authorization': `Bearer ${token}`
      }
      const result = await getAllProjectApi(header)
      console.log('All Project:', result)
      setAllProject(result.data)
    }
  }
  useEffect(() => {
    getAllProject()
  }, [])
  return (
    <>
      <div className='container-fluid'>
        <h3 className='text-center mt-5 text-warning'>EXPLORE PROJECTS</h3>
      </div>
      <div className='row my-5'>
        <div className="col-md-4"></div>
        <div className="col-md-4 d-flex">
          <input type="text" className='form-control' placeholder='Search By Technologies' />
          <i className="fa-solid fa-magnifying-glass" style={{ marginTop: '12px', marginLeft: '-30px', color: 'orange' }}></i>
        </div>
        <div className="col-md-4"></div>
      </div>
      <div className="row my-5 p-5">
        {
          allProject.length > 0 ?
            allProject.map(item => (
              <div className='col-md-4 p-3'>
                <ProjectCard projectData={item} />
              </div>
            )) :
            <p>NO PROJECT FOUND</p>
        }

      </div>

    </>
  )
}

export default Project