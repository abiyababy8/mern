import React, { createContext, useState } from 'react'

//create a context
export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()
export const isAuthTokenContext = createContext()

function ContextShare({ children }) {
    //children is predefined props used to share data between all components

    // create a state , that state is we are sharing between components
    const [addProjectResponse, setAddProjectResponse] = useState({})
    const [editProjectResponse, setEditProjectResponse] = useState({})
    const [isAuthToken, setIsAuthToken] = useState(false)

    return (
        <>
            <addProjectResponseContext.Provider
                value={{ addProjectResponse, setAddProjectResponse }}
            >
                <editProjectResponseContext.Provider
                    value={{ editProjectResponse, setEditProjectResponse }}
                >
                    <isAuthTokenContext.Provider
                        value={{ isAuthToken, setIsAuthToken }}
                    >
                        {children}
                    </isAuthTokenContext.Provider>
                </editProjectResponseContext.Provider>
            </addProjectResponseContext.Provider>

        </>
    )
}

export default ContextShare