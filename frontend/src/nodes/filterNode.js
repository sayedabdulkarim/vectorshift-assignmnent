// filterNode.js - Data Filter/Transform Node

import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from '../components/BaseNode';

export const FilterNode = ({ id, data }) => {
  const [field, setField] = useState(data?.field || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');

  const operatorOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'startsWith', label: 'Starts With' },
    { value: 'endsWith', label: 'Ends With' },
    { value: 'greaterThan', label: 'Greater Than' },
    { value: 'lessThan', label: 'Less Than' },
  ];

  return (
    <BaseNode
      id={id}
      title="Filter"
      type="filter"
      inputs={[{ id: 'data' }]}
      outputs={[{ id: 'filtered' }]}
    >
      <NodeField label="Field">
        <NodeInput
          value={field}
          onChange={(e) => setField(e.target.value)}
          placeholder="field_name"
        />
      </NodeField>
      <NodeField label="Operator">
        <NodeSelect
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          options={operatorOptions}
        />
      </NodeField>
    </BaseNode>
  );
};
