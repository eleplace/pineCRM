import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./Screens/Homescreen";
import CustomersScreen from "./Screens/CustomersScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerDetailsScreen from "./Screens/CustomerDetailsScreen";
import VendorDetailPage from "./Screens/VendorDetailPage";
import VendorBidHistory from "./Screens/VendorBidHistory";
import VendorSubscriptionPage from "./Screens/Vendorsubscriptionpage";
import AddSubscriptionScreen from "./Screens/AddSubscriptionScreen";
import CustomerJobsScreen from "./Screens/Customerjobsscreen";
import JobBidsScreen from "./Screens/Jobbidsscreen";
import JobsScreen from "./Screens/AllJobs";
import AllBidsScreen from "./Screens/AllBidsScreen";
import AnalyticsScreen from "./Screens/AnalyticsScreen";
import { ThemeProvider } from "./context/ThemeContext";
// import { Route } from "lucide-react";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="bg-[#021616] min-h-screen">
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/customersScreen" element={<CustomersScreen />} />
              <Route path="/AllJobs" element={<JobsScreen />} />
              <Route path="/AllBidsScreen" element={<AllBidsScreen />} />
              <Route path="/add-subscription" element={<AddSubscriptionScreen />} />
              <Route path="/analytics" element={<AnalyticsScreen />} />
              <Route
                path="/customer/:userId"
                element={<CustomerDetailsScreen />}
              />
              <Route path="/Vendor/:userId" element={<VendorDetailPage />} />
              <Route
                path="/vendor-bid-history/:userId"
                element={<VendorBidHistory />}
              />
              <Route
                path="/vendor-subscription/:userId?"
                element={<VendorSubscriptionPage />}
              />
              <Route
                path="/customers/:userId/jobs"
                element={<CustomerJobsScreen />}
              />
              <Route path="/job-bids/:jobId" element={<JobBidsScreen />} />
            </Routes>
          </MainLayout>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
