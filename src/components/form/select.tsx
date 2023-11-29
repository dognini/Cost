import "../../styles/components/select.css";

import SelectCategoryProjectProps from "../../interface/selectCategoryProject";

const Select = ({ text, name, options, handleOnChange, value }: SelectCategoryProjectProps) => {
    return (
        <div className="form_control">
            <label htmlFor={name}> {text}: </label>

            <select value={value} onChange={handleOnChange} name={name}>
                <option key="default" value="" > Selecione uma opção </option>
                {
                    options?.map((option, index) => (
                        <option value={option.id} key={index}> {option.name} </option>
                    ))
                }
            </select>
        </div>
    )
}

export default Select;