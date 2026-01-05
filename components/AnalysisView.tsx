
import React, { useEffect, useMemo } from 'react';
import { PageData, SEOAnalysis } from '../types';
import AnalysisDashboard from './AnalysisDashboard';

interface AnalysisViewProps {
  data: PageData;
  setData: React.Dispatch<React.SetStateAction<PageData>>;
  onAnalyze: (data: PageData) => void;
  onBack: () => void;
  analysis: SEOAnalysis | null;
  loading: boolean;
  error: string | null;
}

const measureTextWidth = (text: string, font: string = '18px Arial'): number => {
  if (typeof document === 'undefined') return 0;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return text.length * 10; 
  context.font = font;
  return Math.ceil(context.measureText(text).width);
};

const AnalysisView: React.FC<AnalysisViewProps> = ({ 
  data, 
  setData, 
  onAnalyze, 
  onBack, 
  analysis, 
  loading, 
  error 
}) => {
  const pixelWidth = useMemo(() => measureTextWidth(data.currentTitle), [data.currentTitle]);

  const handleAnalyzeClick = () => {
    onAnalyze({ ...data, currentPixelWidth: pixelWidth });
  };

  // Auto-analyze once on load if it's a fresh landing
  useEffect(() => {
    if (!analysis && !loading && data.currentTitle) {
      handleAnalyzeClick();
    }
  }, []);

  const getStatusColor = () => {
    if (pixelWidth === 0) return 'bg-slate-200';
    if (pixelWidth < 200) return 'bg-blue-400';
    if (pixelWidth <= 580) return 'bg-emerald-500';
    return 'bg-rose-500';
  };

  return (
    <div className="space-y-8 pb-20">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </button>

      <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Deep SEO Analysis</h2>
          <p className="text-slate-500 mt-1">Refine your technical parameters to get the most accurate AI feedback.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Current Title</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
                value={data.currentTitle}
                onChange={(e) => setData({ ...data, currentTitle: e.target.value })}
              />
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <span>{pixelWidth} px</span>
                  <span>Limit: 580px</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${getStatusColor()}`}
                    style={{ width: `${Math.min((pixelWidth / 580) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Target Keyword</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
                value={data.targetKeyword}
                onChange={(e) => setData({ ...data, targetKeyword: e.target.value })}
              />
            </div>

            <button
              onClick={handleAnalyzeClick}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Run Full Analysis'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Page Table of Contents</label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 h-64 font-mono text-sm leading-relaxed"
              value={data.content}
              onChange={(e) => setData({ ...data, content: e.target.value })}
            />
          </div>
        </div>
      </section>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-slate-600 font-medium animate-pulse">Consulting the SEO Oracle...</p>
        </div>
      )}

      {analysis && !loading && (
        <div id="results">
          <AnalysisDashboard analysis={analysis} />
        </div>
      )}
    </div>
  );
};

export default AnalysisView;
