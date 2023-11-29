import { Outlet } from "react-router-dom"

import NavBar from "../components/navBar"

export default function Container() {
    return (
        <section>
            <header>
                <NavBar />
            </header>

            <main>
                <Outlet />
            </main>
        </section>
    )
}