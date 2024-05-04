import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export enum GridRowsAndColumns {
  header = "header",
  mainSection = "main-section",
  featured = "main-featured",
  rowsOfContent = "rows-of-content",
  footer = "footer",
  gutter = "gutter",
  gutterRight = "gutter-right",
  mainColumn = "main-column",
}

const HomeLayout = styled.div<{ rowCount?: number }>`
  display: grid;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  grid-template-rows: [${GridRowsAndColumns.header}] 196px 
    [${GridRowsAndColumns.mainSection}] 1fr 
    [${GridRowsAndColumns.footer}] 1fr;
  grid-template-columns: [${GridRowsAndColumns.gutter}] 7vw [${GridRowsAndColumns.mainColumn}] 86vw [${GridRowsAndColumns.gutterRight}] 7vw;
`;

const LogoHolster = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 40px;
`;

export const GridBase = () => {
  return (
    <HomeLayout>
      <LogoHolster>bufo offers generator</LogoHolster>
      <Outlet />
    </HomeLayout>
  );
};
