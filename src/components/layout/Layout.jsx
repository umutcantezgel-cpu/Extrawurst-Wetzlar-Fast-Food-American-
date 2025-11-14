import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ShoppingCart, Menu as MenuIcon, X, Phone, MapPin, Clock, Facebook, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Start", path: createPageUrl("Home") },
    { name: "Menü", path: createPageUrl("Menu") },
    { name: "Aktionen", path: createPageUrl("Deals") },
    { name: "Über uns", path: createPageUrl("About") },
    { name: "FAQ", path: createPageUrl("FAQ") },
    { name: "Kontakt", path: createPageUrl("Contact") },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        :root {
          --red-primary: #DC2626;
          --yellow-primary: #FCD34D;
          --orange-accent: #F97316;
          --dark-gray: #1F2937;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white/95 backdrop-blur-sm"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl transform group-hover:scale-110 transition-transform duration-300 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-black text-white">E</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-2xl font-black text-gray-900 leading-none tracking-tight">
                  EXTRAWURST
                </div>
                <div className="text-xs font-bold text-red-600 tracking-widest">WETZLAR</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-red-600 text-white"
                      : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Order Button & Mobile Menu */}
            <div className="flex items-center gap-3">
              <Link to={createPageUrl("Menu")}>
                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-black px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">JETZT BESTELLEN</span>
                  <span className="sm:hidden">BESTELLEN</span>
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-900" />
                ) : (
                  <MenuIcon className="w-6 h-6 text-gray-900" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg font-bold text-sm transition-all ${
                      location.pathname === item.path
                        ? "bg-red-600 text-white"
                        : "text-gray-700 hover:bg-red-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-black text-white">E</span>
                </div>
                <div>
                  <div className="text-xl font-black">EXTRAWURST</div>
                  <div className="text-xs font-bold text-yellow-400">WETZLAR</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Deine Currywurst-Oase in Wetzlar. Frisch, lecker, authentisch – seit Tag eins!
              </p>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                Öffnungszeiten
              </h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Mo - Fr:</span>
                  <span className="text-white font-bold">11:00 - 22:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samstag:</span>
                  <span className="text-white font-bold">12:00 - 23:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sonntag:</span>
                  <span className="text-white font-bold">12:00 - 21:00</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-black text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-yellow-400" />
                Kontakt
              </h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div>
                  <div className="font-bold text-white">Adresse</div>
                  <div>Dillfeld 21</div>
                  <div>35576 Wetzlar</div>
                </div>
                <div>
                  <div className="font-bold text-white">Telefon</div>
                  <a href="tel:+496441123456" className="hover:text-yellow-400 transition-colors">
                    +49 6441 123456
                  </a>
                </div>
                <div>
                  <div className="font-bold text-white">E-Mail</div>
                  <a href="mailto:info@extrawurst-wetzlar.de" className="hover:text-yellow-400 transition-colors">
                    info@extrawurst-wetzlar.de
                  </a>
                </div>
              </div>
            </div>

            {/* Social & Links */}
            <div>
              <h3 className="font-black text-lg mb-4">Folge uns</h3>
              <div className="flex gap-3 mb-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="mailto:info@extrawurst-wetzlar.de"
                   className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <div className="space-y-2 text-sm">
                <Link to={createPageUrl("Legal")} className="block text-gray-400 hover:text-yellow-400 transition-colors">
                  Impressum & Datenschutz
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Extrawurst Wetzlar. Alle Rechte vorbehalten. Made with ❤️ in Wetzlar.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
