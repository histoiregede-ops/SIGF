/**
 * Configuration et constantes du module de digitalisation
 */

export const DIGITALIZATION_CONFIG = {
  // Zoom
  zoom: {
    min: 50,
    max: 300,
    step: 10,
    default: 100
  },

  // Pages
  pages: {
    maxZoom: 300,
    minZoom: 50
  },

  // Sections
  sections: {
    total: 5,
    keys: [
      'section1',
      'section2',
      'section3',
      'section4',
      'section5'
    ]
  },

  // Statuts
  statuses: {
    document: ['pending', 'in_progress', 'completed', 'rejected'],
    ocr: ['not_started', 'processing', 'completed', 'failed'],
    section: ['empty', 'in_progress', 'completed', 'to_review']
  },

  // Labels des sections
  sectionLabels: {
    section1: 'I - Désignation et description de l\'immeuble',
    section2: 'II - Modifications dans la consistance de l\'immeuble',
    section3: 'III - Modifications dans l\'exercice du droit de propriété',
    section4: 'IV - Mutations',
    section5: 'V - Privilèges et hypothèques'
  },

  // Couleurs (doivent correspondre aux SCSS)
  colors: {
    primary: '#2563eb',
    success: '#16a34a',
    warning: '#ea580c',
    danger: '#dc2626',
    info: '#0284c7',
    light: '#f8fafc',
    dark: '#1e293b'
  },

  // Animation
  animation: {
    duration: 300,
    easing: 'ease-in-out'
  }
};

export const SECTION_FIELDS = {
  section1: [
    'nature',
    'contenance',
    'situation',
    'limits',
    'salesLast10Years'
  ],
  section2: [
    'augmentations',
    'diminutions'
  ],
  section3: [
    'realRights',
    'unavailabilityClauses'
  ],
  section4: [
    'mutations'
  ],
  section5: [
    'constitutions',
    'liberations'
  ]
};

export const STATUS_LABELS = {
  'pending': 'En attente',
  'in_progress': 'En cours',
  'completed': 'Complété',
  'rejected': 'Rejeté',
  'not_started': 'Non commencé',
  'processing': 'En traitement',
  'completed': 'Complété',
  'failed': 'Erreur',
  'empty': 'Vide',
  'to_review': 'À corriger'
};

export const OCR_STATUS_CONFIG = {
  'not_started': {
    badge: 'badge-secondary',
    icon: '⏹️',
    label: 'Non commencé'
  },
  'processing': {
    badge: 'badge-info',
    icon: '⏳',
    label: 'En cours...'
  },
  'completed': {
    badge: 'badge-success',
    icon: '✅',
    label: 'Complété'
  },
  'failed': {
    badge: 'badge-danger',
    icon: '❌',
    label: 'Erreur'
  }
};

export const SECTION_STATUS_CONFIG = {
  'empty': {
    badge: 'badge-secondary',
    color: '#64748b',
    label: 'Vide'
  },
  'in_progress': {
    badge: 'badge-warning',
    color: '#ea580c',
    label: 'En cours'
  },
  'completed': {
    badge: 'badge-success',
    color: '#16a34a',
    label: 'Complété'
  },
  'to_review': {
    badge: 'badge-info',
    color: '#0284c7',
    label: 'À corriger'
  }
};

export const ROTATION_OPTIONS = [
  { label: 'Original (0°)', value: 0 },
  { label: '90°', value: 90 },
  { label: '180°', value: 180 },
  { label: '270°', value: 270 }
];

export const ZOOM_PRESETS = [
  { label: 'Dégrossir (50%)', value: 50 },
  { label: 'Ajusté (100%)', value: 100 },
  { label: 'Zoom (150%)', value: 150 },
  { label: 'Maximum (300%)', value: 300 }
];

// Messages
export const MESSAGES = {
  success: {
    saved: 'Les modifications ont été sauvegardées avec succès',
    completed: 'Le document a été marqué comme complété',
    submitted: 'Le document a été soumis pour validation'
  },
  error: {
    loadFailed: 'Impossible de charger le document',
    saveFailed: 'Erreur lors de la sauvegarde',
    invalidData: 'Les données saisies sont invalides'
  },
  warning: {
    unsavedChanges: 'Vous avez des modifications non sauvegardées',
    emptySection: 'Cette section est vide'
  },
  info: {
    ocrProcessing: 'L\'OCR est en cours de traitement...',
    noPages: 'Aucune page n\'est disponible pour ce document'
  }
};

// Validation
export const VALIDATION_RULES = {
  nature: {
    required: false,
    minLength: 2,
    maxLength: 500
  },
  contenance: {
    required: false,
    minLength: 1,
    maxLength: 100
  },
  situation: {
    required: false,
    minLength: 2,
    maxLength: 500
  },
  limits: {
    required: false,
    minLength: 2,
    maxLength: 500
  },
  year: {
    required: false,
    min: 1800,
    max: 2100
  },
  price: {
    required: false,
    min: 0,
    max: 999999999
  }
};

// Defaults
export const DEFAULTS = {
  document: {
    status: 'pending',
    ocrStatus: 'not_started',
    completionPercentage: 0
  },
  section: {
    status: 'empty'
  },
  viewer: {
    zoom: 100,
    rotation: 0
  }
};
