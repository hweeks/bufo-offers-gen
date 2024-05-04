import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Reset } from "styled-reset";
import { router } from "./router";
import { ThemeProvider } from "styled-components";
import { theme, OurTheme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends OurTheme {}
}

const queryClient = new QueryClient();

const container = document.getElementById("home") as HTMLElement;

const root = createRoot(container);

const WrappedHome = () => {
  const realTitle = "bufo-offers";
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme as any}>
        <Reset />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

window.onload = () => {
  root.render(<WrappedHome />);
};
