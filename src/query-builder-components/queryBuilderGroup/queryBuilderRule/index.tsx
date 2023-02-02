import React, { useState } from 'react'
import './index.css';
import {ImBin2} from 'react-icons/im';
import { fields } from '../constants/fields';
import { conditions } from '../constants/condition';
import { Rule, RuleGroup } from '../../dataModel';
import { blacklistCriteriaForConditions } from '../../helper';
import { condition, field, options } from '../../ts/types';

export default function QueryBuilderRule(props: any) {

  const {rule, setRuleGroup, isSingleRule} = props;

  const [openField, setOpenField] = useState(false); 
  const [openCondition, setOpenCondition] = useState(false);  
  const [openCriteria, setOpenCriteria] = useState(false);

  const mutateRuleState = (children: Rule[], name: string, value: string) => {
    let deepCopyChildren = children.map(child => {return {...child}});

    let updateProperty: any = deepCopyChildren.find(child => child.id === rule.id);

    if (updateProperty) {
        updateProperty[name]= value;
    }

    if ((name === 'field') || (name === 'condition' && blacklistCriteriaForConditions.includes(value))) {
        updateProperty['value'] = '';
    }

    return deepCopyChildren;
  }

  const filterRules = (children: Rule[]) => {
    let deepCopyChildren = children.map(child => {return {...child}}) || [];

    return deepCopyChildren.filter((child: Rule) => child.id !== rule.id);
  }

  const handleValueChange = (value: string, name: string) => {
    setRuleGroup((prevGrp: RuleGroup) => {
        return {
            ...prevGrp,
            children: mutateRuleState(prevGrp.children, name, value)
        }
    })
    
    setOpenField(false);
    setOpenCondition(false);
    setOpenCriteria(false);
  }

  const handleDelete = () => {
    setRuleGroup((prevGrp: RuleGroup) => {
        return {
            ...prevGrp,
            children: filterRules(prevGrp.children)
        }
    })
  }

  const renderCriteriaDropdownElement = (options: options[]) => {
    return (
        options.map((option: options) => {
            return (
                <li>
                    <a href="#" className="block px-4 py-2 text-white rule-dropdown-element">{option.label}</a>
                </li>
            )
        })
    )
  } 

  const renderCriteriaBox = () => {
    const field = fields.find((item: field) => item.label === rule.field);

    if (!field || blacklistCriteriaForConditions.includes(rule.condition)) return

    if (field.input === 'checkbox') {
        if (!field.options) return;

        return (
            <>
            <p className='font-medium text-xs text-white' >Criteria</p>
            <button id="dropdownDefaultButton" onClick={() => setOpenCriteria(!openCriteria)} style={{color: rule.value ? '#FFFFFF' : '#ffffff80'}} className="rule-dropdown-button mt-3 px-4 py-2.5 text-center inline-flex items-center justify-between" type="button">{rule.value || `Select criteria`} <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="#7E8083" stroke="#7E8083" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> 
            <div style={{visibility: openCriteria ? 'visible': 'hidden'}} className="rule-dropdown-menu z-10 divide-y divide-gray-100 w-48">
                <ul onClick={(e: any) => handleValueChange(e?.target?.text, 'value')} className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                {renderCriteriaDropdownElement(field.options)}
                </ul>
            </div>
            </>
        )
    } else if (field.input === 'text') {
        return (
            <>
                <p className='font-medium text-xs text-white' >Criteria</p>
                <input onChange={(e: any) => handleValueChange(e?.target?.value, 'value')} value={rule.criteria} placeholder={field.placeholder} type='text' className="rule-dropdown-button mt-3 px-4 py-2.5 text-white" />
            </>
        )
    } else if (field.input === 'number') {
        return (
            <>
                <p className='font-medium text-xs text-white' >Criteria</p>
                <input onChange={(e: any) => handleValueChange(e?.target?.value, 'value')} placeholder={field.placeholder} type='number' className="rule-dropdown-button mt-3 px-4 py-2.5 text-white" />
            </>
        )
    } else if (field.input === 'date') {
        return (
            <>
                <p className='font-medium text-xs text-white' >Criteria</p>
                <input onChange={(e: any) => handleValueChange(e?.target?.value, 'value')} placeholder={field.placeholder} type='date' className="rule-dropdown-button mt-3 px-4 py-2.5 text-white" />
            </>
        )
    }
  }

  const fieldsOptions = fields.map((field: field) => {
    return (
        <li>
            <a href="#" className="block px-4 py-2 text-white rule-dropdown-element">{field.label}</a>
        </li>
    )
  })

  const conditionOptions = conditions.map((condition: condition) => {
    return (
        <li>
            <a href="#" className="block px-4 py-2 text-white rule-dropdown-element">{condition.label}</a>
        </li>
    )
  })

  return (
    <div className='flex flex-row pt-4 relative ml-5'>
        <div className='flex flex-col w-48'>
            <p className='font-medium text-xs text-white' >Field</p>
            <button id="dropdownDefaultButton" onClick={() => setOpenField(!openField)} style={{color: rule.field ? '#FFFFFF' : '#ffffff80'}} className="rule-dropdown-button mt-3 px-4 py-2.5 text-center inline-flex items-center justify-between" type="button">{rule.field || `Select field`} <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="#7E8083" stroke="#7E8083" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
            {openField && 
                <div className="rule-dropdown-menu z-10 divide-y divide-gray-100 w-48">
                    <ul onClick={(e: any) => handleValueChange(e?.target?.text, 'field')} className="py-2 text-sm text-white-400" aria-labelledby="dropdownDefaultButton">
                    {fieldsOptions}
                    </ul>
                </div>
            }
        </div>
        <div className='flex flex-col w-48 ml-5'>
            <p className='font-medium text-xs text-white' >Condition</p>
            <button id="dropdownDefaultButton" onClick={() => setOpenCondition(!openCondition)} style={{color: rule.condition ? '#FFFFFF' : '#ffffff80'}} className="rule-dropdown-button mt-3 px-4 py-2.5 text-center inline-flex items-center justify-between" type="button">{rule.condition || `Select condition`} <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="#7E8083" stroke="#7E8083" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
            {openCondition && 
                <div className="rule-dropdown-menu z-10 divide-y divide-gray-100 w-48">
                    <ul onClick={(e: any) => handleValueChange(e?.target?.text, 'condition')} className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                        {conditionOptions}
                    </ul>
                </div>
            }
        </div>
        <div className='flex flex-col w-48 ml-5'>
            <>
                {renderCriteriaBox()}
            </>
        </div>
        {!isSingleRule &&
            <div className='flex flex-col ml-5'>
                <div style={{minHeight: '16px'}}></div>
                <button onClick={handleDelete} style={{color: 'rgba(255, 255, 255, 0.5)'}} className='w-12 rule-dropdown-button mt-3 px-4 py-2.5 text-center inline-flex items-center justify-between'><ImBin2 /></button>
            </div>
        }
    </div>
  )
}
