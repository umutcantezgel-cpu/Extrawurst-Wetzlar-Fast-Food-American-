import React from "react";
import { motion } from "framer-motion";
import { Heart, Award, Users, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Mit Liebe gemacht",
      description: "Jedes Gericht wird mit Leidenschaft und Sorgfalt zubereitet"
    },
    {
      icon: Award,
      title: "Premium Qualität",
      description: "Nur die besten Zutaten kommen auf deinen Teller"
    },
    {
      icon: Users,
      title: "Familiäres Team",
      description: "Unser Team behandelt jeden Gast wie Familie"
    },
    {
      icon: Clock,
      title: "Frisch & Schnell",
      description: "Alle Gerichte werden frisch und schnell für dich zubereitet"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80"
          alt="Restaurant Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                Über Extrawurst Wetzlar
              </h1>
              <p className="text-xl text-white/90 max-w-2xl">
                Deine Currywurst-Oase im Herzen von Wetzlar – authentisch, lecker, legendär
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              Unsere Geschichte
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                Willkommen bei <span className="font-black text-red-600">Extrawurst Wetzlar</span> –
                deinem Anlaufpunkt für die beste Currywurst in der Stadt! Seit über 10 Jahren servieren
                wir authentische deutsche Fast-Food-Klassiker mit einer modernen Twist.
              </p>
              <p>
                Was als kleine Imbissbude begann, hat sich zu einer echten Institution in Wetzlar entwickelt.
                Unsere hausgemachte Curry-Sauce nach Geheimrezept, knusprige handgeschnittene Pommes und
                saftiges Fleisch höchster Qualität machen jeden Besuch zu einem besonderen Erlebnis.
              </p>
              <p>
                Bei uns steht der Geschmack an erster Stelle. Wir verwenden ausschließlich frische Zutaten
                von regionalen Lieferanten und bereiten jedes Gericht mit Liebe zu. Ob klassische Currywurst,
                XXL-Schnitzel oder knusprige Pommes – bei uns bekommst du immer die beste Qualität zum fairen Preis.
              </p>
              <p>
                Komm vorbei und überzeuge dich selbst! Unser Team freut sich darauf, dich mit
                leckerem Essen und einer herzlichen Atmosphäre zu verwöhnen.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Unsere Werte
            </h2>
            <p className="text-xl text-gray-600">
              Was uns besonders macht
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl mb-4">
                  <value.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Besuche uns vor Ort!
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      Dillfeld 21<br />
                      35576 Wetzlar
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-1">Öffnungszeiten</h3>
                    <div className="text-gray-600 space-y-1">
                      <div className="flex justify-between gap-8">
                        <span>Mo - Fr:</span>
                        <span className="font-bold text-gray-900">11:00 - 22:00</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Samstag:</span>
                        <span className="font-bold text-gray-900">12:00 - 23:00</span>
                      </div>
                      <div className="flex justify-between gap-8">
                        <span>Sonntag:</span>
                        <span className="font-bold text-gray-900">12:00 - 21:00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 mb-1">Kontakt</h3>
                    <p className="text-gray-600">
                      +49 6441 123456<br />
                      info@extrawurst-wetzlar.de
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link to={createPageUrl("Contact")}>
                  <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-black px-8 py-6 text-lg">
                    Kontakt aufnehmen
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2538.5!2d8.5!3d50.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDMzJzAwLjAiTiA4wrAzMCcwMC4wIkU!5e0!3m2!1sde!2sde!4v1234567890!5m2!1sde!2sde"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
