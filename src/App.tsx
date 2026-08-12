import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AreaPage from "./pages/AreaPage";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/work/:areaSlug" element={<AreaPage />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
