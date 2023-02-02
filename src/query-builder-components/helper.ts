import { RuleGroup, Rule } from "./dataModel"

export const blacklistCriteriaForConditions: string[] = ['Is Empty', 'Is Not Empty'];

export const fieldsMapping: Record<string, string> = {
    "Theme": "theme",
    "Sub-theme": "subTheme",
    "Reason": "reason",
    "Language": "language",
    "Source": "source",
    "Rating": "rating",
    "Release Date": "date",
}

export const conditionsMapping: Record<string, string> = {
    "Equals": "=",
    "Does not equal": "!=",
    "Begins With": "like",
    "Not contains": "not like",
    "Is Empty": "is null",
    "Is Not Empty": "is not null",
}

export const generateQuery = (ruleGroup: RuleGroup) => {
    let queryString = `"(`;
    
    ruleGroup.children.map((child: Rule, index) => {
        const fieldValue = child.field ? fieldsMapping[child?.field] : '';

        queryString = queryString + fieldValue

        const conditionValue = child.condition ? conditionsMapping[child?.condition] : '';

        queryString = queryString + ' ' + conditionValue + ' ';

        const criteriaValue = child.value || '';

        if (conditionValue === 'not like') {
            queryString += `'%${criteriaValue}%'`;
        } else if (conditionValue === 'like') {
            queryString += `'${criteriaValue}%'`;
        } else {
            queryString += `'${criteriaValue}'`;
        }

        if (index !== ruleGroup.children.length-1) {
            queryString += ` ${ruleGroup.conjunction} `;
        }
    })

    queryString += `)"`;

    return queryString;
}