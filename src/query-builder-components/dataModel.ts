export interface Rule {
    field?: 'Theme' | 'Sub-theme' | 'Reason' | 'Language' | 'Rating' | 'Release Date'
    condition?: 'Equals' | 'Does not equal' | 'Like' | 'Not like' | 'Is Empty' | 'Is Not Empty'
    value?: string | number | Date
    type: 'rule'
    id?: string
    parentPath?: Array<string>
}

export interface RuleGroup {
    children: Rule[]
    conjunction: 'AND' | 'OR'
    not: boolean
    type: 'rule_group'
    id?: string
    parentPath?: Array<string>
}
