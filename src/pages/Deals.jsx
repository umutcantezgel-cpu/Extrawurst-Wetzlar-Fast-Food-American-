import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Flame, Calendar, Tag } from "lucide-react";
import { format, isAfter, isBefore } from "date-fns";
import { de } from "date-fns/locale";

export default function Deals() {
  const { data: deals = [], isLoading } = useQuery({
    queryKey: ["deals"],
    queryFn: () => base44.entities.Deal.filter({ is_active: true }),
    initialData: [],
  });

  const now = new Date();
  const activeDeals = deals.filter(deal => {
    if (deal.valid_from && isBefore(now, new Date(deal.valid_from))) return false;
    if (deal.valid_until && isAfter(now, new Date(deal.valid_until))) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full font-black text-sm mb-4">
              <Flame className="w-4 h-4 inline mr-2" />
              HOT DEALS
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Aktuelle Aktionen
            </h1>
            <p className="text-xl text-white/90">
              Spare bares Geld mit unseren laufenden Angeboten!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        ) : activeDeals.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Keine aktiven Aktionen
            </h3>
            <p className="text-gray-600">
              Schau bald wieder vorbei – wir haben regelmäßig neue Angebote!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {deal.discount_text && (
                  <div className="absolute top-4 right-4 z-10 bg-red-600 text-white px-4 py-2 rounded-full font-black text-lg shadow-lg transform group-hover:scale-110 transition-transform">
                    {deal.discount_text}
                  </div>
                )}

                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={deal.image_url || "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80"}
                    alt={deal.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {deal.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {deal.description}
                  </p>

                  {(deal.valid_from || deal.valid_until) && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Calendar className="w-4 h-4" />
                      {deal.valid_from && deal.valid_until ? (
                        <span>
                          {format(new Date(deal.valid_from), "d. MMM", { locale: de })} - {format(new Date(deal.valid_until), "d. MMM yyyy", { locale: de })}
                        </span>
                      ) : deal.valid_until ? (
                        <span>
                          Gültig bis {format(new Date(deal.valid_until), "d. MMM yyyy", { locale: de })}
                        </span>
                      ) : null}
                    </div>
                  )}

                  {deal.terms && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        <span className="font-semibold">Bedingungen:</span> {deal.terms}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
