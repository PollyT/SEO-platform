
import React from 'react';
import { SEOAnalysis, SEOSuggestion } from '../types';

interface Props {
  analysis: SEOAnalysis;
}

const AnalysisDashboard: React.FC<Props> = ({ analysis }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <span className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">SEO Score</span>
          <div className={`text-5xl font-extrabold ${analysis.score > 80 ? 'text-emerald-500' : analysis.score > 50 ? 'text-amber-500' : 'text-rose-500'}`}>
            {analysis.score}
          </div>
          <p className="text-slate-400 text-xs mt-2 font-medium">Content & Width Balance</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <span className="text-slate-500 text-sm font-medium uppercase tracking-wider block mb-4">Core Vitals Check</span>
          <ul className="space-y-3">
            <CheckItem label="Keyword Included" pass={analysis.keywordIncluded} />
            <CheckItem label="Pixel Width Optimization" pass={analysis.pixelWidthOk} />
            <CheckItem label="Sentiment Alignment" pass={analysis.sentiment !== 'negative'} />
          </ul>
          {analysis.measuredPixelWidth && (
            <div className="mt-4 pt-4 border-t border-slate-50">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Current Width:</span>
                <span className={`font-bold ${analysis.measuredPixelWidth > 580 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {analysis.measuredPixelWidth}px
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <span className="text-slate-500 text-sm font-medium uppercase tracking-wider block mb-4">Search Visibility</span>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-800">{analysis.estimatedCTR}</div>
              <div className="text-xs text-slate-400">Predicted CTR</div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {analysis.extractedKeywords.slice(0, 5).map(kw => (
              <span key={kw} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded uppercase tracking-tighter">{kw}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Improvements and Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Expert Recommendations
          </h3>
          <ul className="space-y-4">
            {analysis.improvements.map((improvement, i) => (
              <li key={i} className="flex gap-3 text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                  {i + 1}
                </span>
                {improvement}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 px-1">
            <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
            Optimized Variants
          </h3>
          <div className="space-y-4">
            {analysis.suggestions.map((suggestion, i) => (
              <SuggestionCard key={i} suggestion={suggestion} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckItem: React.FC<{ label: string, pass: boolean }> = ({ label, pass }) => (
  <li className="flex items-center justify-between text-sm">
    <span className="text-slate-600">{label}</span>
    {pass ? (
      <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight">Optimized</span>
    ) : (
      <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight">Action Required</span>
    )}
  </li>
);

// Internal utility for the card
const measureTextWidthSimple = (text: string): number => {
  if (typeof document === 'undefined') return 0;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return text.length * 10;
  context.font = '18px Arial';
  return Math.ceil(context.measureText(text).width);
};

const SuggestionCard: React.FC<{ suggestion: SEOSuggestion }> = ({ suggestion }) => {
  const [copied, setCopied] = React.useState(false);
  const width = measureTextWidthSimple(suggestion.title);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(suggestion.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const badgeStyles = {
    'keyword-focused': 'bg-blue-50 text-blue-700 border-blue-100',
    'click-worthy': 'bg-pink-50 text-pink-700 border-pink-100',
    'minimalist': 'bg-slate-50 text-slate-700 border-slate-100',
    'branding-forward': 'bg-indigo-50 text-indigo-700 border-indigo-100'
  }[suggestion.type] || 'bg-slate-50 text-slate-700 border-slate-100';

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-all group relative overflow-hidden">
      {/* Width indicator stripe */}
      <div 
        className={`absolute top-0 left-0 h-1 transition-all duration-500 ${width > 580 ? 'bg-rose-400' : 'bg-emerald-400'}`} 
        style={{ width: `${Math.min((width / 580) * 100, 100)}%` }}
      />
      
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest border ${badgeStyles}`}>
          {suggestion.type.replace('-', ' ')}
        </span>
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-bold ${width > 580 ? 'text-rose-500' : 'text-slate-400'}`}>
            {width}px
          </span>
          <button 
            onClick={copyToClipboard}
            className="text-slate-300 hover:text-indigo-600 transition-colors"
            title="Copy Title"
          >
            {copied ? (
              <svg className="w-5 h-5 text-emerald-500 animate-in zoom-in duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <h4 className="text-base font-bold text-slate-800 mb-2 leading-snug">
        {suggestion.title}
      </h4>
      <p className="text-[11px] text-slate-500 leading-normal">
        {suggestion.reason}
      </p>
    </div>
  );
};

export default AnalysisDashboard;
