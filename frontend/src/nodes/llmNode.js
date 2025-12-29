// llmNode.js

import { BaseNode, NodeLabel } from '../components/BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      type="llm"
      inputs={[
        { id: 'system', label: 'System' },
        { id: 'prompt', label: 'Prompt' },
      ]}
      outputs={[{ id: 'response' }]}
    >
      <div className="flex items-center gap-2 text-slate-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <NodeLabel>GPT-4 powered</NodeLabel>
      </div>
      <div className="text-xs text-slate-500 mt-1">
        Connect system prompt and user prompt to generate AI responses.
      </div>
    </BaseNode>
  );
};
