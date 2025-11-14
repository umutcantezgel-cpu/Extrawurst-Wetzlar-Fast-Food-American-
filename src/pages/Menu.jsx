import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Flame, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import MenuItemCard from "../components/menu/MenuItemCard";
import CartDrawer from "../components/menu/CartDrawer";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ["menu-items"],
    queryFn: () => base44.entities.MenuItem.filter({ is_available: true }),
    initialData: [],
  });

  const categories = [
    { id: "all", name: "Alle", icon: "🍽️" },
    { id: "wurst", name: "Currywurst", icon: "🌭" },
    { id: "schnitzel", name: "Schnitzel", icon: "🍖" },
    { id: "pommes", name: "Pommes", icon: "🍟" },
    { id: "beilagen", name: "Beilagen", icon: "🥗" },
    { id: "getränke", name: "Getränke", icon: "🥤" },
    { id: "desserts", name: "Desserts", icon: "🍰" },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCart((prev) => prev.filter((i) => i.id !== itemId));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Unsere Speisekarte
            </h1>
            <p className="text-xl text-white/90">
              Frisch zubereitet, immer lecker – wähle deine Lieblingsgerichte!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Search & Categories */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Suche nach Gerichten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-red-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Keine Gerichte gefunden
            </h3>
            <p className="text-gray-600">
              Versuche eine andere Kategorie oder Suche
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAddToCart={addToCart}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Button
            onClick={() => setCartOpen(true)}
            className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-black px-6 py-6 rounded-full shadow-2xl text-lg transform hover:scale-110 transition-all"
          >
            <ShoppingCart className="w-6 h-6 mr-2" />
            {cartCount} {cartCount === 1 ? "Artikel" : "Artikel"}
            <span className="ml-3 text-yellow-300">
              {cartTotal.toFixed(2)}€
            </span>
          </Button>
        </motion.div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}
