import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar"; 
import "./styles.css";
import Search from "./Search";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RelatedBooks from "./SearchTable";
import SearchText from "./SearchText";
import SearchResult from "./SearchResult";
import YearTrend from "./YearTrend";
import GenerateImage from "./GenerateImage";
import SharedInputComponent from "./SharedInput";

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/KeywordSearch" element={<RelatedBooks />} />
        <Route path="/TrendSearch" element={<SearchText />} />
        <Route path="/Result" element={<SearchResult />} />
        <Route path="/YearTrend" element={<YearTrend />} />
        <Route path="/GenerateImage" element={<GenerateImage />} />
        <Route path="/SharedInput" element={<SharedInputComponent />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);
