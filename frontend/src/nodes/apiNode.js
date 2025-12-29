// apiNode.js - API Request Node

import { useState } from 'react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from '../components/BaseNode';

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  const methodOptions = [
    { value: 'GET', label: 'GET' },
    { value: 'POST', label: 'POST' },
    { value: 'PUT', label: 'PUT' },
    { value: 'DELETE', label: 'DELETE' },
  ];

  return (
    <BaseNode
      id={id}
      title="API Request"
      type="api"
      inputs={[
        { id: 'headers', label: 'Headers' },
        { id: 'body', label: 'Body' },
      ]}
      outputs={[{ id: 'response' }]}
    >
      <NodeField label="URL">
        <NodeInput
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com"
        />
      </NodeField>
      <NodeField label="Method">
        <NodeSelect
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          options={methodOptions}
        />
      </NodeField>
    </BaseNode>
  );
};
