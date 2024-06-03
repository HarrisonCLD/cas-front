export interface Access {
  unique: number;
  access: number;
  success: number;
  error: number;
}

export interface ResumeAccess {
  name: string;
  nameFR: string;
  valeur: string;
}

export interface ResumeAccessDetails {
  id_service: number;
  name: string;
  access: number;
}
