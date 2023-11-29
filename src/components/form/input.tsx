import "../../styles/components/input.css";

interface InputProps {
    type: string
    text: string
    name: string
    placeholder: string,
    handleOnChange: React.ChangeEventHandler<HTMLInputElement>
    value: number | string | undefined
}

const Input = ({ type, text, name, placeholder, handleOnChange, value }: InputProps) => {
    return (
        <div className="form_control">
            <label htmlFor={name}> {text}: </label>
            <input type={type} defaultValue={value} onChange={handleOnChange} placeholder={placeholder} />
        </div>
    )
}

export default Input;