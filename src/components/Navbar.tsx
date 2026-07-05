import React, { useState } from 'react';
import { Search, Menu, X, Settings } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  searchQuery,
  setSearchQuery,
  isAdminMode,
  setIsAdminMode,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Creative Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsAdminMode(false);
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    setCurrentTab('home');
    setIsAdminMode(false);
    setMobileMenuOpen(false);
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <button
              id="brand-logo-btn"
              onClick={handleLogoClick}
              className="flex items-center gap-1.5 text-xl font-black tracking-tighter bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer transition-all hover:bg-indigo-700"
            >
              <span>ADR</span>
              <span className="font-light opacity-80">STUDIO</span>
            </button>

            {/* Desktop Navigation */}
            <nav id="desktop-nav" className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-1 py-2 text-sm font-medium transition-all cursor-pointer relative ${
                    currentTab === link.id && !isAdminMode
                      ? 'text-indigo-600'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                  {currentTab === link.id && !isAdminMode && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full animate-fade-in" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search Box */}
            <div className="relative w-48 lg:w-64">
              <input
                id="desktop-search-input"
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentTab !== 'services') {
                    setCurrentTab('services');
                    setIsAdminMode(false);
                  }
                }}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-full pl-9 pr-3 py-1.5 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
              />
              <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-400" />
            </div>

            {/* Admin Dashboard Toggle */}
            <button
              id="admin-dashboard-toggle-btn"
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                setMobileMenuOpen(false);
              }}
              className={`p-2 rounded-full hover:bg-slate-50 transition-colors relative group cursor-pointer ${
                isAdminMode ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'
              }`}
              title="Merchant Area Dashboard"
            >
              <Settings className="w-5.5 h-5.5" />
              {isAdminMode && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white"></span>}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-sm transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-drawer" className="md:hidden border-t border-slate-100 bg-white py-3 px-4 shadow-inner space-y-4 animate-fade-in">
          {/* Search */}
          <div className="relative">
            <input
              id="mobile-search-input"
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentTab !== 'services') {
                  setCurrentTab('services');
                  setIsAdminMode(false);
                }
              }}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-full pl-9 pr-3 py-2 text-slate-800"
            />
            <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-400" />
          </div>

          {/* Nav Links */}
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                  currentTab === link.id && !isAdminMode
                    ? 'text-indigo-600 bg-indigo-50/70'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
            <button
              id="mobile-admin-btn"
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full ${
                isAdminMode ? 'text-indigo-600 bg-indigo-50' : 'text-slate-700 hover:text-indigo-600'
              }`}
            >
              <Settings className="w-5 h-5 text-slate-400" />
              <span>Merchant Mode</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
