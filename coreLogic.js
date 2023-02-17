import uuid from 'react-uuid';

const findObject = (filterId, children) => {
  const deepCopy = JSON.parse(JSON.stringify(children));

  return deepCopy.find(child => child.id === filterId);
}
  
const filteredObject = (filterId, children) => {
  const deepCopy = JSON.parse(JSON.stringify(children));

  return deepCopy.filter(child => child.id !== filterId);
}
  
export const addRuleGroup = (parentPath, counter, obj) => {

  if (counter === parentPath.length) {
    const deepCopy = JSON.parse(JSON.stringify(obj));
    
    const id = uuid();
    const currentParentPath = [...parentPath, id];
    
    deepCopy.children.push({type: 'rule_group', parentPath: currentParentPath, id, children: []});
    
    return deepCopy;
  }

  return {
    ...obj,
    children: [...filteredObject(parentPath[counter], obj.children), addRuleGroup(parentPath, counter + 1, findObject(parentPath[counter], obj.children))],
  }
}
  
export const addRule = (parentPath, counter, obj) => {

  if (counter === parentPath.length) {
    const deepCopy = JSON.parse(JSON.stringify(obj));
    
    const id = uuid();
    const currentParentPath = [...parentPath, id];
    
    deepCopy.children.push({parentPath: currentParentPath, id, children: []});
    
    return deepCopy;
}

return {
  ...obj,
  children: [...filteredObject(parentPath[counter], obj.children), addRuleGroup(parentPath, counter + 1, findObject(parentPath[counter], obj.children))],
}
}

  // const object = {
  //   id: 1,
  //   children: [{
  //       id: 2,
  //     },
  //     {
  //       id: 3,
  //       children: [],
  //     }
  //   ]
  // }
  
  // let x = addRuleGroup([3], 0, object);
  // console.log(x);
  