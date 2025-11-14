import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServiceUnavailable() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-block mb-8"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-16 h-16 text-red-600" />
          </div>
        </motion.div>

        <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 mb-4">
          503
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          Service vorübergehend nicht verfügbar
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Entschuldigung! Unsere Website ist gerade in der Pause.
          Wir arbeiten hart daran, sie so schnell wie möglich wieder online zu bringen.
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="font-black text-gray-900 mb-2">
            Was kannst du in der Zwischenzeit tun?
          </h3>
          <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span>Rufe uns direkt an: <a href="tel:+496441123456" className="text-red-600 font-bold hover:underline">+49 6441 123456</a></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span>Komm persönlich vorbei: Dillfeld 21, Wetzlar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 font-bold">•</span>
              <span>Versuche es in ein paar Minuten erneut</span>
            </li>
          </ul>
        </div>

        <Button
          onClick={handleRefresh}
          className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-black px-8 py-6 text-lg"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Seite neu laden
        </Button>

        <div className="mt-8 text-sm text-gray-500">
          <p>Die Wartungsarbeiten sollten nicht lange dauern.</p>
          <p>Vielen Dank für deine Geduld! 🙏</p>
        </div>
      </motion.div>
    </div>
  );
}
