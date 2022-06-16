export enum CONTACT_TYPE {
  CONTACT = 'CONTACT',
  HEADER = 'HEADER',
}

export interface IContact {
  id: number;
  name: string;
  selected: boolean;
  type: CONTACT_TYPE;
  number?: string;
}

export interface ISelectedContact {
  id: number;
  name: string;
}
