import "../../styles/components/btnSubmit.css"

interface BtnSubmitProps {
    text: string
}

const BTNSubmit = ({ text }: BtnSubmitProps) => {
    return (
        <button className="btn">
            {text}
        </button>
    )
}

export default BTNSubmit;