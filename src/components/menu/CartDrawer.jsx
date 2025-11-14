import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Minus, Plus, ShoppingCart, Trash2, CheckCircle } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";

export default function CartDrawer({ cart, isOpen, onClose, onUpdateQuantity }) {
  const [step, setStep] = useState("cart"); // cart, checkout, success
  const [orderData, setOrderData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    order_type: "pickup",
    delivery_address: "",
    notes: ""
  });

  const createOrderMutation = useMutation({
    mutationFn: async (data) => {
      const orderNumber = `EW${Date.now().toString().slice(-8)}`;
      return await base44.entities.Order.create({
        ...data,
        order_number: orderNumber,
        status: "pending"
      });
    },
    onSuccess: () => {
      setStep("success");
    }
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setStep("checkout");
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    createOrderMutation.mutate({
      ...orderData,
      items: cart.map(item => ({
        menu_item_id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total_amount: cartTotal
    });
  };

  const handleClose = () => {
    setStep("cart");
    setOrderData({
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      order_type: "pickup",
      delivery_address: "",
      notes: ""
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6" />
                <h2 className="text-2xl font-black">
                  {step === "cart" && "Dein Warenkorb"}
                  {step === "checkout" && "Bestellung abschließen"}
                  {step === "success" && "Bestellung erfolgreich"}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              {step === "cart" && (
                <>
                  {cart.length === 0 ? (
                    <div className="text-center py-20">
                      <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">Dein Warenkorb ist leer</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 bg-gray-50 rounded-xl p-4">
                          <img
                            src={item.image_url || "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&q=80"}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-red-600 font-black text-lg">{item.price.toFixed(2)}€</p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                              >
                                {item.quantity === 1 ? <Trash2 className="w-4 h-4 text-red-600" /> : <Minus className="w-4 h-4" />}
                              </button>
                              <span className="font-bold text-gray-900 w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {step === "checkout" && (
                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  <div>
                    <Label>Name *</Label>
                    <Input
                      required
                      value={orderData.customer_name}
                      onChange={(e) => setOrderData({...orderData, customer_name: e.target.value})}
                      placeholder="Dein Name"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>E-Mail *</Label>
                    <Input
                      required
                      type="email"
                      value={orderData.customer_email}
                      onChange={(e) => setOrderData({...orderData, customer_email: e.target.value})}
                      placeholder="deine@email.de"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Telefon *</Label>
                    <Input
                      required
                      type="tel"
                      value={orderData.customer_phone}
                      onChange={(e) => setOrderData({...orderData, customer_phone: e.target.value})}
                      placeholder="+49 123 456789"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Bestellart *</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => setOrderData({...orderData, order_type: "pickup"})}
                        className={`p-4 rounded-xl font-bold border-2 transition-all ${
                          orderData.order_type === "pickup"
                            ? "bg-red-50 border-red-600 text-red-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        🏃 Abholung
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderData({...orderData, order_type: "delivery"})}
                        className={`p-4 rounded-xl font-bold border-2 transition-all ${
                          orderData.order_type === "delivery"
                            ? "bg-red-50 border-red-600 text-red-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        🚗 Lieferung
                      </button>
                    </div>
                  </div>

                  {orderData.order_type === "delivery" && (
                    <div>
                      <Label>Lieferadresse *</Label>
                      <Textarea
                        required
                        value={orderData.delivery_address}
                        onChange={(e) => setOrderData({...orderData, delivery_address: e.target.value})}
                        placeholder="Straße, Hausnummer, PLZ, Stadt"
                        className="mt-2"
                      />
                    </div>
                  )}

                  <div>
                    <Label>Anmerkungen</Label>
                    <Textarea
                      value={orderData.notes}
                      onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                      placeholder="Besondere Wünsche..."
                      className="mt-2"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={createOrderMutation.isPending}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-black py-6"
                  >
                    {createOrderMutation.isPending ? "Wird gesendet..." : "Jetzt bestellen"}
                  </Button>
                </form>
              )}

              {step === "success" && (
                <div className="text-center py-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">
                    Bestellung erfolgreich!
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Wir haben deine Bestellung erhalten und bereiten sie bereits vor.
                    Du erhältst in Kürze eine Bestätigungs-E-Mail.
                  </p>
                  <Button
                    onClick={handleClose}
                    className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-black"
                  >
                    Fertig
                  </Button>
                </div>
              )}
            </div>

            {/* Footer */}
            {step === "cart" && cart.length > 0 && (
              <div className="border-t p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-gray-900">Gesamt:</span>
                  <span className="text-3xl font-black text-red-600">
                    {cartTotal.toFixed(2)}€
                  </span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-black py-6 text-lg"
                >
                  Zur Kasse
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
