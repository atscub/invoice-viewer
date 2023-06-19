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
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { initFromModel, selectInvoice } from "./redux/invoiceSlice";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_INVOICE_QUERY } from "./api/invoice";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EC5B47",
    },
  },
});

function App() {
  const invoice = useAppSelector(selectInvoice);
  const dispatch = useAppDispatch();

  const { data: { invoice: invoiceData } = {}, error } = useQuery(
    GET_INVOICE_QUERY,
    {
      variables: { id: "1" },
    }
  );

  useEffect(() => {
    if (invoiceData) {
      setTimeout(() => {
        dispatch(initFromModel(invoiceData));
      }, 500);
    }
  }, [invoiceData]);

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
        ) : error ? (
          <Typography variant="h6" component="div">
            Error loading invoice
          </Typography>
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
