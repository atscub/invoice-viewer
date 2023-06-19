import {
  CostItemModel,
  CostItemComputed,
  InvoiceModel,
  InvoicePhaseModel,
  TaxRates,
  InvoiceComputed,
  InvoicePhaseComputed,
} from "../models";

const getItemCost = (item: CostItemModel): number =>
  item.quantity * item.unitPrice;

const costItemReductor = (maxDiscount: number) => {
  let remainingDiscount = maxDiscount;
  return (item: CostItemModel) => {
    const grossCost = getItemCost(item);
    const discount = Math.min(remainingDiscount, grossCost);
    const discountedCost = grossCost - discount;
    const netCost = discountedCost * (1 + item.taxRate);
    remainingDiscount -= discount;
    return {
      ...item,
      grossCost: grossCost,
      discountedCost: discountedCost,
      netCost: netCost,
    };
  };
};

const getComputedCostItems = (phase: InvoicePhaseModel): CostItemComputed[] => {
  const discount = phase.fixedDiscount ?? 0;
  if (discount <= 0) {
    const reduceFunction = costItemReductor(-discount);
    return (
      phase.items
        // Add index for reverting the sort later
        .map((item, index) => ({ item, index }))
        // Sort by tax rate descending
        .sort((a, b) => -(a.item.taxRate - b.item.taxRate))
        .map(({ item, index }) => ({ item: reduceFunction(item), index }))
        // Revert the sort
        .sort((a, b) => a.index - b.index)
        // Remove the index
        .map(({ item }) => item)
    );
  } else {
    // If there is a fee instead of a discount, add it as a CostItem to the end
    const fee = {
      name: "Fee",
      description: "A one time fee for some reason",
      unit: "fee",
      quantity: 1,
      unitPrice: discount,
      taxRate: TaxRates.VAT_0,
    };
    const reduceFunction = costItemReductor(0);
    return [...phase.items, fee].map((item) => reduceFunction(item));
  }
};

const getComputedPhase = (phase: InvoicePhaseModel): InvoicePhaseComputed => {
  const computedCostItems = getComputedCostItems(phase);

  const totalCost = computedCostItems.reduce(
    (acc, item) => acc + item.netCost,
    0
  );
  const subTotalCost = computedCostItems.reduce(
    (acc, item) => acc + (item.discountedCost ?? item.grossCost),
    0
  );
  return {
    ...phase,
    items: computedCostItems,
    totalCost: totalCost,
    subtotalCost: subTotalCost,
    addedTaxCost: totalCost - subTotalCost,
  };
};

export const getComputedInvoice = (
  rawInvoice: InvoiceModel
): InvoiceComputed => {
  const computedPhases = rawInvoice.phases.map((phase) =>
    getComputedPhase(phase)
  );
  const totalCost = computedPhases.reduce(
    (acc, phase) => acc + phase.totalCost,
    0
  );
  const totalAddedTax = computedPhases.reduce(
    (acc, phase) => acc + phase.addedTaxCost,
    0
  );
  return {
    ...rawInvoice,
    phases: computedPhases,
    totalCost: totalCost,
    totalAddedTax: totalAddedTax,
    discountedTotalCost: totalCost * (1 + (rawInvoice.relativeDiscount ?? 0)),
  };
};
