// textNode.js

import { useState } from 'react';
import { BaseNode, NodeField, NodeTextarea } from '../components/BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  return (
    <BaseNode
      id={id}
      title="Text"
      type="text"
      outputs={[{ id: 'output' }]}
    >
      <NodeField label="Text">
        <NodeTextarea
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          placeholder="Enter text or use {{variable}} syntax"
          rows={2}
        />
      </NodeField>
    </BaseNode>
  );
};
