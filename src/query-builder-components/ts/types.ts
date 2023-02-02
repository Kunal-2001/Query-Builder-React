export type options = {
    value: string
    label: string
}

export type condition = {
    name: string
    label: string
}

export type field = {
    name: string
    label: string
    input?: 'checkbox' | 'text' | 'number' | 'date'
    options?: options[]
    placeholder?: string
}