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
import { InvoicePhaseModel } from "../models";
import CostItem from "./CostItem";

export interface InvoicePhaseProps {
  invoicePhase: InvoicePhaseModel;
}

const InvoicePhase = ({
  invoicePhase: { fixedDiscount, items },
}: InvoicePhaseProps) => {
  return (
    <Stack
      direction="column"
      sx={{
        borderTop: "1px #454545 solid",
        borderBottom: "1px #454545 solid",
        borderCollapse: "collapse",
        "& .MuiTableBody-root .MuiTableRow-root:not(:last-child) .MuiTableCell-root":
          {
            borderBottom: "none",
          },
      }}
    >
      <Table>
        <TableHead>
          <CostItem.Header />
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <CostItem key={item.id} costItem={item} />
          ))}
        </TableBody>
        <TableFooter>
          <CostItem.Footer total={100} discount={fixedDiscount ?? 0} />
        </TableFooter>
      </Table>
    </Stack>
  );
};

export default InvoicePhase;
