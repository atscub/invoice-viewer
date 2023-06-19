import {
  AppBar,
  Container,
  Divider,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import "./App.css";
import rodeoFullLogo from "./assets/rodeo-full-logo.svg";
import InvoiceViewer from "./components/InvoiceViewer";
import { InvoiceModel, TaxRates } from "./models";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { initFromModel, selectInvoice } from "./redux/invoiceSlice";
import { useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EC5B47",
    },
  },
});

const invoiceData: InvoiceModel = {
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
};

function App() {
  const invoice = useAppSelector(selectInvoice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      dispatch(initFromModel(invoiceData));
    }, 500);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" enableColorOnDark>
        <Toolbar sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <img src={rodeoFullLogo} loading="lazy" height="24px" />
          <Divider orientation="vertical" flexItem />
          <Typography variant="h6" component="div">
            Invoice viewer
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingY: 4 }}>
        {invoice !== null ? (
          <InvoiceViewer invoice={invoice} />
        ) : (
          <Typography variant="h6" component="div">
            Loading...
          </Typography>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
