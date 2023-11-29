import "../styles/layout/projectCard.css";

import { FaTrashAlt } from "react-icons/fa";

interface ServiceCardProps {
    id: string
    name: string
    cost: number
    description: string
    removeService: (id: string, cost: number) => void
}

const ServiceCard = ({ id, name, cost, description, removeService }: ServiceCardProps) => {

    const remove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        removeService(id, cost)
    }

    return (
        <div className="project_card">
            <h4> {name} </h4>

            <p>
                <span> Custo: </span> R$: {cost}
            </p>

            <p> {description} </p>

            <div className="project_card_actions">
                <button onClick={remove}>
                    <FaTrashAlt /> Excluir
                </button>
            </div>
        </div>
    )
}

export default ServiceCard;