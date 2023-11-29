import "../styles/layout/btnLink.css";

import { Link } from "react-router-dom"
import LinkProps from "../interface/btnLinkProps";

const LinkNavegacao = ({ to, children }: LinkProps) => {
    return (
        <Link className="btn" to={to}>
            {children}
        </Link>
    )
}

export default LinkNavegacao;