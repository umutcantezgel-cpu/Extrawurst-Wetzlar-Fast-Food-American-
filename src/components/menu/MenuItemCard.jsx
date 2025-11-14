import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Flame, Star } from "lucide-react";

export default function MenuItemCard({ item, onAddToCart }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image_url || "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80"}
          alt={item.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {item.is_popular && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm shadow-lg">
            <Star className="w-4 h-4 fill-current" />
            Beliebt
          </div>
        )}

        {item.spice_level === "hot" && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm shadow-lg">
            <Flame className="w-4 h-4" />
            Scharf
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-black text-gray-900 group-hover:text-red-600 transition-colors">
            {item.name}
          </h3>
          <span className="text-2xl font-black text-red-600 ml-2 whitespace-nowrap">
            {item.price.toFixed(2)}€
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {item.allergens && item.allergens.length > 0 && (
          <p className="text-xs text-gray-500 mb-4">
            <span className="font-semibold">Allergene:</span> {item.allergens.join(", ")}
          </p>
        )}

        <Button
          onClick={() => onAddToCart(item)}
          className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-6 transform hover:scale-105 transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          In den Warenkorb
        </Button>
      </div>
    </motion.div>
  );
}
