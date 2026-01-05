
export interface SEOSuggestion {
  title: string;
  reason: string;
  type: 'keyword-focused' | 'click-worthy' | 'minimalist' | 'branding-forward';
}

export interface DescriptionSuggestion {
  text: string;
  reason: string;
}

export interface SEOAnalysis {
  score: number;
  titleMetrics: {
    score: number;
    pixelWidthOk: boolean;
    keywordIncluded: boolean;
    measuredPixelWidth: number;
    improvements: string[];
    suggestions: SEOSuggestion[];
  };
  descriptionMetrics: {
    score: number;
    pixelWidthOk: boolean;
    keywordIncluded: boolean;
    measuredPixelWidth: number;
    improvements: string[];
    suggestions: DescriptionSuggestion[];
  };
  sentiment: 'positive' | 'negative' | 'neutral';
  extractedKeywords: string[];
  estimatedCTR: string;
}

export interface PageData {
  currentTitle: string;
  currentDescription: string;
  targetKeyword: string;
  content: string; 
  currentTitlePixelWidth: number;
  currentDescriptionPixelWidth: number;
}
