import { useState } from "react";
import { Button, Card, CardContent, CardHeader, Snackbar } from "@mui/material";
import { InvoiceComputed } from "../models";
import InvoicePhase from "./InvoicePhase";
import InvoiceSummary from "./InvoiceSummary";
import Print from "@mui/icons-material/Print";

export interface InvoiceViewerProps {
  invoice: InvoiceComputed;
}

const InvoiceViewer = ({ invoice }: InvoiceViewerProps) => {
  const [printMessageOpen, setPrintMessageOpen] = useState(false);
  return (
    <Card>
      <Snackbar
        open={printMessageOpen}
        autoHideDuration={3000}
        onClose={() => setPrintMessageOpen(false)}
        message="Printing is not yet implemented."
      />
      <CardHeader
        title="Invoice #1"
        action={
          <Button
            variant="outlined"
            startIcon={<Print />}
            onClick={() => setPrintMessageOpen(true)}
          >
            Print
          </Button>
        }
      />
      <CardContent>
        {invoice.phases.map((phase) => (
          <InvoicePhase key={phase.id} invoicePhase={phase} />
        ))}
        <InvoiceSummary
          subtotal={invoice.totalCost}
          total={invoice.discountedTotalCost}
          addedTax={invoice.totalAddedTax}
          discount={invoice.relativeDiscount ?? 0}
        />
      </CardContent>
    </Card>
  );
};

export default InvoiceViewer;
