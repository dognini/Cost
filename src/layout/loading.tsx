import "../styles/layout/loading.css";

import loading from "../assets/images/loading.svg";

const Loading = () => {
    return (
        <div className="loader_container">
            <img className="loader" src={loading} alt="icone de carregamento" />
        </div>
    )
}

export default Loading;