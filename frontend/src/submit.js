// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    // Use individual selectors
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to parse pipeline');
            }

            const data = await response.json();
            setResult(data);

            // Show alert with results
            const message = `Pipeline Analysis Complete!\n\n` +
                `📊 Nodes: ${data.num_nodes}\n` +
                `🔗 Edges: ${data.num_edges}\n` +
                `${data.is_dag ? '✅ Valid DAG (No cycles detected)' : '❌ Not a DAG (Contains cycles)'}`;

            alert(message);

        } catch (error) {
            console.error('Error:', error);
            alert('Error: Failed to analyze pipeline. Make sure the backend is running on http://localhost:8000');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-dark-900 border-t border-dark-700 px-4 py-3">
            <div className="flex items-center justify-center gap-4">
                {/* Stats Display */}
                <div className="flex items-center gap-3 text-sm">
                    <span className="text-slate-400">
                        <span className="text-white font-medium">{nodes.length}</span> nodes
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400">
                        <span className="text-white font-medium">{edges.length}</span> edges
                    </span>
                </div>

                {/* Submit Button */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={`
                        px-6 py-2.5
                        ${loading ? 'bg-primary-700 cursor-wait' : 'bg-primary-600 hover:bg-primary-700'}
                        text-white font-semibold
                        rounded-lg
                        transition-all duration-200
                        flex items-center gap-2
                        shadow-lg hover:shadow-xl
                        ${loading ? '' : 'hover:scale-105 active:scale-95'}
                        disabled:opacity-70
                    `}
                >
                    {loading ? (
                        <>
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Run Pipeline
                        </>
                    )}
                </button>

                {/* Result Badge */}
                {result && (
                    <div className={`
                        px-3 py-1.5 rounded-full text-sm font-medium
                        ${result.is_dag
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }
                    `}>
                        {result.is_dag ? '✓ Valid DAG' : '✗ Has Cycles'}
                    </div>
                )}
            </div>
        </div>
    );
};
