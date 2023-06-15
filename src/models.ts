export interface BaseModel {
  id: string;
}

export interface Invoice extends BaseModel {
  relativeDiscount: number;
  phases: InvoicePhase[];
}

export interface InvoicePhase extends BaseModel {
  fixedDiscount: number;
  items: CostItem[];
}

export interface CostItem extends BaseModel {
  unit: string;
  quantity: number;
  unitPrice: number;
  taxRate: TaxRates;
}

export enum TaxRates {
  VAT_0 = 0,
  VAT_5 = 9,
  VAT_10 = 21,
}
