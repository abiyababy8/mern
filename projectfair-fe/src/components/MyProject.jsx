import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { Link } from 'react-router-dom'
import EditProject from './EditProject'
import { deleteProjectApi, getUserProjectApi } from '../services/allApi'
import { addProjectResponseContext, editProjectResponseContext } from '../Context/ContextShare'
import { toast, ToastContainer } from 'react-toastify'
function MyProject() {
    const [userProject, setUserProject] = useState([])
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
    const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
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
    }, [addProjectResponse, editProjectResponse])
    const handleDelete = async (projectId) => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await deleteProjectApi(projectId, reqHeader)
        if (result.status === 200) {
            console.log("Delete Status:",result)
            toast.success(`${result.data.title} deleted successfully!`)
            getUserProject()
            
        }
        else {
            toast.error("Something Happened! Cannnot Delete!")
        }
    }
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
                                        <EditProject project={item} />
                                        <i className="fa-solid fa-trash ms-3" style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(item._id)}></i>
                                    </div>
                                </div>
                            )) :
                            <p>NO PROJECT UPLOADED YET!</p>
                    }
                </div>
            </div>
            <ToastContainer autoClose={1000} />
        </>
    )
}

export default MyProject