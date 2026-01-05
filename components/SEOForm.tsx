
import React, { useState, useMemo } from 'react';
import { PageData } from '../types';

interface SEOFormProps {
  onAnalyze: (data: PageData) => void;
  isLoading: boolean;
  onReset: () => void;
}

// Utility to measure text width exactly as a browser renders it
const measureTextWidth = (text: string, font: string = '18px Arial'): number => {
  if (typeof document === 'undefined') return 0;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return text.length * 10; 
  context.font = font;
  return Math.ceil(context.measureText(text).width);
};

const SEOForm: React.FC<SEOFormProps> = ({ onAnalyze, isLoading, onReset }) => {
  const [form, setForm] = useState({
    currentTitle: '',
    targetKeyword: '',
    content: ''
  });

  const pixelWidth = useMemo(() => measureTextWidth(form.currentTitle), [form.currentTitle]);
  const widthPercentage = Math.min((pixelWidth / 580) * 100, 100);
  
  const getStatusColor = () => {
    if (pixelWidth === 0) return 'bg-slate-200';
    if (pixelWidth < 200) return 'bg-blue-400';
    if (pixelWidth <= 580) return 'bg-emerald-500';
    return 'bg-rose-500';
  };

  const getStatusText = () => {
    if (pixelWidth === 0) return 'Enter a title';
    if (pixelWidth < 200) return 'Too short';
    if (pixelWidth <= 580) return 'Perfect width';
    return 'Too long (truncated)';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.currentTitle || !form.targetKeyword || !form.content) {
      alert("Please fill in all fields.");
      return;
    }
    onAnalyze({
      ...form,
      currentPixelWidth: pixelWidth
    });
  };

  const clearForm = () => {
    setForm({ currentTitle: '', targetKeyword: '', content: '' });
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Page Title (SEO Title Tag)
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-lg shadow-sm"
              placeholder="e.g. Best Pizza in Tokyo | Authentic Italian Restaurant"
              value={form.currentTitle}
              onChange={(e) => setForm({ ...form, currentTitle: e.target.value })}
            />
          </div>
          
          {/* Pixel Width Meter */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-end text-xs font-bold uppercase tracking-wider">
              <span className={pixelWidth > 580 ? 'text-rose-600' : 'text-slate-500'}>
                {pixelWidth} px
              </span>
              <span className={pixelWidth > 580 ? 'text-rose-600' : 'text-slate-400'}>
                {getStatusText()}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div 
                className={`h-full transition-all duration-300 ${getStatusColor()}`}
                style={{ width: `${widthPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>0px</span>
              <span className="relative">
                <div className="absolute top-[-14px] left-1/2 -translate-x-1/2 h-4 w-px bg-slate-200" />
                580px (Limit)
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Target Primary Keyword
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Italian Restaurant Tokyo"
            value={form.targetKeyword}
            onChange={(e) => setForm({ ...form, targetKeyword: e.target.value })}
          />
        </div>

        <div className="pt-4 flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-[2] bg-indigo-600 text-white py-4 px-6 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              'Verify & Optimize'
            )}
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="flex-1 px-6 py-4 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="h-full flex flex-col">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Page Content or Outline
        </label>
        <textarea
          className="flex-1 min-h-[300px] w-full px-4 py-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-mono text-sm leading-relaxed"
          placeholder="Paste your page's table of contents, H1/H2 tags, or opening paragraph to help the AI suggest context-aware titles..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <div className="mt-2 p-3 bg-amber-50 rounded-lg border border-amber-100 flex gap-3">
          <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-[11px] text-amber-800 leading-tight">
            <strong>Pro Tip:</strong> Including your primary H1 tag in the content box helps the AI align the Title Tag with your page header for better relevance.
          </p>
        </div>
      </div>
    </form>
  );
};

export default SEOForm;
