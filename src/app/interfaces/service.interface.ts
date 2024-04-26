export interface Service {
  id: number;
  name: string;
  admin: {
    nom: string;
    mail: string;
  };
  active: number | null;
  isDev: number | null;
  isEnded: number | null;
  moyenne: number | null;
  peak: number | null;
  total: number | null;
  datasets: Array<Object> | null;
  new: number;
}
