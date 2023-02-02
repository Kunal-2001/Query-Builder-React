import { field } from "../../ts/types";

export const fields: field[] = [
    {
        name: 'theme',
        label: 'Theme',
        input: 'checkbox',
        options: [
            {
                value: 'death',
                label: 'Death'
            },
            {
                value: 'thriller',
                label: 'Thriller'
            },
            {
                value: 'mystery',
                label: 'Mystery'
            }
        ]
    },
    {
        name: 'subTheme',
        label: 'Sub-theme',
        input: 'checkbox',
        options: [
            {
                value: 'beauty',
                label: 'Beauty'
            },
            {
                value: 'loyalty',
                label: 'Loyalty'
            },
            {
                value: 'family',
                label: 'Family'
            },
            {
                value: 'identity',
                label: 'Identity'
            }
        ]
    },
    {
        name: 'reason',
        label: 'Reason',
        input: 'text',
        placeholder: 'Enter Reason'
    },
    {
        name: 'language',
        label: 'Language',
        input: 'checkbox',
        options: [
            {
                value: 'english',
                label: 'English'
            },
            {
                value: 'hindi',
                label: 'Hindi'
            },
            {
                value: 'french',
                label: 'French'
            },
            {
                value: 'german',
                label: 'German'
            },
            {
                value: 'urdu',
                label: 'Urdu'
            },
        ]
    },
    {
        name: 'rating',
        label: 'Rating',
        input: 'number',
        placeholder: 'Enter rating',
    },
    {
        name: 'date',
        label: 'Release Date',
        input: 'date'
    },

]