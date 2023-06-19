import { Chip, TableCell, TableRow, Typography, useTheme } from "@mui/material";
import { CostItemComputed } from "../models";

export interface CostItemProps {
  costItem: CostItemComputed;
}

const CostItem = ({
  costItem: {
    name,
    description,
    unit,
    unitPrice,
    quantity,
    taxRate,
    grossCost,
    discountedCost = grossCost,
    netCost,
  },
}: CostItemProps) => {
  const theme = useTheme();
  return (
    <TableRow
      sx={
        unit === "fee"
          ? {
              "& .MuiTableCell-root": {
                color: theme.palette.info.dark,
              },
              background: theme.palette.grey[200],
            }
          : {}
      }
    >
      <TableCell>
        {name}: {description}
      </TableCell>
      <TableCell>{unit}</TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>{unitPrice}</TableCell>
      <TableCell>
        {grossCost !== discountedCost ? (
          <>
            <Chip
              label={grossCost.toFixed(2)}
              sx={{
                borderRadius: 0,
                textDecoration: "line-through",
                marginRight: 0.5,
                height: "auto",
                "& .MuiChip-label": { padding: 0 },
              }}
            />
            {discountedCost.toFixed(2)}
          </>
        ) : (
          grossCost.toFixed(2)
        )}
      </TableCell>
      <TableCell>{(taxRate * 100).toFixed(2)}%</TableCell>
      <TableCell>{netCost.toFixed(2)}</TableCell>
    </TableRow>
  );
};

// Define cost item header here for better maintainability
CostItem.Header = () => {
  return (
    <TableRow>
      <TableCell width="40%">Item Name/Description</TableCell>
      <TableCell>Unit</TableCell>
      <TableCell>Quantity</TableCell>
      <TableCell>Unit Price</TableCell>
      <TableCell>Gross</TableCell>
      <TableCell>Tax(%)</TableCell>
      <TableCell>Net</TableCell>
    </TableRow>
  );
};

export interface CostItemFooterProps {
  subtotal: number;
  discount: number;
  subtotalAddedTax: number;
  total: number;
}

CostItem.Footer = ({
  total,
  discount,
  subtotal,
  subtotalAddedTax,
}: CostItemFooterProps) => {
  const theme = useTheme();
  return (
    <>
      <TableRow>
        <TableCell colSpan={3} sx={{ border: 0 }} />
        <TableCell>Discount:</TableCell>
        <TableCell
          sx={discount < 0 ? { color: theme.palette.success.main } : {}}
        >
          {Math.min(discount, 0).toFixed(2)}
        </TableCell>
        <TableCell colSpan={2} className="striped-bg" />
      </TableRow>
      <TableRow>
        <TableCell colSpan={3} sx={{ border: 0 }} />
        <TableCell>Subtotal</TableCell>
        <TableCell>{subtotal.toFixed(2)}</TableCell>
        <TableCell>Added tax:</TableCell>
        <TableCell>{subtotalAddedTax.toFixed(2)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5} sx={{ border: 0 }}>
          <Typography variant="caption" margin={0}>
            * Discount is applied before taxes, to the items with higher tax
            rate.
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" fontWeight="bold">
            Total:
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" fontWeight="bold">
            {total.toFixed(2)}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CostItem;
