import React from 'react'
import { Link } from 'react-router-dom';

const Display = () => {

    let src ="https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=879&q=80";
    return (
        <div className='homepage-container'>
            <div className="homepage-left">
                <div className="welcome-wrapper">
                    <div className="welcome-brand-heading"><span className="brand-bold">CONC</span> RETE</div> <br/>
                <div className="welcome-heading">Welcome in the Store of Joy!</div> <br/>
                <div className="welcome-sub-heading">Order your favourite things with a smile</div>
                 
                        <Link to="/login"><button className="getStarted-btn">Get Started</button></Link>
       
                </div>
            
            </div>
            <div className="homepage-right" style={ { backgroundImage: ` url(${src})` } }></div>
           
            
        </div>
    )
}

export default Display
