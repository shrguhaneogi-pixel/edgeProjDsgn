import { CropPhotoSample } from '../types';

export const DEMO_CROP_SAMPLES: CropPhotoSample[] = [
  {
    id: 'sample-maize-blight',
    farmerName: 'Joseph K. Mwangi',
    plotName: 'Highland Valley Plot 4B',
    cropType: 'MAIZE',
    diseaseDiagnosis: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
    overallConfidencePercent: 92,
    damageSeverityPercent: 38,
    plotHectares: 10.0,
    baseSubsidyRatePerHectareUsd: 850,
    imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
    boundingBoxes: [
      {
        id: 'box-1',
        x: 120,
        y: 80,
        width: 140,
        height: 110,
        label: 'Elliptical Lesion A',
        confidencePercent: 94,
        severityLevel: 'MODERATE'
      },
      {
        id: 'box-2',
        x: 290,
        y: 160,
        width: 180,
        height: 130,
        label: 'Necrotic Foliar Patch B',
        confidencePercent: 91,
        severityLevel: 'SEVERE'
      },
      {
        id: 'box-3',
        x: 80,
        y: 220,
        width: 110,
        height: 90,
        label: 'Chlorotic Streak C',
        confidencePercent: 88,
        severityLevel: 'MILD'
      }
    ],
    symptoms: [
      {
        id: 'sym-1',
        symptomName: 'Elongated cigar-shaped grayish-green lesions',
        matched: true,
        matchScorePercent: 95,
        description: 'Characteristic parallel lesion geometry extending along leaf vein margins.'
      },
      {
        id: 'sym-2',
        symptomName: 'Dark fungal sporulation in lesion center',
        matched: true,
        matchScorePercent: 90,
        description: 'Microscopic conidia spores observed under high-magnification lens.'
      },
      {
        id: 'sym-3',
        symptomName: 'Lower canopy premature senescence',
        matched: true,
        matchScorePercent: 91,
        description: 'Desiccation of mature lower leaves reducing photosynthetic capacity.'
      }
    ]
  },
  {
    id: 'sample-wheat-rust',
    farmerName: 'Elena Rostova',
    plotName: 'Steppe Wheat Cooperative #12',
    cropType: 'WHEAT',
    diseaseDiagnosis: 'Wheat Stem Rust (Puccinia graminis)',
    overallConfidencePercent: 88,
    damageSeverityPercent: 62,
    plotHectares: 15.0,
    baseSubsidyRatePerHectareUsd: 850,
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    boundingBoxes: [
      {
        id: 'box-w1',
        x: 100,
        y: 60,
        width: 200,
        height: 160,
        label: 'Rust Pustule Cluster A',
        confidencePercent: 92,
        severityLevel: 'SEVERE'
      },
      {
        id: 'box-w2',
        x: 340,
        y: 180,
        width: 150,
        height: 120,
        label: 'Stem Rupture Patch B',
        confidencePercent: 85,
        severityLevel: 'SEVERE'
      }
    ],
    symptoms: [
      {
        id: 'sym-w1',
        symptomName: 'Reddish-brown pustules (uredinia) on stems and leaves',
        matched: true,
        matchScorePercent: 93,
        description: 'Ruptured plant epidermis revealing powdery reddish spore masses.'
      },
      {
        id: 'sym-w2',
        symptomName: 'Severe stem lodging and vascular disruption',
        matched: true,
        matchScorePercent: 84,
        description: 'Weakened stem structure leading to field lodging under wind load.'
      }
    ]
  },
  {
    id: 'sample-soy-healthy',
    farmerName: 'Carlos Santos',
    plotName: 'Cerrado Farm Parcel 8',
    cropType: 'SOY',
    diseaseDiagnosis: 'Healthy Soybean Canopy (No Pathogen Detected)',
    overallConfidencePercent: 96,
    damageSeverityPercent: 4,
    plotHectares: 8.0,
    baseSubsidyRatePerHectareUsd: 850,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    boundingBoxes: [],
    symptoms: [
      {
        id: 'sym-s1',
        symptomName: 'Vibrant green trifoliate canopy structure',
        matched: false,
        matchScorePercent: 98,
        description: 'Uniform leaf pigmentation without necrotic lesions or rust pustules.'
      }
    ]
  }
];
