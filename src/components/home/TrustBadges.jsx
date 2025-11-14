import React from "react";
import { Award, Clock, Heart, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustBadges() {
  const badges = [
    {
      icon: Award,
      title: "Prämierte Qualität",
      description: "Ausgezeichnete Zutaten"
    },
    {
      icon: Clock,
      title: "Schnelle Zubereitung",
      description: "In unter 10 Minuten"
    },
    {
      icon: Heart,
      title: "Mit Liebe gemacht",
      description: "Seit über 10 Jahren"
    },
    {
      icon: Shield,
      title: "Hygiene-zertifiziert",
      description: "Top Sauberkeit"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl mb-4 transform hover:scale-110 transition-transform">
                <badge.icon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-black text-gray-900 mb-1">
                {badge.title}
              </h3>
              <p className="text-sm text-gray-600">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
