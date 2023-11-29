import "../styles/pages/projects.css";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Message from "../layout/message";
import Loading from "../layout/loading";
import LinkNavegacao from "../layout/btnLink";
import ProjectCard from "../layout/projectCard";
import FormProjectProps from "../interface/formProjectProps";

export default function Projects() {

    const [dados, setDados] = useState<FormProjectProps[]>([])
    const [removeLoading, setRemoveLoading] = useState(false);

    const location = useLocation();
    let message = ""

    if (location.state) {
        message = location.state.message
    }

    const removeProject = (id: number) => {

        fetch(`http://localhost:3000/projects/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(() => {
                setDados(dados.filter((project) => project.id !== id))
            })
            .catch((error) => console.error("Ocorreu um erro ao deletar o projeto", error))
    }

    useEffect(() => {
        fetch('http://localhost:3000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setDados(data)
                setRemoveLoading(true)
            })
            .catch((error) => console.error("Não foi possivel trazer os projetos", error))
    }, [])

    return (
        <section className="project_container">

            <header className="title_container">
                <h1> MEUS PROJETOS: </h1>
                <LinkNavegacao to="/new-project"> Criar Projeto </LinkNavegacao>
            </header>

            {message && <Message type="success" message={message} />}

            <main className="main_container">

                {dados.length > 0 &&
                    dados?.map((project, index) => (
                        <ProjectCard
                            key={index}
                            id={project.id}
                            name={project.name}
                            budget={project.orcamento}
                            category={project.categoria}
                            handleRemove={removeProject}
                        />
                    ))
                }

                {!removeLoading && <Loading />}

                {removeLoading && dados.length === 0 && (
                    <p> Não há projetos cadastrados... </p>
                )}

            </main>

        </section>
    )
}