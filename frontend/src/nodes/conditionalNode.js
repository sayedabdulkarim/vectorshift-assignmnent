// conditionalNode.js - If/Else Conditional Node

import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from '../components/BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  const [compareType, setCompareType] = useState(data?.compareType || 'equals');

  const compareOptions = [
    { value: 'equals', label: '==' },
    { value: 'notEquals', label: '!=' },
    { value: 'greater', label: '>' },
    { value: 'less', label: '<' },
    { value: 'truthy', label: 'Is Truthy' },
    { value: 'falsy', label: 'Is Falsy' },
  ];

  return (
    <BaseNode
      id={id}
      title="Conditional"
      type="conditional"
      inputs={[{ id: 'value' }]}
      outputs={[
        { id: 'true', label: 'True' },
        { id: 'false', label: 'False' },
      ]}
    >
      <NodeField label="Condition">
        <NodeSelect
          value={compareType}
          onChange={(e) => setCompareType(e.target.value)}
          options={compareOptions}
        />
      </NodeField>
      <NodeField label="Compare Value">
        <NodeInput
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="value to compare"
        />
      </NodeField>
    </BaseNode>
  );
};
