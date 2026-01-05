
import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import AnalysisView from './components/AnalysisView';
import { PageData, SEOAnalysis } from './types';
import { analyzeSEO } from './services/geminiService';

type ViewState = 'home' | 'analysis';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [pageData, setPageData] = useState<PageData>({
    currentTitle: '深圳地圖導覽：深度探索深圳 Top15 山海城市最美景點',
    currentDescription: '正在尋找最完整的深圳地圖？這份指南深度探索深圳 Top15 必去景點，從絕美海景到城市綠洲，包含交通攻略與地圖導覽，助你輕鬆規劃深圳自由行。',
    targetKeyword: '深圳地圖',
    content: `深圳地圖\n\n1. 深圳地圖 | 深圳景點一覽\n2. 深圳地圖 | 世界之窗\n3. 深圳地圖 | 東部華僑城\n4. 深圳地圖 | 深圳歡樂谷\n5. 深圳地圖 | 紅樹林自然保護區\n6. 深圳地圖 | 錦繡中華民俗文化村\n7. 深圳地圖 | 小梅沙\n8. 深圳地圖 | 大梅沙海濱公園\n9. 深圳地圖 | 大鵬所城\n10. 深圳地圖 | 深圳野生動物園\n11. 深圳地圖 | 荷蘭花卉小鎮\n12. 深圳地圖 | 楊梅坑\n13. 深圳地圖 | 仙湖植物園\n14. 深圳地圖 | 深圳灣公園\n15. 深圳地圖 | 梧桐山\n16. 深圳地圖 | 七娘山\n17. 深圳地圖 | 深圳必備`,
    currentTitlePixelWidth: 0,
    currentDescriptionPixelWidth: 0
  });

  const handleStartAnalysis = (title: string, description: string) => {
    setPageData(prev => ({ ...prev, currentTitle: title, currentDescription: description }));
    setView('analysis');
  };

  const performAnalysis = async (data: PageData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeSEO(data);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze SEO data. Please check your inputs or try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setView('home');
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      <Header onLogoClick={() => setView('home')} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {view === 'home' ? (
          <HomeView 
            initialTitle={pageData.currentTitle} 
            initialDescription={pageData.currentDescription}
            onAnalyze={handleStartAnalysis} 
          />
        ) : (
          <AnalysisView 
            data={pageData} 
            setData={setPageData}
            onAnalyze={performAnalysis}
            onBack={handleBack}
            analysis={analysis}
            loading={loading}
            error={error}
          />
        )}
      </main>
    </div>
  );
};

export default App;
