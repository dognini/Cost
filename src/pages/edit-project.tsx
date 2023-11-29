import "../styles/pages/edit-project.css";

import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Message from "../layout/message";
import ServiceCard from "../layout/serviceCard";
import ProjectForm from "../components/projectForm";
import ServiceForm from "../components/serviceForm";

import FormProjectProps from "../interface/formProjectProps";

export default function EditProject() {
    const { id } = useParams();

    const [message, setMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');

    const [dados, setDados] = useState<FormProjectProps>();

    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setDados(data)
            })
            .catch((error) => console.error("Algo deu errado", error))
    }, [id])

    const editPost = (project: FormProjectProps) => {
        setMessage('');

        if (parseFloat(project.orcamento) < project.cost) {

            setTypeMessage('error')
            setMessage('O orçamento não pode ser menor que o custo do projeto');

            return false
        }

        const updateData = {
            ...dados,
            id: project.id,
            name: project.name,
            cost: project.cost,
            services: project.services,
            orcamento: project.orcamento,
            categoria: project.categoria
        }

        fetch(`http://localhost:3000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
            .then((res) => res.json())
            .then((data) => {

                setDados(data);
                setTypeMessage('success');
                setShowProjectForm(prevState => !prevState);
                setMessage('Projeto atualizado com sucesso');

            })
            .catch((error) => console.error("Não foi possivel atualizar o projeto", error))
    }

    const createService = async (project: FormProjectProps) => {
        setMessage('');

        const lastService = project.services[project.services.length - 1];
        lastService.id = uuidv4();

        const lastServiceCost = parseFloat(String(lastService.cost));
        const newCost = project.cost + lastServiceCost;

        if (newCost > parseFloat(project.orcamento)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço!');
            setTypeMessage('error');

            project.services.pop();

            return false;
        }

        project.cost = newCost

        fetch(`http://localhost:3000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then((res) => res.json())
            .then((data) => {

                setDados(data);
                setShowServiceForm((prevState) => !prevState);
                setTypeMessage('success');
                setMessage('Serviço adicionado com sucesso!');

            })

    };

    const removeService = (id: string, cost: number) => {
        const servicesUpdated = dados?.services?.filter((service) => service.id !== id);

        if (dados) {

            const projectUpdated = {
                ...dados,
                services: servicesUpdated ?? [],
                cost: (dados.cost ?? 0) - cost,
            };

            fetch(`http://localhost:3000/projects/${projectUpdated.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectUpdated),
            })
                .then((res) => res.json())
                .then(() => {

                    setDados(projectUpdated);
                    setTypeMessage('success');
                    setMessage('Serviço removido com sucesso!');

                })
                .catch((error) => console.log('Não foi possível remover o serviço', error));

        }
    };

    const toggleProjectForm = () => {
        setShowProjectForm(prevState => !prevState);
    }

    const toggleServiceForm = () => {
        setShowServiceForm(prevState => !prevState);
    }

    return (
        <section className="project_datails">

            {message && <Message type={typeMessage} message={message} />}

            <section className="details_container">
                <h1> PROJETO: {dados?.name.toUpperCase()} </h1>

                <button className="btn" onClick={toggleProjectForm}>
                    {!showProjectForm ? "Editar Projeto" : "Fechar Projeto"}
                </button>

                {!showProjectForm ? (
                    <main className="project_info">
                        <p>
                            <span>Categoria:</span> {dados?.categoria[0]?.name}
                        </p>
                        <p>
                            <span>Total do Orçamento:</span> R$:{dados?.orcamento}
                        </p>
                        <p>
                            <span>Total Utilizado:</span> R$:{dados?.cost}
                        </p>
                    </main>
                ) : (
                    <main className="project_info">
                        <ProjectForm
                            handleSubmit={editPost}
                            projectData={dados}
                            btnText="Concluir Edição"
                        />
                    </main>
                )}
            </section>

            <section className="service_form_container">
                <h2> ADICIONE UM SERVIÇO: </h2>

                <button className="btn" onClick={toggleServiceForm}>
                    {!showServiceForm ? "Adicionar um Serviço" : "Fechar Serviço"}
                </button>

                <main className="project_info">
                    {showServiceForm && (
                        <ServiceForm
                            btnText="Criar Serviço"
                            handleSubmit={createService}
                            projectData={dados}
                        />
                    )}
                </main>
            </section>

            <section>
                <h2>SERVIÇOS:</h2>

                <main className="start">
                    {dados && dados.services && dados.services.length > 0 ? (
                        dados.services.map((item, index) => (
                            <ServiceCard
                                id={item.id}
                                name={item.name}
                                cost={item.cost}
                                description={item.description}
                                key={index}
                                removeService={removeService}
                            />
                        ))
                    ) : (
                        <p>Nenhum serviço disponível.</p>
                    )}
                </main>

            </section>
        </section>
    )
}