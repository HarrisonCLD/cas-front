interface ServiceUser {
  id_service: number;
  fqdn?: string;
  isAdmin?: number;
}

interface GroupeUser {
  id_groupe: number;
  label?: string;
}

export interface User {
  id: number;
  nom: string;
  uid: string;
  services: Array<ServiceUser>;
  groups: Array<GroupeUser>;
}
