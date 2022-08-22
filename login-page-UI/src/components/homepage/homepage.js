import React from 'react'
import './homepage.css'
const Homepage = ({ setLoginUser }) => {

    return (
        <div className="homepage">
            <h1>Hello Homepage</h1>
            <button className='btn ' onClick={() => setLoginUser({})}>Logout</button>
        </div>
    )
}

export default Homepage
