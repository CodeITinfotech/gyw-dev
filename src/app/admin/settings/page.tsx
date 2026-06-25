"use client";

import { useState, useEffect } from "react";
import { 
  Save, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  DollarSign,
  Percent
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Settings {
  companyName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  taxRate: number;
  currency: string;
  bookingAdvanceDays: number;
  cancellationPolicy: {
    fullRefundDays: number;
    partialRefundPercent: number;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    companyName: "Goa Yacht World",
    tagline: "Experience Luxury on the Arabian Sea",
    description: "Premium yacht rentals in Goa for parties, celebrations & corporate events",
    email: "contact@goayachtworld.com",
    phone: "+91 84462 75985",
    whatsapp: "+91 84462 75985",
    address: "Vasco da Gama, Goa 403802, India",
    workingHours: "8:00 AM - 8:00 PM",
    socialLinks: {
      facebook: "https://facebook.com/goayachtworld",
      instagram: "https://instagram.com/goayachtworld",
    },
    taxRate: 18,
    currency: "INR",
    bookingAdvanceDays: 1,
    cancellationPolicy: {
      fullRefundDays: 7,
      partialRefundPercent: 50,
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "contact" | "social" | "booking">("general");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Load settings - replace with actual API call
      setLoading(false);
    } catch (error) {
      console.error("Failed to load settings:", error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save settings - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (path: string, value: any) => {
    setSettings((prev) => {
      const keys = path.split(".");
      const newSettings = { ...prev };
      let current: any = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return newSettings;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={cn(
            "px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2",
            saved
              ? "bg-green-500 text-white"
              : "bg-primary hover:bg-primary/90 text-white",
            saving && "opacity-50 cursor-not-allowed"
          )}
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Saving...
            </>
          ) : saved ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {[
            { id: "general", label: "General", icon: Globe },
            { id: "contact", label: "Contact", icon: Phone },
            { id: "social", label: "Social Media", icon: Facebook },
            { id: "booking", label: "Booking & Tax", icon: DollarSign },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-4 border-b-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* General Settings */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">General Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => handleInputChange("tagline", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={settings.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <ImageIcon className="w-4 h-4 inline mr-1" />
                    Logo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/logo.png"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Website URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://goayachtworld.com"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Settings */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={settings.whatsapp}
                    onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Working Hours
                  </label>
                  <input
                    type="text"
                    value={settings.workingHours}
                    onChange={(e) => handleInputChange("workingHours", e.target.value)}
                    placeholder="9:00 AM - 6:00 PM"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Address
                  </label>
                  <textarea
                    value={settings.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social Media Settings */}
        {activeTab === "social" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media Links</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Facebook className="w-4 h-4 text-blue-600" />
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={settings.socialLinks.facebook || ""}
                    onChange={(e) => handleInputChange("socialLinks.facebook", e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Instagram className="w-4 h-4 text-pink-600" />
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={settings.socialLinks.instagram || ""}
                    onChange={(e) => handleInputChange("socialLinks.instagram", e.target.value)}
                    placeholder="https://instagram.com/yourprofile"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Twitter className="w-4 h-4 text-blue-400" />
                    Twitter / X
                  </label>
                  <input
                    type="url"
                    value={settings.socialLinks.twitter || ""}
                    onChange={(e) => handleInputChange("socialLinks.twitter", e.target.value)}
                    placeholder="https://twitter.com/yourprofile"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Youtube className="w-4 h-4 text-red-600" />
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={settings.socialLinks.youtube || ""}
                    onChange={(e) => handleInputChange("socialLinks.youtube", e.target.value)}
                    placeholder="https://youtube.com/yourchannel"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking & Tax Settings */}
        {activeTab === "booking" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Tax</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Percent className="w-4 h-4 inline mr-1" />
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => handleInputChange("taxRate", parseFloat(e.target.value))}
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">GST rate applied to bookings</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Currency
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) => handleInputChange("currency", e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  >
                    <option value="INR">Indian Rupee (INR)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Rules</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Advance Booking (Days)
                  </label>
                  <input
                    type="number"
                    value={settings.bookingAdvanceDays}
                    onChange={(e) => handleInputChange("bookingAdvanceDays", parseInt(e.target.value))}
                    min="0"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">Days in advance required to book</p>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Cancellation Policy</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Refund (Days Before)
                  </label>
                  <input
                    type="number"
                    value={settings.cancellationPolicy.fullRefundDays}
                    onChange={(e) => handleInputChange("cancellationPolicy.fullRefundDays", parseInt(e.target.value))}
                    min="0"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">Full refund if cancelled X days before</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partial Refund (%)
                  </label>
                  <input
                    type="number"
                    value={settings.cancellationPolicy.partialRefundPercent}
                    onChange={(e) => handleInputChange("cancellationPolicy.partialRefundPercent", parseInt(e.target.value))}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">Partial refund percentage for late cancellations</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
