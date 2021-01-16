export interface ClientModel {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  martialStatus: string;
  city: string;
  age: number;
  annualIncome: number;
}

export interface Rule {
  name: string;
  operator: string;
  value: string | number;
}

export interface FilterModel {
  rules: Rule[];
  related: boolean;
  relationName?: string;
  relatedEntities?: FilterModel[];
}
