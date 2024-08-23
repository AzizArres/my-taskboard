/* eslint-disable no-unused-vars */
import React from "react"
import logo from "/src/assets/Logo.svg"

function Header(){
    return(
        <div className="header">
            <img src={logo} alt="" />
            <h1>My Task Board</h1>
            <p>Tasks to keep organised</p>
        </div>
    )
}

export default Header;