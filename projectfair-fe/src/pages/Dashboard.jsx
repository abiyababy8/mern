import React from 'react'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {
  return (
    <>
      <div className="container-fluid">
        <h4 className='my-4 ms-4'>WELCOME <span className='text-warning'>JOHN SAMUEL</span></h4>
        <div className='row'>
          <div className="col-md-8">
            <MyProject />
          </div>
          <div className="col-md-4">
            <Profile />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard