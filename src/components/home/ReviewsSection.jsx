import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function ReviewsSection() {
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews-featured"],
    queryFn: () => base44.entities.Review.filter({ is_featured: true, approved: true }),
    initialData: [],
  });

  if (reviews.length === 0) return null;

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
            KUNDENSTIMMEN
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Was unsere Gäste sagen
          </h2>
          <p className="text-xl text-gray-600">
            Authentische Bewertungen von echten Currywurst-Fans
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            >
              <Quote className="w-10 h-10 text-red-200 mb-4" />

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed italic">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center text-white font-black">
                  {review.customer_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{review.customer_name}</div>
                  <div className="text-sm text-gray-500">Gast</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
