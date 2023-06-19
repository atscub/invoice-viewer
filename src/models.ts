export interface BaseModel {
  id?: string;
}

export interface InvoiceModel extends BaseModel {
  relativeDiscount?: number;
  phases: InvoicePhaseModel[];
}
export interface InvoiceComputed extends InvoiceModel {
  phases: InvoicePhaseComputed[];
  totalCost: number;
  discountedTotalCost: number;
  totalAddedTax: number;
}

export interface InvoicePhaseModel extends BaseModel {
  name?: string;
  fixedDiscount?: number;
  items: CostItemModel[];
}
export interface InvoicePhaseComputed extends InvoicePhaseModel {
  items: CostItemComputed[];
  subtotalCost: number;
  addedTaxCost: number;
  totalCost: number;
}

export interface CostItemModel extends BaseModel {
  name: string;
  description?: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  taxRate: TaxRates;
}

export interface CostItemComputed extends CostItemModel {
  grossCost: number;
  discountedCost?: number;
  netCost: number;
}

export enum TaxRates {
  VAT_0 = 0,
  VAT_09 = 0.09,
  VAT_21 = 0.21,
}
