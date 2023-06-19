import {
  Chip,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { InvoicePhaseComputed } from "../models";
import CostItem from "./CostItem";

export interface InvoicePhaseProps {
  invoicePhase: InvoicePhaseComputed;
}

const InvoicePhase = ({
  invoicePhase: {
    fixedDiscount,
    items,
    totalCost,
    name,
    subtotalCost,
    addedTaxCost,
  },
}: InvoicePhaseProps) => {
  return (
    <Stack
      direction="column"
      sx={{
        borderTop: "1px #454545 solid",
        // borderBottom: "1px #454545 solid",
        borderCollapse: "collapse",
        "& .MuiTable-root .MuiTableCell-root:not(:first-child)": {
          textAlign: "center",
        },
        "& .MuiTableBody-root .MuiTableRow-root:not(:last-child) .MuiTableCell-root":
          {
            borderBottom: "none",
          },
      }}
    >
      <Table>
        <caption style={{ captionSide: "top" }}>
          <h3 style={{ margin: 0 }}>{name}</h3>
        </caption>
        <TableHead>
          <CostItem.Header />
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <CostItem key={item.id} costItem={item} />
          ))}
        </TableBody>
        <TableFooter>
          <CostItem.Footer
            total={totalCost}
            discount={fixedDiscount ?? 0}
            subtotal={subtotalCost}
            subtotalAddedTax={addedTaxCost}
          />
        </TableFooter>
      </Table>
    </Stack>
  );
};

export default InvoicePhase;
