import { useState } from "react";
import { SearchPage } from "./components/SearchPage";
import { SearchResults } from "./components/SearchResults";
import { ModelDetails } from "./components/ModelDetails";
import { PrintRequest } from "./components/PrintRequest";
import { LoginPage } from "./components/LoginPage";
import { UserProfile } from "./components/UserProfile";
import { AdminDashboard } from "./components/AdminDashboard";
import { BackgroundImage } from "./components/BackgroundImage";

export type Page =
  | "login"
  | "search"
  | "results"
  | "details"
  | "request"
  | "profile"
  | "admin";

export interface Model3D {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  rating: number;
  downloads: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [selectedModel, setSelectedModel] =
    useState<Model3D | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (asAdmin = false) => {
    setIsLoggedIn(true);
    setIsAdmin(asAdmin);
    setCurrentPage(asAdmin ? "admin" : "search");
  };

  const handleSearch = () => {
    setCurrentPage("results");
  };

  const handleSelectModel = (model: Model3D) => {
    setSelectedModel(model);
    setCurrentPage("details");
  };

  const handleRequestPrint = () => {
    setCurrentPage("request");
  };

  const handleBackToSearch = () => {
    setCurrentPage("search");
  };

  const handleBackToResults = () => {
    setCurrentPage("results");
  };

  const handleGoToProfile = () => {
    setCurrentPage("profile");
  };

  const handleGoToAdmin = () => {
    setCurrentPage("admin");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentPage("login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative transition-colors">
      <BackgroundImage />
      <div className="relative z-10">
        {currentPage === "login" && (
          <LoginPage onLogin={handleLogin} />
        )}
        {currentPage === "search" && (
          <SearchPage
            onSearch={handleSearch}
            onLogout={handleLogout}
            onGoToProfile={handleGoToProfile}
            onGoToAdmin={isAdmin ? handleGoToAdmin : undefined}
          />
        )}
        {currentPage === "results" && (
          <SearchResults
            onSelectModel={handleSelectModel}
            onBack={handleBackToSearch}
            onLogout={handleLogout}
            onGoToProfile={handleGoToProfile}
            onGoToAdmin={isAdmin ? handleGoToAdmin : undefined}
          />
        )}
        {currentPage === "details" && selectedModel && (
          <ModelDetails
            model={selectedModel}
            onRequestPrint={handleRequestPrint}
            onBack={handleBackToResults}
            onLogout={handleLogout}
            onGoToProfile={handleGoToProfile}
            onGoToAdmin={isAdmin ? handleGoToAdmin : undefined}
          />
        )}
        {currentPage === "request" && selectedModel && (
          <PrintRequest
            model={selectedModel}
            onBack={handleBackToSearch}
            onLogout={handleLogout}
            onGoToProfile={handleGoToProfile}
            onGoToAdmin={isAdmin ? handleGoToAdmin : undefined}
          />
        )}
        {currentPage === "profile" && (
          <UserProfile
            onBack={handleBackToSearch}
            onLogout={handleLogout}
          />
        )}
        {currentPage === "admin" && (
          <AdminDashboard
            onBack={handleBackToSearch}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
}