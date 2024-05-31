import React from "react";

export default function Loading() {
    return(
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="spinner-border align-self-center" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}