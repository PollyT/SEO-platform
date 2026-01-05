
export interface SEOSuggestion {
  title: string;
  reason: string;
  type: 'keyword-focused' | 'click-worthy' | 'minimalist' | 'branding-forward';
}

export interface SEOAnalysis {
  score: number;
  pixelWidthOk: boolean;
  keywordIncluded: boolean;
  sentiment: 'positive' | 'negative' | 'neutral';
  improvements: string[];
  suggestions: SEOSuggestion[];
  extractedKeywords: string[];
  estimatedCTR: string;
  measuredPixelWidth?: number;
}

export interface PageData {
  currentTitle: string;
  currentDescription: string;
  targetKeyword: string;
  content: string; // Used for Table of Contents
  currentPixelWidth: number;
}
