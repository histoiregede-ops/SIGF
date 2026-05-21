/**
 * Modèle pour un titre foncier numéralisé
 */

export interface TitleDocument {
  id: string;
  folderId: string;
  folderName: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  ocrStatus: 'not_started' | 'processing' | 'completed' | 'failed';
  pages: DocumentPage[];
  metadata: TitleMetadata;
  completionPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentPage {
  id: string;
  pageNumber: number;
  imageUrl: string;
  imageData?: string;
  width?: number;
  height?: number;
}

export interface TitleMetadata {
  section1: DesignationSection;
  section2: ModificationsConsistance;
  section3: ModificationsPropertyRight;
  section4: Mutations;
  section5: PrivilegesHypothecs;
}

export interface DesignationSection {
  status: SectionStatus;
  nature: string;
  contenance: string;
  situation: string;
  limits: string;
  salesLast10Years: string;
  actes: ActeInfo[];
}

export interface ActeInfo {
  type: string;
  year: number;
  details?: string;
}

export interface ModificationsConsistance {
  status: SectionStatus;
  augmentations: PropertyModification[];
  diminutions: PropertyModification[];
}

export interface PropertyModification {
  registrationDate: RegistrationDate;
  designation: string;
  nature: string;
  contenanceHa?: number;
  contenanceAre?: number;
  contenanceCa?: number;
  price?: number;
}

export interface ModificationsPropertyRight {
  status: SectionStatus;
  realRights: RealRightModification[];
  unavailabilityClauses: UnavailabilityClause[];
}

export interface LiberationInfo {
  date?: RegistrationDate;
  details?: string;
}

export interface RealRightModification {
  registrationDate: RegistrationDate;
  constitution: string;
  liberation?: LiberationInfo;
}

export interface UnavailabilityClause {
  registrationDate: RegistrationDate;
  clauses: string;
  liberation?: LiberationInfo;
}

export interface Mutations {
  status: SectionStatus;
  mutations: MutationRecord[];
}

export interface MutationRecord {
  registrationDate: RegistrationDate;
  ownerInfo: OwnerInfo;
  acquisitionPrice?: number;
}

export interface OwnerInfo {
  name: string;
  profession?: string;
  address?: string;
}

export interface PrivilegesHypothecs {
  status: SectionStatus;
  constitutions: HypotheqRecord[];
  liberations: LiberationRecord[];
}

export interface HypotheqRecord {
  registrationDate: RegistrationDate;
  debitorCreditor: string;
  amount?: number;
  interest?: number;
  otherMentions?: string;
}

export interface LiberationRecord extends HypotheqRecord {
  liberationDate: RegistrationDate;
}

export interface RegistrationDate {
  year: number;
  day?: number;
  month?: string;
}

export type SectionStatus = 'empty' | 'in_progress' | 'completed' | 'to_review';

export interface CompletionMetrics {
  totalSections: number;
  completedSections: number;
  percentage: number;
  sectionStates: {
    [key: string]: SectionStatus;
  };
}
