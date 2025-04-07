import { Toaster as AppToaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Staff from "./pages/Staff";
import Customers from "./pages/Customers";
import CustomerCreate from "./pages/CustomerCreate";
import CustomerEdit from "./pages/CustomerEdit";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import DeliveryBoy from "./pages/DeliveryBoy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        {/* Toast Notifications */}
        <AppToaster />
        <Sonner position="top-center" />
        
        {/* App Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/create" element={<CustomerCreate />} />
          <Route path="/customers/edit/:id" element={<CustomerEdit />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/delivery" element={<DeliveryBoy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

