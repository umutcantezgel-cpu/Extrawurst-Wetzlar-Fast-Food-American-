import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Flame, Award, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DealCard from "../components/home/DealCard";
import PopularMenuItems from "../components/home/PopularMenuItems";
import ReviewsSection from "../components/home/ReviewsSection";
import TrustBadges from "../components/home/TrustBadges";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: deals = [] } = useQuery({
    queryKey: ["deals-featured"],
    queryFn: () => base44.entities.Deal.filter({ is_featured: true, is_active: true }),
    initialData: [],
  });

  const heroSlides = [
    {
      title: "DIE BESTE CURRYWURST",
      subtitle: "In ganz Wetzlar!",
      description: "Saftige Wurst, hausgemachte Curry-Sauce, knusprige Pommes – einfach legendär.",
      cta: "Jetzt bestellen",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=1200&q=80",
      color: "from-red-600 to-orange-500"
    },
    {
      title: "SCHNITZEL XXL",
      subtitle: "Größer geht's nicht!",
      description: "Handpaniert, butterweich, mit goldener Panade – ein Traum für jeden Fleischliebhaber.",
      cta: "Zum Menü",
      image: "https://images.unsplash.com/photo-1558030089-4729e972af5b?w=1200&q=80",
      color: "from-yellow-500 to-orange-600"
    },
    {
      title: "FRISCHE POMMES",
      subtitle: "Handgeschnitten & knusprig",
      description: "Direkt aus der Fritteuse auf deinen Teller – so müssen Pommes schmecken!",
      cta: "Entdecken",
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1200&q=80",
      color: "from-orange-500 to-red-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="max-w-2xl"
                >
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${heroSlides[currentSlide].color} text-white font-black text-sm mb-4`}>
                    <Flame className="w-4 h-4 inline mr-2" />
                    {heroSlides[currentSlide].subtitle}
                  </div>

                  <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-none">
                    {heroSlides[currentSlide].title}
                  </h1>

                  <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                    {heroSlides[currentSlide].description}
                  </p>

                  <Link to={createPageUrl("Menu")}>
                    <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-black px-8 py-6 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300">
                      {heroSlides[currentSlide].cta}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Popular Items */}
      <PopularMenuItems />

      {/* Active Deals */}
      {deals.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-block px-4 py-2 bg-red-100 rounded-full text-red-600 font-black text-sm mb-4">
                <Flame className="w-4 h-4 inline mr-2" />
                HOT DEALS
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Aktuelle Aktionen
              </h2>
              <p className="text-xl text-gray-600">
                Verpasse nicht unsere heißesten Angebote!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.slice(0, 3).map((deal, index) => (
                <DealCard key={deal.id} deal={deal} index={index} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to={createPageUrl("Deals")}>
                <Button variant="outline" className="font-bold border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-6">
                  Alle Aktionen anzeigen
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <ReviewsSection />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Hunger bekommen?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Bestelle jetzt online oder hole direkt bei uns ab. Deine Currywurst wartet schon!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Menu")}>
                <Button className="bg-white text-red-600 hover:bg-gray-100 font-black px-8 py-6 text-lg shadow-xl transform hover:scale-105 transition-all duration-300">
                  Jetzt bestellen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl("Contact")}>
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-black px-8 py-6 text-lg">
                  Kontakt aufnehmen
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
