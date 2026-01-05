
import React, { useState } from 'react';

interface HomeViewProps {
  initialTitle: string;
  initialDescription: string;
  onAnalyze: (title: string, description: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ initialTitle, initialDescription, onAnalyze }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          Optimize Your <span className="text-indigo-600">SEO Presence</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Verify your SERP appearance and get AI-powered suggestions to improve your search visibility.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">SEO Title</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-800"
                placeholder="Enter your page title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                onClick={() => onAnalyze(title, description)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100 whitespace-nowrap"
              >
                Analyze Title
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Meta Description</label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-800 h-32 resize-none"
              placeholder="Enter your meta description (optional)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-50">
          <p className="text-xs text-slate-400 text-center">
            Tip: Click "Analyze Title" to access deep technical analysis, pixel measurement, and keyword verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
