import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Wie kann ich bei euch bestellen?",
      answer: "Du kannst direkt auf unserer Website über die Menü-Seite bestellen, telefonisch unter +49 6441 123456 anrufen oder persönlich bei uns vorbeikommen. Online-Bestellungen können zur Abholung oder für Lieferung aufgegeben werden."
    },
    {
      question: "Bietet ihr Lieferung an?",
      answer: "Ja! Wir liefern im Umkreis von 5 km rund um Wetzlar. Die Lieferzeit beträgt in der Regel 30-45 Minuten. Ab einem Bestellwert von 15€ ist die Lieferung kostenlos, darunter fallen 2,50€ Liefergebühr an."
    },
    {
      question: "Welche Zahlungsmethoden akzeptiert ihr?",
      answer: "Wir akzeptieren Bargeld, EC-Karte, alle gängigen Kreditkarten (Visa, Mastercard) sowie PayPal. Bei Lieferungen kannst du auch online bezahlen oder bar an der Tür zahlen."
    },
    {
      question: "Habt ihr vegetarische oder vegane Optionen?",
      answer: "Ja, wir haben mehrere vegetarische Optionen wie Pommes, Salate und Gemüse-Beilagen. Vegane Optionen können auf Anfrage zubereitet werden. Sprich uns einfach an, wir beraten dich gerne!"
    },
    {
      question: "Kann ich größere Bestellungen für Events aufgeben?",
      answer: "Auf jeden Fall! Wir bieten Catering für Events, Partys und Firmenfeiern an. Kontaktiere uns mindestens 48 Stunden im Voraus unter info@extrawurst-wetzlar.de oder telefonisch, um deine Bestellung zu besprechen."
    },
    {
      question: "Gibt es Parkplätze in der Nähe?",
      answer: "Ja, direkt vor unserem Restaurant auf dem Dillfeld gibt es ausreichend kostenlose Parkplätze. Alternativ ist auch die Anfahrt mit öffentlichen Verkehrsmitteln gut möglich."
    },
    {
      question: "Kann ich meine Bestellung stornieren oder ändern?",
      answer: "Änderungen oder Stornierungen sind möglich, solange wir mit der Zubereitung noch nicht begonnen haben. Bitte rufe uns so schnell wie möglich an (+49 6441 123456), wenn du deine Bestellung ändern möchtest."
    },
    {
      question: "Habt ihr Allergiker-Informationen?",
      answer: "Ja, alle unsere Gerichte sind mit Allergen-Informationen gekennzeichnet. Bei speziellen Allergien oder Unverträglichkeiten sprich uns bitte direkt an – wir helfen dir gerne bei der Auswahl."
    },
    {
      question: "Gibt es Rabatte oder Treueprogramme?",
      answer: "Wir haben regelmäßig wechselnde Aktionen und Deals, die du auf unserer Aktionen-Seite findest. Folge uns auf Instagram und Facebook für exklusive Angebote und Neuigkeiten!"
    },
    {
      question: "Kann ich bei euch auch drinnen essen?",
      answer: "Wir haben einige Sitzplätze im Innenbereich sowie eine gemütliche Außenterrasse. An schönen Tagen kannst du deine Currywurst in entspannter Atmosphäre bei uns genießen."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full font-black text-sm mb-4">
              <HelpCircle className="w-4 h-4 inline mr-2" />
              HILFE & SUPPORT
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Häufig gestellte Fragen
            </h1>
            <p className="text-xl text-white/90">
              Hier findest du Antworten auf die häufigsten Fragen
            </p>
          </motion.div>
        </div>
      </div>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-black text-gray-900 pr-8">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-red-600 flex-shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-8 text-center text-white"
          >
            <h3 className="text-2xl font-black mb-2">
              Deine Frage war nicht dabei?
            </h3>
            <p className="text-white/90 mb-6">
              Kein Problem! Kontaktiere uns direkt und wir helfen dir gerne weiter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+496441123456">
                <button className="bg-white text-red-600 hover:bg-gray-100 font-black px-6 py-3 rounded-xl transition-all">
                  📞 +49 6441 123456
                </button>
              </a>
              <a href="mailto:info@extrawurst-wetzlar.de">
                <button className="bg-white text-red-600 hover:bg-gray-100 font-black px-6 py-3 rounded-xl transition-all">
                  ✉️ E-Mail schreiben
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
