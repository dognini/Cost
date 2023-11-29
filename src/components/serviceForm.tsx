import "../styles/layout/projectForm.css";

import { useState } from "react";

import Input from "./form/input";
import BTNSubmit from "./form/btnSubmit";
import FormProjectProps, { ServiceProps } from "../interface/formProjectProps";

interface ServiceFormProps {
    btnText: string
    projectData?: FormProjectProps
    handleSubmit: (formData: FormProjectProps) => void
}

const ServiceForm = ({ btnText, handleSubmit, projectData }: ServiceFormProps) => {
    const [service, setService] = useState<ServiceProps>({ id: '', name: '', cost: 0, description: '' });

    function handleInput(event: React.ChangeEvent<HTMLInputElement>, fieldName: string) {
        const { value } = event.target;

        setService((prevState) => ({ ...prevState, [fieldName]: value }));
    }

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (projectData) {
            const updateProjectData: FormProjectProps = {
                ...projectData,
                services: [...projectData.services, service],

            }

            handleSubmit(updateProjectData)
        }
    }

    return (
        <form onSubmit={submit} className="form">
            <Input
                name="name"
                type="text"
                text="Nome do Serviço"
                value={service.name}
                handleOnChange={(e) => handleInput(e, 'name')}
                placeholder="Digite o nome do serviço"
            />
            <Input
                name="cost"
                type="number"
                text="Custo do Serviço"
                value={service.cost}
                handleOnChange={(e) => handleInput(e, 'cost')}
                placeholder="Informe o custo total do serviço"
            />
            <Input
                name="description"
                type="text"
                text="Descrição do Serviço"
                value={service.description}
                handleOnChange={(e) => handleInput(e, 'description')}
                placeholder="Descreva o serviço"
            />
            <BTNSubmit
                text={btnText}
            />
        </form>
    )
}

export default ServiceForm;