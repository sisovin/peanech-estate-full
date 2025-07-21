import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./components/home";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {/* {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)} */}   
        </MainLayout>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
