import { TableCell, TableRow, Typography } from "@mui/material";
import { CostItemModel } from "../models";

export interface CostItemProps {
  costItem: CostItemModel;
}

const CostItem = ({
  costItem: { name, description, unit, unitPrice, quantity, taxRate },
}: CostItemProps) => {
  const gross = unitPrice * quantity;
  const net = gross * (1 + taxRate);
  return (
    <TableRow>
      <TableCell>
        {name}: {description}
      </TableCell>
      <TableCell>{unit}</TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>{unitPrice}</TableCell>
      <TableCell>{gross.toFixed(2)}</TableCell>
      <TableCell>{(taxRate * 100).toFixed(2)}%</TableCell>
      <TableCell>{net.toFixed(2)}</TableCell>
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
  total: number;
  discount: number;
}

CostItem.Footer = ({ total, discount }: CostItemFooterProps) => {
  return (
    <>
      <TableRow>
        <TableCell colSpan={3} />
        <TableCell>Discount:</TableCell>
        <TableCell>{discount.toFixed(2)}</TableCell>
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
      <TableRow>
        <TableCell colSpan={5}>
          <Typography variant="caption" margin={0}>
            * Discount is applied before taxes, to the items with higher tax
            rate.
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CostItem;
