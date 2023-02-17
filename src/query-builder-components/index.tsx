import React, { useEffect, useState } from 'react'
import './index.css'
import CloseButtonIcon from '../assets/close-button.svg'
import ViewMoreModal from './viewMoreModal/viewMoreModal';
import QueryBuilderGroup from './queryBuilderGroup';
import { RuleGroup } from './dataModel';
import uuid from 'react-uuid';
import { generateQuery } from './helper';

export default function QueryBuilderDialog() {
  const [viewMoreQuery, setViewMoreQuery] = useState(false);
  const [query, setQuery] = useState<string>('');

  const [ruleGroup, setRuleGroup] = useState<RuleGroup>({
    id: uuid(),
    conjunction: 'AND',
    not: false,
    type: 'rule_group',
    parentPath: [],
    children: [
      {
        type: 'rule',
        id: uuid(),
      }
    ],
  });

  useEffect(() => {
    const queryString = generateQuery(ruleGroup);
    setQuery(queryString);
  }, [ruleGroup])

  return (
    <div>
      <div className='h-28 bg-secondary p-6 rounded'>
          <div className='flex flex-row justify-between'>
              <p className='text-md text-white font-medium'>Build your query</p>
              <img src={CloseButtonIcon} alt='Close button' width={24} height={24} />
          </div>
          <div className='flex flex-row mt-2 items-center'>
              <div className='query-viewer' > <b>Query: {query}</b></div>
              <button onClick={() => setViewMoreQuery(true)} className='text-md text-white ml-4' >more ...</button>
              {viewMoreQuery && <ViewMoreModal query={query} setViewMoreQuery={setViewMoreQuery} />}
          </div>
      </div>
      <div className='query-builder flex flex-col'>
          <div className='overflow-y-auto mt-8 flex flex-col justify-center items-center'>
            <QueryBuilderGroup setRuleGroup={setRuleGroup} ruleGroup={ruleGroup} />
          </div>
      </div>
    </div>
  )
}