import React from "react"
import { Link } from "react-router-dom"
import "./LandingPage.css";


export default function LandingPage() {
    return <div className="landingPage">
        <h1>Welcome</h1>
        <Link to="/dogs">
            <button>Home</button>
        </Link>
    </div>
}