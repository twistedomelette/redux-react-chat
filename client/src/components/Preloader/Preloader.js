import React from "react";
import "./Preloader.css"
import spinner from "../../icons/loading.gif"

const Preloader = () => {
    return (
        <div className="preloader">
            <div>Loading</div>
            <img alt="spinner" src={spinner} width="100"/>
        </div>
    );
}

export default Preloader;