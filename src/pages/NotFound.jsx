import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block"
          >
            <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
              404
            </div>
          </motion.div>
          <div className="text-6xl my-6">🌭</div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          Diese Seite wurde nicht gefunden
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Ups! Die Seite, die du suchst, existiert nicht oder wurde verschoben.
          Vielleicht ist sie ja in unserer Curry-Sauce gelandet? 😅
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={createPageUrl("Home")}>
            <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-black px-8 py-6 text-lg w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Zur Startseite
            </Button>
          </Link>
          <Link to={createPageUrl("Menu")}>
            <Button variant="outline" className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-black px-8 py-6 text-lg w-full sm:w-auto">
              <Search className="w-5 h-5 mr-2" />
              Zur Speisekarte
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            Oder gehe zurück zur vorherigen Seite:
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 text-red-600 hover:text-red-700 font-bold flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </button>
        </div>
      </motion.div>
    </div>
  );
}
