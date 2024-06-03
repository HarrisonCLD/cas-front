export interface Service {
  id: number;
  title?: string;
  name?: string;
  admin?: [];
  active?: boolean;
  isDev?: boolean;
  isEnded?: boolean;
  moyenne?: number;
  peak?: number;
  total?: number;
  datasets?: Array<Object>;
  labels?: Array<String>;
  new?: number;
}
