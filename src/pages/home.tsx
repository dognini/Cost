import "../styles/pages/home.css";

import LinkNavegacao from "../layout/btnLink";
import Savings from "../assets/images/savings.svg";

export default function Home() {
    return (
        <section className="home_container">
            <h1>
                Bem-vindo ao <span>Costs</span>
            </h1>

            <p>Comece a gerenciar os seus projetos agora mesmo!</p>

            <LinkNavegacao to="/new-project">
                Criar Projeto
            </LinkNavegacao>

            <img src={Savings} alt="Imagem de um homem colocando uma moeda em um cofrinho" />
        </section>
    )
}