// BaseNode.js - Reusable Node Abstraction
// This component provides a flexible base for creating various node types

import { Handle, Position } from 'reactflow';

// Icon components for different node types
const Icons = {
  input: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
  ),
  output: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  llm: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  text: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
    </svg>
  ),
  api: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  filter: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  merge: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  conditional: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  note: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  default: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

// Color themes for different node types
const themes = {
  input: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/50',
    header: 'bg-emerald-500',
    accent: 'text-emerald-400',
  },
  output: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/50',
    header: 'bg-blue-500',
    accent: 'text-blue-400',
  },
  llm: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/50',
    header: 'bg-purple-500',
    accent: 'text-purple-400',
  },
  text: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/50',
    header: 'bg-amber-500',
    accent: 'text-amber-400',
  },
  api: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/50',
    header: 'bg-cyan-500',
    accent: 'text-cyan-400',
  },
  filter: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/50',
    header: 'bg-orange-500',
    accent: 'text-orange-400',
  },
  merge: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/50',
    header: 'bg-pink-500',
    accent: 'text-pink-400',
  },
  conditional: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/50',
    header: 'bg-indigo-500',
    accent: 'text-indigo-400',
  },
  note: {
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/50',
    header: 'bg-gray-500',
    accent: 'text-gray-400',
  },
  default: {
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/50',
    header: 'bg-slate-500',
    accent: 'text-slate-400',
  },
};

/**
 * BaseNode - A flexible, reusable node component
 *
 * @param {string} id - Unique node identifier
 * @param {string} title - Display title for the node
 * @param {string} type - Node type (input, output, llm, text, or custom)
 * @param {Array} inputs - Array of input handle configurations
 *   - { id: string, label?: string, position?: number }
 * @param {Array} outputs - Array of output handle configurations
 *   - { id: string, label?: string, position?: number }
 * @param {ReactNode} children - Custom content to render inside the node
 * @param {string} className - Additional CSS classes
 * @param {object} style - Additional inline styles
 */
export const BaseNode = ({
  id,
  title,
  type = 'default',
  inputs = [],
  outputs = [],
  children,
  className = '',
  style = {},
}) => {
  const theme = themes[type] || themes.default;
  const icon = Icons[type] || Icons.default;

  // Calculate handle positions evenly distributed
  const getHandlePosition = (index, total) => {
    if (total === 1) return 50;
    return ((index + 1) / (total + 1)) * 100;
  };

  return (
    <div
      className={`
        min-w-[200px] rounded-lg border shadow-node
        ${theme.bg} ${theme.border}
        transition-all duration-200 hover:shadow-node-hover
        ${className}
      `}
      style={style}
    >
      {/* Header */}
      <div className={`${theme.header} px-3 py-2 rounded-t-lg flex items-center gap-2`}>
        <span className="text-white">{icon}</span>
        <span className="text-white text-sm font-semibold">{title}</span>
      </div>

      {/* Content */}
      <div className="p-3 space-y-3">
        {children}
      </div>

      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{ top: `${getHandlePosition(index, inputs.length)}%` }}
          className="!w-3 !h-3 !bg-slate-400 !border-2 !border-slate-600 hover:!bg-white transition-colors"
        />
      ))}

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{ top: `${getHandlePosition(index, outputs.length)}%` }}
          className="!w-3 !h-3 !bg-slate-400 !border-2 !border-slate-600 hover:!bg-white transition-colors"
        />
      ))}

      {/* Handle Labels (optional) */}
      {inputs.length > 0 && inputs.some(i => i.label) && (
        <div className="absolute left-0 top-0 h-full flex flex-col justify-around pl-4 pointer-events-none">
          {inputs.map((input, index) => (
            input.label && (
              <span
                key={input.id}
                className="text-xs text-slate-400"
                style={{ marginTop: `${getHandlePosition(index, inputs.length) - 50}%` }}
              >
                {input.label}
              </span>
            )
          ))}
        </div>
      )}
    </div>
  );
};

// Reusable Field Components for node content

export const NodeField = ({ label, children }) => (
  <div className="space-y-1">
    {label && (
      <label className="text-xs font-medium text-slate-400 block">
        {label}
      </label>
    )}
    {children}
  </div>
);

export const NodeInput = ({ value, onChange, placeholder, type = 'text', ...props }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full px-2 py-1.5 text-sm bg-dark-800 border border-dark-600 rounded
               text-white placeholder-slate-500
               focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500
               transition-colors"
    {...props}
  />
);

export const NodeSelect = ({ value, onChange, options, ...props }) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full px-2 py-1.5 text-sm bg-dark-800 border border-dark-600 rounded
               text-white
               focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500
               transition-colors cursor-pointer"
    {...props}
  >
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export const NodeTextarea = ({ value, onChange, placeholder, rows = 3, ...props }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    rows={rows}
    className="w-full px-2 py-1.5 text-sm bg-dark-800 border border-dark-600 rounded
               text-white placeholder-slate-500 resize-none
               focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500
               transition-colors"
    {...props}
  />
);

export const NodeLabel = ({ children, className = '' }) => (
  <span className={`text-sm text-slate-300 ${className}`}>
    {children}
  </span>
);

export default BaseNode;
