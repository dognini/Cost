export interface ServiceProps {
    id: string
    name: string
    cost: number
    description: string
}

export default interface OptionsProps {
    id: number,
    name: string
}

export default interface FormProjectProps {
    id: number
    cost: number
    name: string
    services: ServiceProps[]
    orcamento: string
    categoria: OptionsProps[]
}