import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "components/loading/Loading";

const AppRoutes = lazy(() => import("./routes/AppRoutes"));
const AdminRoutes = lazy(() => import("routes/AdminRoutes"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading/>} >
        <ToastContainer />
        <AppRoutes />
        <AdminRoutes/>
      </Suspense>
    </Router>
  );
}

export default App;
