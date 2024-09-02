import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from "./App.tsx";

import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { StoreProvider } from "./store/index.tsx";

const theme = createTheme({
   palette: {
      mode: "dark",
   },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <StoreProvider>
            <App />
         </StoreProvider>
      </ThemeProvider>
   </React.StrictMode>
);