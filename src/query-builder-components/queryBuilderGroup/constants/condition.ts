import { condition } from "../../ts/types";

export const conditions: condition[] = [
    {
        name: '=',
        label: 'Equals'
    },
    {
        name: '!=',
        label: 'Does not equal'
    },
    {
        name: 'like',
        label: 'Begins With'
    },
    {
        name: 'not like',
        label: 'Not contains'
    },
    {
        name: 'is null',
        label: 'Is Empty'
    },
    {
        name: 'is not null',
        label: 'Is Not Empty'
    },
]