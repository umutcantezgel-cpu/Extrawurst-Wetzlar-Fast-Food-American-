import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, FileText } from "lucide-react";

export default function Legal() {
  const [activeTab, setActiveTab] = useState("impressum");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Rechtliches
            </h1>
            <p className="text-xl text-white/90">
              Impressum & Datenschutzerklärung
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("impressum")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "impressum"
                ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Impressum
          </button>
          <button
            onClick={() => setActiveTab("datenschutz")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "datenschutz"
                ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Shield className="w-4 h-4 inline mr-2" />
            Datenschutz
          </button>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl"
        >
          {activeTab === "impressum" ? (
            <div className="prose max-w-none">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Impressum</h2>

              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">Angaben gemäß § 5 TMG</h3>
                  <p>
                    Extrawurst Wetzlar GmbH<br />
                    Dillfeld 21<br />
                    35576 Wetzlar
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">Vertreten durch</h3>
                  <p>Geschäftsführer: Max Mustermann</p>
                </div>

                <div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">Kontakt</h3>
                  <p>
                    Telefon: +49 6441 123456<br />
                    E-Mail: info@extrawurst-wetzlar.de
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">Registereintrag</h3>
                  <p>
                    Eintragung im Handelsregister<br />
                    Registergericht: Amtsgericht Wetzlar<br />
                    Registernummer: HRB 12345
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">Umsatzsteuer-ID</h3>
                  <p>
                    Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:<br />
                    DE123456789
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">EU-Streitschlichtung</h3>
                  <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
                    <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer"
                       className="text-red-600 hover:text-red-700 font-bold">
                      https://ec.europa.eu/consumers/odr
                    </a>
                  </p>
                  <p className="mt-2">
                    Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet,
                    an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">Haftung für Inhalte</h3>
                  <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                    verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                    zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="prose max-w-none">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Datenschutzerklärung</h2>

              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">1. Datenschutz auf einen Blick</h3>
                  <h4 className="font-bold text-lg text-gray-900 mt-4 mb-2">Allgemeine Hinweise</h4>
                  <p>
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
                    Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
                    denen Sie persönlich identifiziert werden können.
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">2. Datenerfassung auf dieser Website</h3>
                  <h4 className="font-bold text-lg text-gray-900 mt-4 mb-2">Wer ist verantwortlich für die Datenerfassung?</h4>
                  <p>
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                    können Sie dem Impressum dieser Website entnehmen.
                  </p>

                  <h4 className="font-bold text-lg text-gray-900 mt-4 mb-2">Wie erfassen wir Ihre Daten?</h4>
                  <p>
                    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich
                    z.B. um Daten handeln, die Sie in ein Kontaktformular oder Bestellformular eingeben.
                  </p>
                  <p className="mt-2">
                    Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
                    IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder
                    Uhrzeit des Seitenaufrufs).
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">3. Cookies</h3>
                  <p>
                    Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und richten
                    auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung
                    (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">4. Kontaktformular und Bestellungen</h3>
                  <p>
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen oder eine Bestellung aufgeben, werden
                    Ihre Angaben aus dem Anfrageformular bzw. Bestellformular inklusive der von Ihnen dort angegebenen
                    Kontaktdaten zwecks Bearbeitung der Anfrage bzw. Bestellung und für den Fall von Anschlussfragen
                    bei uns gespeichert.
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">5. Ihre Rechte</h3>
                  <p>
                    Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                    gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
                    oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt
                    haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen.
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-xl text-gray-900 mb-2">6. Kontakt</h3>
                  <p>
                    Bei Fragen zum Datenschutz wenden Sie sich bitte an:<br />
                    E-Mail: datenschutz@extrawurst-wetzlar.de<br />
                    Telefon: +49 6441 123456
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
