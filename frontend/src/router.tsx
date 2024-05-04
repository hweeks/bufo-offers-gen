import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { GridBase } from "./pages/grid-base";
import { Home } from "./pages/home";

const RouterView = () => {
  const searchParams = new URLSearchParams(window.location.search).toString();
  return (
    <Route path={"/"} element={<GridBase />}>
      <Route path={"/"} element={<Home />} />
    </Route>
  );
};

export const router = createBrowserRouter(createRoutesFromElements(RouterView()));
