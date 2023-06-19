import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { InvoiceModel, InvoiceComputed } from "../models";
import { getComputedInvoice } from "../services/invoiceService";

type NullableInvoice = InvoiceComputed | null;

// Define the initial state using that type
const initialState: NullableInvoice = null;

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: initialState as NullableInvoice,
  reducers: {
    initFromModel: (state, action: PayloadAction<InvoiceModel>) => {
      const rawInvoice = structuredClone(action.payload);
      return getComputedInvoice(rawInvoice);
    },
  },
});

export const { initFromModel } = invoiceSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectInvoice = (state: RootState) => state.invoice;

export default invoiceSlice.reducer;
