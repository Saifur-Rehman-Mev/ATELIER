import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"info" | "payment">("info");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phone: "",
  });

  const shipping = totalPrice > 200 ? 0 : 15;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - will be replaced with Stripe when enabled
    toast.info("Payment functionality requires backend setup. Click 'Connect Lovable Cloud' to enable payments.");
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl mb-4">Your cart is empty</h1>
          <Button variant="outline" asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="py-8">
      <div className="container max-w-6xl">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Form */}
          <div>
            <h1 className="font-serif text-3xl mb-8">Checkout</h1>

            {/* Steps */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setStep("info")}
                className={`text-sm uppercase tracking-wider ${
                  step === "info" ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                1. Information
              </button>
              <span className="text-muted-foreground">/</span>
              <span
                className={`text-sm uppercase tracking-wider ${
                  step === "payment" ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                2. Payment
              </span>
            </div>

            {step === "info" ? (
              <form onSubmit={handleContinueToPayment} className="space-y-6">
                <div>
                  <h2 className="font-medium mb-4">Contact Information</h2>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <h2 className="font-medium mb-4">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                        required
                      />
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal code"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                        required
                      />
                    </div>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                      required
                    >
                      <option value="">Select country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone (optional)"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                <Button variant="hero" size="lg" type="submit" className="w-full">
                  Continue to Payment
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div>
                  <h2 className="font-medium mb-4">Payment Details</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card number"
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Name on card"
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                <Button variant="hero" size="lg" type="submit" className="w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  Place Order — ${total.toFixed(2)}
                </Button>

                <Button
                  variant="ghost"
                  type="button"
                  className="w-full"
                  onClick={() => setStep("info")}
                >
                  Back to Information
                </Button>
              </form>
            )}

            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              Your payment information is secure and encrypted
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="bg-card p-8 h-fit sticky top-24">
            <h2 className="font-medium mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                  <div className="w-16 h-20 bg-secondary overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-foreground text-background text-xs flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    {item.selectedSize && (
                      <p className="text-xs text-muted-foreground">Size: {item.selectedSize}</p>
                    )}
                    {item.selectedColor && (
                      <p className="text-xs text-muted-foreground">Color: {item.selectedColor}</p>
                    )}
                  </div>
                  <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium pt-3 border-t border-border">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {totalPrice < 200 && (
              <p className="mt-4 text-sm text-muted-foreground">
                Add ${(200 - totalPrice).toFixed(2)} more for free shipping
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
