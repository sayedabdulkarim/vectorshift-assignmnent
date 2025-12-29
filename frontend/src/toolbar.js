// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="bg-dark-900 border-b border-dark-700 px-4 py-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h1 className="text-lg font-bold text-white">Pipeline Builder</h1>
                </div>
                <span className="text-xs text-slate-500">Drag nodes to canvas</span>
            </div>

            {/* Node Categories */}
            <div className="space-y-3">
                {/* Core Nodes */}
                <div>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Core</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <DraggableNode type='customInput' label='Input' color='emerald' />
                        <DraggableNode type='customOutput' label='Output' color='blue' />
                        <DraggableNode type='text' label='Text' color='amber' />
                        <DraggableNode type='llm' label='LLM' color='purple' />
                    </div>
                </div>

                {/* Transform Nodes */}
                <div>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Transform</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <DraggableNode type='filter' label='Filter' color='orange' />
                        <DraggableNode type='merge' label='Merge' color='pink' />
                        <DraggableNode type='conditional' label='If/Else' color='indigo' />
                    </div>
                </div>

                {/* Integration Nodes */}
                <div>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Integration</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <DraggableNode type='api' label='API' color='cyan' />
                        <DraggableNode type='note' label='Note' color='gray' />
                    </div>
                </div>
            </div>
        </div>
    );
};
