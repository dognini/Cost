import { Link } from "react-router-dom";

import Logo from "/costs_logo.png";

import "../styles/components/navBar.css";

export default function NavBar() {
    return (
        <nav className="navbar">

            <Link to="/">
                <img src={Logo} alt="logo do costs" />
            </Link>

            <ul className="list">
                <li>
                    <Link to="/"> Home </Link>
                </li>

                <li>
                    <Link to="/projects"> Projetos </Link>
                </li>
            </ul>
        </nav>
    )
}