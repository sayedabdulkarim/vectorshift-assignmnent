// draggableNode.js

const colorClasses = {
  emerald: 'bg-emerald-500/20 border-emerald-500/50 hover:bg-emerald-500/30 text-emerald-400',
  blue: 'bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30 text-blue-400',
  purple: 'bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/30 text-purple-400',
  amber: 'bg-amber-500/20 border-amber-500/50 hover:bg-amber-500/30 text-amber-400',
  cyan: 'bg-cyan-500/20 border-cyan-500/50 hover:bg-cyan-500/30 text-cyan-400',
  orange: 'bg-orange-500/20 border-orange-500/50 hover:bg-orange-500/30 text-orange-400',
  pink: 'bg-pink-500/20 border-pink-500/50 hover:bg-pink-500/30 text-pink-400',
  indigo: 'bg-indigo-500/20 border-indigo-500/50 hover:bg-indigo-500/30 text-indigo-400',
  gray: 'bg-gray-500/20 border-gray-500/50 hover:bg-gray-500/30 text-gray-400',
  default: 'bg-slate-500/20 border-slate-500/50 hover:bg-slate-500/30 text-slate-400',
};

export const DraggableNode = ({ type, label, color = 'default' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const colorClass = colorClasses[color] || colorClasses.default;

  return (
    <div
      className={`
        ${colorClass}
        px-3 py-2
        border rounded-lg
        cursor-grab active:cursor-grabbing
        transition-all duration-200
        flex items-center gap-2
        text-sm font-medium
        hover:scale-105
        select-none
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <span>{label}</span>
    </div>
  );
};
