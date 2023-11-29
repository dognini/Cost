import { ChangeEvent } from "react"
import OptionsProps from "./formProjectProps"

export default interface SelectCategoryProjectProps {
    text: string
    name: string
    value: number | undefined
    options: OptionsProps[]
    handleOnChange: (event: ChangeEvent<HTMLSelectElement>) => void
}