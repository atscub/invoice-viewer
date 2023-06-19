import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  useTheme,
} from "@mui/material";

export interface InvoiceSummaryProps {
  subtotal: number;
  total: number;
  discount: number;
  addedTax: number;
}

const InvoiceSummary = ({
  subtotal,
  total,
  discount,
  addedTax,
}: InvoiceSummaryProps) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      justifyContent="end"
      sx={{
        borderTop: "1px #454545 solid",
      }}
    >
      <Table
        sx={{
          width: 0.4,
          borderCollapse: "collapse",
          border: `1px ${theme.palette.grey[300]} solid`,
          "& .MuiTableBody-root .MuiTableCell-root:not(:last-child)": {
            borderRight: `1px ${theme.palette.grey[300]} solid`,
          },
        }}
      >
        <caption style={{ captionSide: "top" }}>
          <h3 style={{ margin: 0 }}>Summary</h3>
        </caption>
        <TableBody>
          <TableRow>
            <TableCell>Subtotal</TableCell>
            <TableCell>{subtotal.toFixed(2)}</TableCell>
          </TableRow>
          {/* {discount !== 0 ? ( */}
          <TableRow>
            <TableCell>Global {discount < 0 ? "discount" : "fee"}</TableCell>
            <TableCell>{(discount * 100).toFixed(2)} %</TableCell>
          </TableRow>
          {/* ) : null} */}
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>{total.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Added tax</TableCell>
            <TableCell>{addedTax.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  );
};

export default InvoiceSummary;
