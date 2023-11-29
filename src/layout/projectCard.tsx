import "../styles/layout/projectCard.css";

import { Link } from "react-router-dom";
import { GrEdit } from "react-icons/gr"
import { FaTrashAlt } from "react-icons/fa";
import OptionsProps from "../interface/formProjectProps";

interface ProjectCardProps {
    id: number
    name: string
    budget: string
    category: OptionsProps[]
    handleRemove: (id: number) => void
}

const ProjectCard = ({ id, name, budget, category, handleRemove }: ProjectCardProps) => {
    const cat = category?.map((category) => category.name)

    const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        handleRemove(id)
    }

    return (
        <div className="project_card">
            <h4> {name.toUpperCase()} </h4>

            <p>
                <span>Orçamento:</span> R$:{budget}
            </p>

            <p className="category_text">
                <span className={cat[0]?.toLowerCase()}></span> {cat}
            </p>

            <div className="project_card_actions">

                <Link to={`/project/${id}`}>
                    <GrEdit /> Editar
                </Link>

                <button onClick={remove}>
                    <FaTrashAlt /> Excluir
                </button>

            </div>
        </div>
    )
}

export default ProjectCard;