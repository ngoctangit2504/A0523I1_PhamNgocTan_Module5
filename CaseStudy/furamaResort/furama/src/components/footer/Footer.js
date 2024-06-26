import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS từ Bootstrap

function Footer() {
    return(
        <div className="card text-center">
            <div className="card-header">
                Furama
            </div>
            <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
            <div className="card-footer text-body-secondary">
                @ Furama 2024
            </div>
        </div>
    )
}

export default Footer;