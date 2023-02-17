import React from 'react'
import InfoIcon from '../../assets/info-button.svg';
import QueryBuilderRule from './queryBuilderRule';
import { Rule, RuleGroup } from '../dataModel';
import uuid from 'react-uuid';
import './index.css'

const conjunctionTypes = [
  {
    label: 'AND',
    value: 'AND'
  },
  {
    label: 'OR',
    value: 'OR'
  }
]

export default function QueryBuilderGroup(props: any) {

  const {setRuleGroup, ruleGroup} = props;
  const selectedConjunction = ruleGroup.conjunction || 'AND';

  const mutateConjunctionState = (value: string) => {
    setRuleGroup((prevGrp: RuleGroup) => {
      return {
        ...prevGrp,
        conjunction: value,
      }
    })
  }

  const conjunctions = conjunctionTypes.map(type => {
    return (
      <li>
          <input onChange={() => mutateConjunctionState(type.value)} value={type.value} type="radio" id={type.value} name="conjunction" checked={selectedConjunction === type.value} />
          <label htmlFor={type.value}>{type.label}</label>
      </li>
    )
  })

  const queryRule = ruleGroup.children.filter((rule: Rule | RuleGroup) => rule.type === 'rule').map((rule: Rule, index: number)=> {
    return <QueryBuilderRule isSingleRule={index === 0} rule={rule} setRuleGroup={setRuleGroup} />
  })

  const handleAddRule = () => {
    const defaultRule: Rule = {
      type: 'rule',
      id: uuid(),
    }

    setRuleGroup((prevGrp: RuleGroup) => {
      return {
        ...prevGrp,
        children: [...prevGrp.children, defaultRule],
      }
    })
  }

  const loadComponents = () => {
    if (ruleGroup.children.length) {
       return ruleGroup.children.filter((rule: Rule | RuleGroup) => rule.type === 'rule_group').map((rule_grp: RuleGroup) => {
        return (
          <QueryBuilderGroup ruleGroup={rule_grp} setRuleGroup />
        )
       })
    }
    return null;
  }

  return (
    <div className='query-builder-container flex flex-col'>
      <div className='relative'>
          <div>
            <ul className="conjunction-options">
              {conjunctions}
            </ul>
            <img className='absolute top-6 mt-2.5 ml-32' src={InfoIcon} alt='info-icon' /> 
          </div>
          <div className='absolute top-1 left-[500px]'>
            <button onClick={handleAddRule} style={{background: '#4F46E5'}} className='rounded-md w-28 h-9 text-white font-medium m-5'>+ Add filter</button>     
            <button style={{background: '#4F46E5'}} className='rounded-md w-48 h-9 text-white font-medium ml-5 mb-5'>+ Add new group filter</button>       
          </div>
      </div>
      <div className='pt-4'>
          {queryRule}
      </div>
      <div>
        {loadComponents()}
      </div>
    </div>
  )
}