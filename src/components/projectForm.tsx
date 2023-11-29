import '../styles/layout/projectForm.css';

import { useEffect, useState } from "react";

import Input from "./form/input";
import Select from "./form/select";
import BTNSubmit from "./form/btnSubmit";
import OptionsProps from "../interface/formProjectProps";
import FormProjectProps from "../interface/formProjectProps";

interface ProjectFormProps {
    btnText: string
    projectData?: FormProjectProps
    handleSubmit: (formData: FormProjectProps) => void
}

const ProjectForm = ({ btnText, handleSubmit, projectData }: ProjectFormProps) => {

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(projectData?.id);
    const [dados, setDados] = useState<FormProjectProps>({ id: 0, cost: 0, name: "", orcamento: "", categoria: [], services: [] });

    useEffect(() => {

        if (projectData) {
            setDados((prevState) => ({
                ...prevState,
                ...projectData,
            }));
        }

        fetch('http://localhost:3000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data: OptionsProps[]) => {
                setDados((prevState) => ({
                    ...prevState,
                    categoria: data
                }));
            })
            .catch((error) => console.log("Não foi possível buscar as categorias dos projetos", error));
    }, []);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const selectedCategory = dados.categoria.find(cat => cat.id === selectedCategoryId);

        if (selectedCategoryId !== undefined && selectedCategory) {
            const formData = {
                ...dados,
                id: dados.id,
                name: dados.name,
                cost: dados.cost,
                orcamento: dados.orcamento,
                categoria: [selectedCategory]
            }

            handleSubmit(formData);
        }
    }

    function handleInput(event: React.ChangeEvent<HTMLInputElement>, fieldName: string) {
        const { value } = event.target;

        setDados((prevState) => ({ ...prevState, [fieldName]: value }));
    }

    function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedCategoryId = parseInt(e.target.value);

        setSelectedCategoryId(selectedCategoryId);
    }

    return (
        <form onSubmit={submit} className="form">
            <Input
                name="name"
                type="text"
                text="Nome do Projeto"
                placeholder="Insira o nome do projeto"
                value={projectData?.name}
                handleOnChange={(e) => handleInput(e, 'name')}
            />
            <Input
                name="orcamento"
                type="number"
                text="Orçamento"
                placeholder="Insira o orçamento total"
                value={projectData?.orcamento}
                handleOnChange={(e) => handleInput(e, 'orcamento')}
            />
            <Select
                options={dados.categoria}
                name="category_id"
                text="Selecione a categoria"
                value={selectedCategoryId ? selectedCategoryId : undefined}
                handleOnChange={handleCategory}
            />
            <BTNSubmit text={btnText} />
        </form>
    )
}

export default ProjectForm;