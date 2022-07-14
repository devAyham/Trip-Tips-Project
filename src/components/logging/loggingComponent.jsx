import React from 'react';
import { Link } from 'react-router-dom';

let Logging = () =>{
    return (
        <>
        <div className="container-fluid logging-container ">
            <div className="img-box"></div>
            <div className="overlay  mt-sm-1">
                <div className="welcome-text">Welcome To ... </div>
                <div className="trip-logo "></div>
                <div className="welcome-text-two">Where The World Bacome In <br/> Your Hands <br/></div>
                <div className="welcome-text-three">Log in or create a new acount to get all our services</div>  
                <div className="bottons_container ">
                    <Link  to='./signin'><span className='botton  fs-4   py-2 px-4'> Sign In </span></Link> 
                    <Link  to='./signup'><span className='botton  fs-4   py-2 px-4'> Sign Up </span></Link> 
                </div>
            </div>
        </div>
        </>
    )
}

export default Logging

