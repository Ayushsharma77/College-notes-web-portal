import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import NoteDetail from "./pages/NoteDetail";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UploadNote from "./pages/UploadNote";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen text-amber-400">Loading…</div>;
  return user?.role === "admin" ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: "#1a3a5c", color: "#e2e8f0", border: "1px solid #f59e0b33" },
          }}
        />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/"           element={<Home />} />
              <Route path="/browse"     element={<Browse />} />
              <Route path="/notes/:id"  element={<NoteDetail />} />
              <Route path="/login"      element={<Login />} />
              <Route path="/admin"      element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/upload" element={<AdminRoute><UploadNote /></AdminRoute>} />
              <Route path="*"           element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
