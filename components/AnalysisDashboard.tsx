
import React from 'react';
import { SEOAnalysis, SEOSuggestion, DescriptionSuggestion } from '../types';

interface Props {
  analysis: SEOAnalysis;
}

const AnalysisDashboard: React.FC<Props> = ({ analysis }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <span className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Overall Score</span>
          <div className={`text-6xl font-black ${analysis.score > 80 ? 'text-emerald-500' : analysis.score > 50 ? 'text-amber-500' : 'text-rose-500'}`}>
            {analysis.score}
          </div>
          <p className="text-slate-400 text-xs mt-3 font-medium">Meta Quality Rating</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <span className="text-slate-500 text-sm font-medium uppercase tracking-wider block mb-4">Core Checks</span>
          <ul className="space-y-3">
            <CheckItem label="Title Keyword" pass={analysis.titleMetrics.keywordIncluded} />
            <CheckItem label="Title Pixel Width" pass={analysis.titleMetrics.pixelWidthOk} />
            <CheckItem label="Desc Keyword" pass={analysis.descriptionMetrics.keywordIncluded} />
            <CheckItem label="Desc Pixel Width" pass={analysis.descriptionMetrics.pixelWidthOk} />
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <span className="text-slate-500 text-sm font-medium uppercase tracking-wider block mb-4">Engagement Signals</span>
          <div className="flex items-center gap-4 mb-4">
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
          <div className="flex flex-wrap gap-2">
            {analysis.extractedKeywords.slice(0, 4).map(kw => (
              <span key={kw} className="px-2 py-1 bg-slate-50 text-slate-500 text-[9px] font-bold rounded border border-slate-100 uppercase tracking-tighter">{kw}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Title Analysis Section */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 px-8 py-4 flex justify-between items-center">
          <h3 className="text-white font-bold tracking-wide uppercase text-sm">Title Analysis</h3>
          <span className="text-indigo-300 font-bold text-lg">{analysis.titleMetrics.score}/100</span>
        </div>
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Recommendations</h4>
            <ul className="space-y-3">
              {analysis.titleMetrics.improvements.map((imp, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {imp}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Suggested Titles</h4>
            {analysis.titleMetrics.suggestions.map((s, i) => (
              <TitleSuggestionCard key={i} suggestion={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Description Analysis Section */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-indigo-600 px-8 py-4 flex justify-between items-center">
          <h3 className="text-white font-bold tracking-wide uppercase text-sm">Meta Description Analysis</h3>
          <span className="text-white font-bold text-lg">{analysis.descriptionMetrics.score}/100</span>
        </div>
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Recommendations</h4>
            <ul className="space-y-3">
              {analysis.descriptionMetrics.improvements.map((imp, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
                  <svg className="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {imp}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Suggested Descriptions</h4>
            {analysis.descriptionMetrics.suggestions.map((s, i) => (
              <DescSuggestionCard key={i} suggestion={s} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const CheckItem: React.FC<{ label: string, pass: boolean }> = ({ label, pass }) => (
  <li className="flex items-center justify-between text-sm">
    <span className="text-slate-600 font-medium">{label}</span>
    {pass ? (
      <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    )}
  </li>
);

const measureTextWidthSimple = (text: string, font: string): number => {
  if (typeof document === 'undefined') return 0;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return text.length * 10;
  context.font = font;
  return Math.ceil(context.measureText(text).width);
};

const TitleSuggestionCard: React.FC<{ suggestion: SEOSuggestion }> = ({ suggestion }) => {
  const [copied, setCopied] = React.useState(false);
  const width = measureTextWidthSimple(suggestion.title, '18px Arial');

  const badgeStyles = {
    'keyword-focused': 'bg-blue-50 text-blue-700',
    'click-worthy': 'bg-pink-50 text-pink-700',
    'minimalist': 'bg-slate-50 text-slate-700',
    'branding-forward': 'bg-indigo-50 text-indigo-700'
  }[suggestion.type] || 'bg-slate-50 text-slate-700';

  return (
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 group">
      <div className="flex justify-between items-start mb-2">
        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${badgeStyles}`}>
          {suggestion.type}
        </span>
        <div className="flex items-center gap-2">
           <span className={`text-[10px] font-bold ${width > 580 ? 'text-rose-500' : 'text-slate-400'}`}>{width}px</span>
           <button onClick={() => { navigator.clipboard.writeText(suggestion.title); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <span className="text-emerald-500 text-[10px] font-bold uppercase">Copied!</span> : <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>}
           </button>
        </div>
      </div>
      <p className="text-sm font-bold text-slate-800 leading-snug">{suggestion.title}</p>
      <p className="text-[10px] text-slate-400 mt-1">{suggestion.reason}</p>
    </div>
  );
};

const DescSuggestionCard: React.FC<{ suggestion: DescriptionSuggestion }> = ({ suggestion }) => {
  const [copied, setCopied] = React.useState(false);
  const width = measureTextWidthSimple(suggestion.text, '14px Arial');

  return (
    <div className="bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100/50 group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Optimized Desc</span>
        <div className="flex items-center gap-2">
           <span className={`text-[10px] font-bold ${width > 920 ? 'text-rose-500' : 'text-indigo-400'}`}>{width}px</span>
           <button onClick={() => { navigator.clipboard.writeText(suggestion.text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
              {copied ? <span className="text-emerald-500 text-[10px] font-bold uppercase">Copied!</span> : <svg className="w-4 h-4 text-indigo-200 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>}
           </button>
        </div>
      </div>
      <p className="text-xs text-slate-700 leading-relaxed italic">"{suggestion.text}"</p>
      <p className="text-[10px] text-indigo-400 mt-2 font-medium">Why: {suggestion.reason}</p>
    </div>
  );
};

export default AnalysisDashboard;
