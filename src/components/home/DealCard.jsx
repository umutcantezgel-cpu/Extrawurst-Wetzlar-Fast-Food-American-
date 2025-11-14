import React from "react";
import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

export default function DealCard({ deal, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      {deal.discount_text && (
        <div className="absolute top-4 right-4 z-10 bg-red-600 text-white px-4 py-2 rounded-full font-black text-lg shadow-lg transform group-hover:scale-110 transition-transform">
          {deal.discount_text}
        </div>
      )}

      <div className="aspect-video overflow-hidden">
        <img
          src={deal.image_url || "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80"}
          alt={deal.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
          {deal.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {deal.description}
        </p>

        {(deal.valid_from || deal.valid_until) && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            {deal.valid_from && deal.valid_until ? (
              <span>
                Gültig bis {format(new Date(deal.valid_until), "d. MMM yyyy", { locale: de })}
              </span>
            ) : deal.valid_until ? (
              <span>
                Bis {format(new Date(deal.valid_until), "d. MMM yyyy", { locale: de })}
              </span>
            ) : null}
          </div>
        )}
      </div>
    </motion.div>
  );
}
