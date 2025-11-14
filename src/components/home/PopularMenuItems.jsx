import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function PopularMenuItems() {
  const { data: menuItems = [] } = useQuery({
    queryKey: ["menu-popular"],
    queryFn: () => base44.entities.MenuItem.filter({ is_popular: true, is_available: true }),
    initialData: [],
  });

  if (menuItems.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 bg-yellow-100 rounded-full text-orange-600 font-black text-sm mb-4">
            <Star className="w-4 h-4 inline mr-2" />
            BESTSELLER
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Unsere Klassiker
          </h2>
          <p className="text-xl text-gray-600">
            Die beliebtesten Gerichte unserer Gäste
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image_url || "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80"}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {item.spice_level === "hot" && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm">
                    <Flame className="w-4 h-4" />
                    Scharf
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-red-600">
                    {item.price.toFixed(2)}€
                  </span>
                  <Link to={createPageUrl("Menu")}>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 font-bold">
                      Bestellen
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to={createPageUrl("Menu")}>
            <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-black px-8 py-6 text-lg">
              Komplette Speisekarte
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
