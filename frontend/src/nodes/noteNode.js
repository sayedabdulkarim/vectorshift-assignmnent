// noteNode.js - Comment/Note Node for Documentation

import { useState } from 'react';
import { BaseNode, NodeField, NodeTextarea } from '../components/BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');

  return (
    <BaseNode
      id={id}
      title="Note"
      type="note"
      inputs={[]}
      outputs={[]}
    >
      <NodeField label="Note">
        <NodeTextarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add your notes here..."
          rows={3}
        />
      </NodeField>
      <div className="text-xs text-slate-500 flex items-center gap-1">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        For documentation only
      </div>
    </BaseNode>
  );
};
