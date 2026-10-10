export type ClaimStatus =
  | 'DRAFT'
  | 'INTAKE_SUBMITTED'
  | 'DIAGNOSTIC_EVALUATED'
  | 'ADJUDICATION_PENDING'
  | 'SUBSIDY_DISPATCHED'
  | 'SETTLED';

export interface BoundingBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  confidencePercent: number;
  severityLevel: 'MILD' | 'MODERATE' | 'SEVERE';
}

export interface SymptomMatch {
  id: string;
  symptomName: string;
  matched: boolean;
  matchScorePercent: number;
  description: string;
}

export interface CropPhotoSample {
  id: string;
  farmerName: string;
  plotName: string;
  cropType: 'MAIZE' | 'WHEAT' | 'SOY';
  diseaseDiagnosis: string;
  overallConfidencePercent: number;
  damageSeverityPercent: number;
  plotHectares: number;
  baseSubsidyRatePerHectareUsd: number;
  boundingBoxes: BoundingBox[];
  symptoms: SymptomMatch[];
  imageUrl: string;
}
