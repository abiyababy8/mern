import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { Link } from 'react-router-dom'
import EditProject from './EditProject'
import { getUserProjectApi } from '../services/allApi'
import { addProjectResponseContext } from '../Context/ContextShare'

function MyProject() {
    const [userProject, setUserProject] = useState([])
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
    const getUserProject = async () => {
        const token = sessionStorage.getItem("token")
        const requestHeader = {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
        const result = await getUserProjectApi(requestHeader)
        console.log("User Projects:", result.data)
        setUserProject(result.data)
    }
    useEffect(() => {
        getUserProject()
    }, [addProjectResponse])
    return (
        <>
            <div className='shadow p-5 mb-5'>
                <div>
                    <div className='d-flex mt-3'>
                        <h5 className='text-success me-auto'>MY PROJECTS</h5>
                        <AddProject />
                    </div>
                    {
                        userProject?.length > 0 ?
                            userProject.map(item => (
                                <div className="p-3 mt-3 rounded d-flex" style={{ backgroundColor: 'lightgrey' }}>
                                    <h6>{item.title}</h6>
                                    <div className='d-flex ms-auto align-items-center'>
                                        <Link to={item.github} target='_blank'><i className="fa-brands fa-github" style={{ color: 'blue' }}></i></Link>
                                        <Link to={item.website} target='_blank'><i className="fa-solid fa-link ms-3" style={{ color: 'blue' }}></i></Link>
                                        <EditProject project={item}/>
                                        <i className="fa-solid fa-trash ms-3" style={{ color: 'red' }}></i>
                                    </div>
                                </div>
                            )) :
                            <p>NO PROJECT UPLOADED YET!</p>
                    }
                </div>
            </div>
        </>
    )
}

export default MyProject