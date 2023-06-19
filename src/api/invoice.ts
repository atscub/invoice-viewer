import { TypedDocumentNode, gql } from "@apollo/client";
import { InvoiceModel } from "../models";

interface GetInvoiceQueryResponse {
  invoice: InvoiceModel;
}

export const GET_INVOICE_QUERY: TypedDocumentNode<GetInvoiceQueryResponse> = gql`
  query GetInvoice($id: ID!) {
    invoice(id: $id) {
      id
      relativeDiscount
      phases {
        id
        name
        fixedDiscount
        items {
          id
          name
          description
          unit
          quantity
          unitPrice
          taxRate
        }
      }
    }
  }
`;
