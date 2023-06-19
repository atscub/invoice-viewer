import { Card, CardContent, CardHeader } from "@mui/material";
import { InvoiceModel } from "../models";
import InvoicePhase from "./InvoicePhase";

export interface InvoiceViewerProps {
  invoice: InvoiceModel;
}

const InvoiceViewer = ({ invoice }: InvoiceViewerProps) => {
  return (
    <Card>
      <CardHeader title="Invoice #1" />
      <CardContent>
        {invoice.phases.map((phase) => (
          <InvoicePhase key={phase.id} invoicePhase={phase} />
        ))}
      </CardContent>
    </Card>
  );
};

export default InvoiceViewer;
