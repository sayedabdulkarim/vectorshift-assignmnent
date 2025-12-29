// textNode.js
// Dynamic Text Node with variable parsing

import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';

// Regex to match valid JS variable names inside {{ }}
const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  // Parse variables from text
  const variables = useMemo(() => {
    const matches = [];
    let match;
    const seen = new Set();

    // Reset regex lastIndex
    VARIABLE_REGEX.lastIndex = 0;

    while ((match = VARIABLE_REGEX.exec(currText)) !== null) {
      const varName = match[1];
      // Only add unique variables
      if (!seen.has(varName)) {
        seen.add(varName);
        matches.push(varName);
      }
    }
    return matches;
  }, [currText]);

  // Calculate dynamic dimensions based on text
  const dimensions = useMemo(() => {
    const lines = currText.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length), 20);
    const lineCount = lines.length;

    // Calculate width: min 200px, max 400px
    const width = Math.min(Math.max(maxLineLength * 8 + 50, 200), 400);

    // Calculate height based on lines
    const baseHeight = 120; // Header + padding
    const textHeight = Math.max(lineCount * 20, 40);
    const height = baseHeight + textHeight;

    return { width, height, rows: Math.max(lineCount, 2) };
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  // Calculate handle positions evenly distributed
  const getHandlePosition = (index, total) => {
    if (total === 0) return 50;
    if (total === 1) return 50;
    // Start from 30% to 70% of the content area
    const startPercent = 35;
    const endPercent = 85;
    const range = endPercent - startPercent;
    return startPercent + (index / (total - 1 || 1)) * range;
  };

  return (
    <div
      className="rounded-lg border shadow-node bg-amber-500/10 border-amber-500/50 transition-all duration-200 hover:shadow-node-hover"
      style={{
        width: dimensions.width,
        minWidth: 200,
      }}
    >
      {/* Header */}
      <div className="bg-amber-500 px-3 py-2 rounded-t-lg flex items-center gap-2">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <span className="text-white text-sm font-semibold">Text</span>
        {variables.length > 0 && (
          <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded-full text-white">
            {variables.length} var{variables.length > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <label className="text-xs font-medium text-slate-400 block">
          Text Content
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          placeholder="Enter text or use {{variable}} syntax"
          className="w-full px-2 py-1.5 text-sm bg-dark-800 border border-dark-600 rounded
                     text-white placeholder-slate-500 resize-none
                     focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500
                     transition-colors font-mono"
          rows={dimensions.rows}
          style={{ minHeight: '60px' }}
        />

        {/* Variable hints */}
        {variables.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {variables.map((varName, index) => (
              <span
                key={varName}
                className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30"
              >
                {varName}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic Input Handles for Variables */}
      {variables.map((varName, index) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            top: `${getHandlePosition(index, variables.length)}%`,
          }}
          className="!w-3 !h-3 !bg-amber-400 !border-2 !border-amber-600 hover:!bg-white transition-colors"
        />
      ))}

      {/* Variable Labels */}
      {variables.length > 0 && (
        <div
          className="absolute left-4 flex flex-col pointer-events-none"
          style={{
            top: '35%',
            height: '50%',
            justifyContent: variables.length === 1 ? 'center' : 'space-between'
          }}
        >
          {variables.map((varName, index) => (
            <span
              key={varName}
              className="text-xs text-amber-400 font-mono bg-dark-900/80 px-1 rounded"
            >
              {varName}
            </span>
          ))}
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: '50%' }}
        className="!w-3 !h-3 !bg-slate-400 !border-2 !border-slate-600 hover:!bg-white transition-colors"
      />
    </div>
  );
};
