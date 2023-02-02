import React from 'react'
import './index.css'
import InfoIcon from '../../assets/info-button.svg';
import QueryBuilderRule from './queryBuilderRule';
import { Rule, RuleGroup } from '../dataModel';
import uuid from 'react-uuid';

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

  const queryRule = ruleGroup.children.map((rule: Rule, index: number)=> {
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

  return (
    <div className='query-builder-container flex flex-col'>
      <div className='relative'>
          <ul className="conjunction-options">
            {conjunctions}
          </ul>
          <img className='absolute top-6 mt-2.5 ml-32' src={InfoIcon} alt='info-icon' />    
      </div>
      <div className='pt-4'>
          {queryRule}
      </div>
      <div>
          <button onClick={handleAddRule} style={{background: '#4F46E5'}} className='rounded-md w-28 h-9 text-white font-medium m-5'>+ Add filter</button>
      </div>
    </div>
  )
}
