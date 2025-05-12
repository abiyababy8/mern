import React, { useEffect, useState } from 'react'
import AddProject from './AddProject'
import { Link } from 'react-router-dom'
import EditProject from './EditProject'
import { getUserProjectApi } from '../services/allApi'

function MyProject() {
    const [userProject, setUserProject] = useState([])
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
    }, [])
    return (
        <>
            <div className='shadow p-5 mb-5'>
                <div>
                    <div className='d-flex mt-3'>
                        <h5 className='text-success me-auto'>MY PROJECTS</h5>
                        <AddProject />
                    </div>
                </div>
                <div className="p-3 mt-3 rounded d-flex" style={{ backgroundColor: 'lightgrey' }}>
                    <h6>MEDIA PLAYER</h6>
                    <div className='d-flex ms-auto align-items-center'>
                        <Link to={"https://github.com/abiyababy8/mediaplayer-frontend"} target='_blank'><i className="fa-brands fa-github" style={{ color: 'blue' }}></i></Link>
                        <Link to={"https://mediaplayer-react-abiyababy8.netlify.app/"} target='_blank'><i className="fa-solid fa-link ms-3" style={{ color: 'blue' }}></i></Link>
                        <EditProject />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProject