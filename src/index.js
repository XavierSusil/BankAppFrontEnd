import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { TinyColor } from "@ctrl/tinycolor";
import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

const baseColor = new TinyColor("#008000");
const darkShade = baseColor.darken(10).toString();
const lightShade = baseColor.lighten(10).toString();

const baseColorSecondary = new TinyColor("#ba5e73");
const darkSec = baseColorSecondary.darken(10).toString();
const lightSec = baseColorSecondary.lighten(10).toString();

let baseTheme = createTheme({
  palette: {
    primary: {
      main: baseColor.toString(),
      light: lightShade,
      dark: darkShade,
    },
    secondary: {
      main: baseColorSecondary.toString(),
      light: lightSec,
      dark: darkSec,
    },
    custom: {
      white: "#f0f0f0",
    },
  },
});

let theme = createTheme(baseTheme, {
  palette: {
    background: {
      paper: baseTheme.palette.primary.main,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <SnackbarProvider>
            <ThemeProvider theme={theme}>
              <StyledEngineProvider injectFirst>
                <App />
              </StyledEngineProvider>
            </ThemeProvider>
          </SnackbarProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
