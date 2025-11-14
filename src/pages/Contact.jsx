import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await base44.integrations.Core.SendEmail({
        to: "info@extrawurst-wetzlar.de",
        subject: `Kontaktanfrage: ${formData.subject}`,
        body: `
          Neue Kontaktanfrage von ${formData.name}

          E-Mail: ${formData.email}
          Telefon: ${formData.phone}
          Betreff: ${formData.subject}

          Nachricht:
          ${formData.message}
        `
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      details: ["Dillfeld 21", "35576 Wetzlar"],
      link: null
    },
    {
      icon: Phone,
      title: "Telefon",
      details: ["+49 6441 123456"],
      link: "tel:+496441123456"
    },
    {
      icon: Mail,
      title: "E-Mail",
      details: ["info@extrawurst-wetzlar.de"],
      link: "mailto:info@extrawurst-wetzlar.de"
    },
    {
      icon: Clock,
      title: "Öffnungszeiten",
      details: [
        "Mo-Fr: 11:00 - 22:00",
        "Sa: 12:00 - 23:00",
        "So: 12:00 - 21:00"
      ],
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Kontakt
            </h1>
            <p className="text-xl text-white/90">
              Wir freuen uns auf deine Nachricht!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-black text-gray-900 mb-8">
                So erreichst du uns
              </h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, i) => (
                          info.link ? (
                            <a
                              key={i}
                              href={info.link}
                              className="block text-gray-600 hover:text-red-600 transition-colors"
                            >
                              {detail}
                            </a>
                          ) : (
                            <p key={i} className="text-gray-600">
                              {detail}
                            </p>
                          )
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2538.5!2d8.5!3d50.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDMzJzAwLjAiTiA4wrAzMCcwMC4wIkU!5e0!3m2!1sde!2sde!4v1234567890!5m2!1sde!2sde"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-black text-gray-900 mb-6">
                Schreib uns eine Nachricht
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">
                    Nachricht gesendet!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Vielen Dank für deine Nachricht. Wir melden uns so schnell wie möglich bei dir!
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold"
                  >
                    Weitere Nachricht senden
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label>Name *</Label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Dein Name"
                      className="mt-2"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>E-Mail *</Label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="deine@email.de"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Telefon</Label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+49 123 456789"
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Betreff *</Label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Worum geht es?"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Nachricht *</Label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Deine Nachricht an uns..."
                      className="mt-2 min-h-[150px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-black py-6 text-lg"
                  >
                    {isSubmitting ? (
                      "Wird gesendet..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Nachricht senden
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
