import { InvoiceModel, TaxRates } from "./models";
import { GET_INVOICE_QUERY } from "./api/invoice";

export const mocks = [
  {
    request: {
      query: GET_INVOICE_QUERY,
      variables: {
        id: "1",
      },
    },
    result: {
      data: {
        invoice: {
          id: "1",
          phases: [
            {
              id: "phase-1",
              name: "Phase 1",
              fixedDiscount: -300,
              items: [
                {
                  id: "1",
                  name: "Item 1",
                  description: "lorem ipsum dolor sit amet 1",
                  unit: "hr",
                  unitPrice: 25,
                  quantity: 10,
                  taxRate: TaxRates.VAT_21,
                },
                {
                  id: "2",
                  name: "Item 2",
                  description: "lorem ipsum dolor sit amet 2",
                  unit: "unit",
                  unitPrice: 400,
                  quantity: 3,
                  taxRate: TaxRates.VAT_09,
                },
                {
                  id: "3",
                  name: "Item 3",
                  description: "lorem ipsum dolor sit amet 3",
                  unit: "unit",
                  unitPrice: 100,
                  quantity: 1,
                  taxRate: TaxRates.VAT_21,
                },
              ],
            },
            {
              id: "phase-2",
              name: "Phase 2",
              fixedDiscount: -100,
              items: [
                {
                  id: "4",
                  name: "Item 4",
                  description: "lorem ipsum dolor sit amet 4",
                  unit: "hr",
                  unitPrice: 25,
                  quantity: 10,
                  taxRate: TaxRates.VAT_21,
                },
                {
                  id: "5",
                  name: "Item 5",
                  description: "lorem ipsum dolor sit amet 5",
                  unit: "unit",
                  unitPrice: 400,
                  quantity: 3,
                  taxRate: TaxRates.VAT_09,
                },
              ],
            },
          ],
          relativeDiscount: -0.1,
        } as InvoiceModel,
      },
    },
  },
];
