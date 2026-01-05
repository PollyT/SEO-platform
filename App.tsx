
import React, { useState } from 'react';
import Header from './components/Header';
import SEOForm from './components/SEOForm';
import AnalysisDashboard from './components/AnalysisDashboard';
import { PageData, SEOAnalysis } from './types';
import { analyzeSEO } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (data: PageData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeSEO(data);
      setAnalysis(result);
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze SEO data. Please check your inputs or try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">SEO Analyzer</h2>
            <p className="text-slate-500 mt-1">Provide your page details to verify your current title and get AI-powered suggestions.</p>
          </div>
          
          <SEOForm onAnalyze={handleAnalyze} isLoading={loading} onReset={handleReset} />
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
      </main>
    </div>
  );
};

export default App;
