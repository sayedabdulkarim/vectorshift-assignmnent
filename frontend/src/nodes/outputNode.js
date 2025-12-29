// outputNode.js

import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from '../components/BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const typeOptions = [
    { value: 'Text', label: 'Text' },
    { value: 'Image', label: 'Image' },
  ];

  return (
    <BaseNode
      id={id}
      title="Output"
      type="output"
      inputs={[{ id: 'value' }]}
    >
      <NodeField label="Name">
        <NodeInput
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          placeholder="Enter output name"
        />
      </NodeField>
      <NodeField label="Type">
        <NodeSelect
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          options={typeOptions}
        />
      </NodeField>
    </BaseNode>
  );
};
