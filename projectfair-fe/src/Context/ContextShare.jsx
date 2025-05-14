import React, { createContext, useState } from 'react'

//create a context
export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()

function ContextShare({ children }) {
    //children is predefined props used to share data between all components

    // create a state , that state is we are sharing between components
    const [addProjectResponse, setAddProjectResponse] = useState({})
    const [editProjectResponse, setEditProjectResponse] = useState({})

    return (
        <>
            <addProjectResponseContext.Provider
                value={{ addProjectResponse, setAddProjectResponse }}
            >
                <editProjectResponseContext.Provider
                    value={{ editProjectResponse, setEditProjectResponse }}
                >
                    {children}
                </editProjectResponseContext.Provider>
            </addProjectResponseContext.Provider>

        </>
    )
}

export default ContextShare