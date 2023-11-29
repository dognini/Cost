import "../styles/pages/newProject.css";

import { useNavigate } from "react-router-dom";

import ProjectForm from "../components/projectForm";
import FormProjectProps from "../interface/formProjectProps";

export default function NewProject() {

    const navigate = useNavigate();

    const createPost = (project: FormProjectProps) => {

        project.cost = 0
        project.services = []

        fetch("http://localhost:3000/projects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(() => {
                navigate("/projects", { state: { message: 'Projeto criado com sucesso!' } });
            })
            .catch((error) => console.log("Não foi possivel cadastrar um novo projeto: ", error))
    }

    return (
        <div className="newproject_container">
            <h1> Criar Projeto </h1>

            <p> Crie seu projeto para depois adicionar aos serviços </p>

            <ProjectForm
                handleSubmit={createPost}
                btnText="Criar Projeto"
            />
        </div>
    )
}