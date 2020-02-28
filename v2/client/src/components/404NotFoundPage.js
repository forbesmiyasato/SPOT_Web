import React from 'react';


const NotFound = (props) => {
    return (
        <div className="utility-center">
            <h1> 404 </h1>
            <h2> Page Not Found </h2>
            <h4> The page you are looking for doesn't exist or an other error occurred. <a href="/"> Go Back </a>, or head over to <a href="/"> spot.com </a> to try again</h4>
        </div>
    )
}

export default NotFound;