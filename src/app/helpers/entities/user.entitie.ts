interface Service {
  id_service: number;
  fqdn?: string;
  isAdmin?: number;
}

interface Groupe {
  id_groupe: number;
  label?: string;
}

export default class User {
  public id!: number;
  public nom!: string;
  public uid!: string;
  public services: Array<Service> = [];
  public groups: Array<Groupe> = [];

  constructor() {}
}
