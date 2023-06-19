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
  ],
};

function App() {
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
      <Container sx={{ paddingTop: 3 }}>
        <InvoiceViewer invoice={invoiceData} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
