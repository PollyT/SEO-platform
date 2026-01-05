
export interface SEOSuggestion {
  title: string;
  reason: string;
  type: 'keyword-focused' | 'click-worthy' | 'minimalist' | 'branding-forward';
}

export interface SEOAnalysis {
  score: number;
  pixelWidthOk: boolean; // Replaces lengthOk for more accuracy
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
  targetKeyword: string;
  content: string;
  currentPixelWidth: number; // Added to pass accurate UI measurement to AI
}
