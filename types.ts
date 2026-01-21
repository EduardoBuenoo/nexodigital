
export interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Package {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface DiagnosisResult {
  analysis: string;
  recommendations: string[];
}
