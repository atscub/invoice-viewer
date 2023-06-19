export interface BaseModel {
  id?: string;
}

export interface InvoiceModel extends BaseModel {
  relativeDiscount?: number;
  phases: InvoicePhaseModel[];
}
export type InvoiceComputed = InvoiceModel & {
  phases: InvoicePhaseComputed[];
  totalCost: number;
};

export interface InvoicePhaseModel extends BaseModel {
  fixedDiscount?: number;
  items: CostItemModel[];
}
export type InvoicePhaseComputed = InvoicePhaseModel & {
  items: CostItemComputed[];
  totalCost: number;
};

export interface CostItemModel extends BaseModel {
  name: string;
  description?: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  taxRate: TaxRates;
}

export type CostItemComputed = CostItemModel & {
  fixedDiscountFee?: number;
};

export enum TaxRates {
  VAT_0 = 0,
  VAT_09 = 0.09,
  VAT_21 = 0.21,
}
