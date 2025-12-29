// mergeNode.js - Merge Multiple Inputs Node

import { useState } from 'react';
import { BaseNode, NodeField, NodeSelect, NodeLabel } from '../components/BaseNode';

export const MergeNode = ({ id, data }) => {
  const [mergeType, setMergeType] = useState(data?.mergeType || 'concat');

  const mergeOptions = [
    { value: 'concat', label: 'Concatenate' },
    { value: 'array', label: 'Array' },
    { value: 'object', label: 'Object' },
    { value: 'join', label: 'Join (comma)' },
  ];

  return (
    <BaseNode
      id={id}
      title="Merge"
      type="merge"
      inputs={[
        { id: 'input1', label: 'A' },
        { id: 'input2', label: 'B' },
        { id: 'input3', label: 'C' },
      ]}
      outputs={[{ id: 'merged' }]}
    >
      <NodeField label="Merge Type">
        <NodeSelect
          value={mergeType}
          onChange={(e) => setMergeType(e.target.value)}
          options={mergeOptions}
        />
      </NodeField>
      <div className="text-xs text-slate-500">
        Combines multiple inputs into one output
      </div>
    </BaseNode>
  );
};
