"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Plus, 
  Trash2,
  Star,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Package,
  CheckCircle,
  XCircle
} from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { getYachtById } from "@/lib/data";
import type { Yacht, YachtImage, TimeSlot, ExtraHour, YachtAddon, YachtAmenity, YachtInclusion, YachtExclusion } from "@/types";

interface YachtFormData {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  capacity: number;
  price: number;
  pricePerHour: number;
  minimumBookingHours: number;
  location: string;
  featured: boolean;
  isActive: boolean;
  enableDateField: boolean;
  enableGuestField: boolean;
  enableTimeSlot: boolean;
  enableExtraHours: boolean;
  enableAddons: boolean;
  images: YachtImage[];
  amenities: YachtAmenity[];
  inclusions: YachtInclusion[];
  exclusions: YachtExclusion[];
  timeSlots: TimeSlot[];
  extraHours: ExtraHour[];
  addons: YachtAddon[];
}

export default function EditYachtPage() {
  const params = useParams();
  const router = useRouter();
  const yachtId = params.id as string;
  const isNew = yachtId === "new";
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState<YachtFormData>({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    capacity: 20,
    price: 25000,
    pricePerHour: 15000,
    minimumBookingHours: 2,
    location: "Goa, India",
    featured: false,
    isActive: true,
    enableDateField: true,
    enableGuestField: true,
    enableTimeSlot: true,
    enableExtraHours: true,
    enableAddons: true,
    images: [],
    amenities: [],
    inclusions: [],
    exclusions: [],
    timeSlots: [],
    extraHours: [],
    addons: [],
  });
  
  const [activeTab, setActiveTab] = useState<"basic" | "pricing" | "media" | "amenities" | "slots" | "extras">("basic");

  useEffect(() => {
    if (!isNew) {
      loadYacht();
    }
  }, [yachtId]);

  const loadYacht = async () => {
    try {
      const existingYacht = await getYachtById(yachtId);
      if (existingYacht) {
        setFormData({
          name: existingYacht.name,
          slug: existingYacht.slug,
          description: existingYacht.description,
          shortDescription: existingYacht.shortDescription || "",
          capacity: existingYacht.capacity,
          price: existingYacht.price,
          pricePerHour: existingYacht.pricePerHour || 15000,
          minimumBookingHours: existingYacht.minimumBookingHours,
          location: existingYacht.location || "Goa, India",
          featured: existingYacht.featured,
          isActive: existingYacht.isActive,
          enableDateField: existingYacht.enableDateField,
          enableGuestField: existingYacht.enableGuestField,
          enableTimeSlot: existingYacht.enableTimeSlot,
          enableExtraHours: existingYacht.enableExtraHours,
          enableAddons: existingYacht.enableAddons,
          images: existingYacht.images || [],
          amenities: existingYacht.amenities || [],
          inclusions: existingYacht.inclusions || [],
          exclusions: existingYacht.exclusions || [],
          timeSlots: existingYacht.timeSlots || [],
          extraHours: existingYacht.extraHours || [],
          addons: existingYacht.addons || [],
        });
      }
    } catch (err) {
      console.error("Error loading yacht:", err);
      setError("Failed to load yacht data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof YachtFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from name if creating new
    if (field === "name" && isNew) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, this would call an API to save the yacht
      console.log("Saving yacht:", formData);
      
      setSuccess(true);
      setTimeout(() => {
        if (isNew) {
          router.push("/admin/yachts");
        } else {
          setSuccess(false);
        }
      }, 2000);
    } catch (err) {
      console.error("Error saving yacht:", err);
      setError("Failed to save yacht");
    } finally {
      setSaving(false);
    }
  };

  // Image management
  const addImage = () => {
    const newImage: YachtImage = {
      id: `img-${Date.now()}`,
      yachtId: yachtId,
      url: "",
      isPrimary: formData.images.length === 0,
      sortOrder: formData.images.length,
    };
    setFormData((prev) => ({ ...prev, images: [...prev.images, newImage] }));
  };

  const updateImage = (index: number, url: string) => {
    const images = [...formData.images];
    images[index] = { ...images[index], url };
    setFormData((prev) => ({ ...prev, images }));
  };

  const removeImage = (index: number) => {
    const images = formData.images.filter((_, i) => i !== index);
    if (images.length > 0 && !images[0].isPrimary) {
      images[0] = { ...images[0], isPrimary: true };
    }
    setFormData((prev) => ({ ...prev, images }));
  };

  const setPrimaryImage = (index: number) => {
    const images = formData.images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    setFormData((prev) => ({ ...prev, images }));
  };

  // Amenities management
  const addAmenity = () => {
    const newAmenity: YachtAmenity = {
      id: `amenity-${Date.now()}`,
      yachtId: yachtId,
      icon: "✨",
      name: "",
    };
    setFormData((prev) => ({ ...prev, amenities: [...prev.amenities, newAmenity] }));
  };

  const updateAmenity = (index: number, field: keyof YachtAmenity, value: string) => {
    const amenities = [...formData.amenities];
    amenities[index] = { ...amenities[index], [field]: value };
    setFormData((prev) => ({ ...prev, amenities }));
  };

  const removeAmenity = (index: number) => {
    const amenities = formData.amenities.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, amenities }));
  };

  // Inclusions management
  const addInclusion = () => {
    const newInclusion: YachtInclusion = {
      id: `inc-${Date.now()}`,
      yachtId: yachtId,
      text: "",
    };
    setFormData((prev) => ({ ...prev, inclusions: [...prev.inclusions, newInclusion] }));
  };

  const updateInclusion = (index: number, text: string) => {
    const inclusions = [...formData.inclusions];
    inclusions[index] = { ...inclusions[index], text };
    setFormData((prev) => ({ ...prev, inclusions }));
  };

  const removeInclusion = (index: number) => {
    const inclusions = formData.inclusions.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, inclusions }));
  };

  // Exclusions management
  const addExclusion = () => {
    const newExclusion: YachtExclusion = {
      id: `exc-${Date.now()}`,
      yachtId: yachtId,
      text: "",
    };
    setFormData((prev) => ({ ...prev, exclusions: [...prev.exclusions, newExclusion] }));
  };

  const updateExclusion = (index: number, text: string) => {
    const exclusions = [...formData.exclusions];
    exclusions[index] = { ...exclusions[index], text };
    setFormData((prev) => ({ ...prev, exclusions }));
  };

  const removeExclusion = (index: number) => {
    const exclusions = formData.exclusions.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, exclusions }));
  };

  // Time slots management
  const addTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: `slot-${Date.now()}`,
      yachtId: yachtId,
      name: "",
      startTime: "09:00",
      endTime: "13:00",
      price: formData.price,
      isActive: true,
      sortOrder: formData.timeSlots.length + 1,
    };
    setFormData((prev) => ({ ...prev, timeSlots: [...prev.timeSlots, newSlot] }));
  };

  const updateTimeSlot = (index: number, field: keyof TimeSlot, value: any) => {
    const timeSlots = [...formData.timeSlots];
    timeSlots[index] = { ...timeSlots[index], [field]: value };
    setFormData((prev) => ({ ...prev, timeSlots }));
  };

  const removeTimeSlot = (index: number) => {
    const timeSlots = formData.timeSlots.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, timeSlots }));
  };

  // Extra hours management
  const addExtraHour = () => {
    const newExtraHour: ExtraHour = {
      id: `extra-${Date.now()}`,
      yachtId: yachtId,
      hours: 1,
      price: formData.pricePerHour,
      isActive: true,
    };
    setFormData((prev) => ({ ...prev, extraHours: [...prev.extraHours, newExtraHour] }));
  };

  const updateExtraHour = (index: number, field: keyof ExtraHour, value: any) => {
    const extraHours = [...formData.extraHours];
    extraHours[index] = { ...extraHours[index], [field]: value };
    setFormData((prev) => ({ ...prev, extraHours }));
  };

  const removeExtraHour = (index: number) => {
    const extraHours = formData.extraHours.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, extraHours }));
  };

  // Addons management
  const addAddon = () => {
    const newAddon: YachtAddon = {
      id: `addon-${Date.now()}`,
      yachtId: yachtId,
      name: "",
      description: "",
      price: 0,
      isActive: true,
    };
    setFormData((prev) => ({ ...prev, addons: [...prev.addons, newAddon] }));
  };

  const updateAddon = (index: number, field: keyof YachtAddon, value: any) => {
    const addons = [...formData.addons];
    addons[index] = { ...addons[index], [field]: value };
    setFormData((prev) => ({ ...prev, addons }));
  };

  const removeAddon = (index: number) => {
    const addons = formData.addons.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, addons }));
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/yachts"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isNew ? "Add New Yacht" : `Edit: ${formData.name}`}
            </h1>
            <p className="text-gray-500">
              {isNew ? "Create a new yacht listing" : "Update yacht details and settings"}
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Saving...
            </>
          ) : success ? (
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

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <XCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {[
            { id: "basic", label: "Basic Info", icon: Package },
            { id: "pricing", label: "Pricing", icon: DollarSign },
            { id: "media", label: "Images", icon: ImageIcon },
            { id: "amenities", label: "Amenities", icon: Star },
            { id: "slots", label: "Time Slots", icon: Clock },
            { id: "extras", label: "Add-ons", icon: Plus },
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
        {/* Basic Info Tab */}
        {activeTab === "basic" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yacht Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  placeholder="e.g., Sea Princess"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  placeholder="e.g., sea-princess"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                placeholder="Brief description for cards"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                placeholder="Detailed description of the yacht"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  placeholder="e.g., Vasco da Gama, Goa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Capacity (Guests)
                </label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange("capacity", parseInt(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Min. Booking Hours
                </label>
                <input
                  type="number"
                  value={formData.minimumBookingHours}
                  onChange={(e) => handleInputChange("minimumBookingHours", parseInt(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  min="1"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange("featured", e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-gray-700">Featured Yacht</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleInputChange("isActive", e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-gray-700">Active (Visible to users)</span>
              </label>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Booking Options</h3>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enableDateField}
                    onChange={(e) => handleInputChange("enableDateField", e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">Enable Date Selection</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enableGuestField}
                    onChange={(e) => handleInputChange("enableGuestField", e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">Enable Guest Count</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enableTimeSlot}
                    onChange={(e) => handleInputChange("enableTimeSlot", e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">Enable Time Slots</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enableExtraHours}
                    onChange={(e) => handleInputChange("enableExtraHours", e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">Enable Extra Hours</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enableAddons}
                    onChange={(e) => handleInputChange("enableAddons", e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600">Enable Add-ons</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === "pricing" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Price ({formatCurrency(1)})
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", parseInt(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  min="0"
                />
                <p className="text-sm text-gray-500 mt-1">Default price for the yacht</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Per Hour ({formatCurrency(1)})
                </label>
                <input
                  type="number"
                  value={formData.pricePerHour}
                  onChange={(e) => handleInputChange("pricePerHour", parseInt(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  min="0"
                />
                <p className="text-sm text-gray-500 mt-1">Used for extra hours calculation</p>
              </div>
            </div>
          </div>
        )}

        {/* Images Tab */}
        {activeTab === "media" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Yacht Images</h3>
                <p className="text-sm text-gray-500">Add images to showcase the yacht</p>
              </div>
              <button
                onClick={addImage}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Image
              </button>
            </div>

            {formData.images.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">No images added yet</p>
                <button
                  onClick={addImage}
                  className="mt-4 text-primary hover:text-primary/80 font-medium"
                >
                  Add your first image
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={image.id} className="border rounded-xl overflow-hidden">
                    <div className="relative aspect-video bg-gray-100">
                      {image.url ? (
                        <Image
                          src={image.url}
                          alt={`Yacht image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}
                      {image.isPrimary && (
                        <span className="absolute top-2 left-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="p-3 space-y-3">
                      <input
                        type="url"
                        value={image.url}
                        onChange={(e) => updateImage(index, e.target.value)}
                        placeholder="Image URL"
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                      />
                      <div className="flex gap-2">
                        {!image.isPrimary && (
                          <button
                            onClick={() => setPrimaryImage(index)}
                            className="flex-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Set Primary
                          </button>
                        )}
                        <button
                          onClick={() => removeImage(index)}
                          className="px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Amenities Tab */}
        {activeTab === "amenities" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Amenities</h3>
                <p className="text-sm text-gray-500">Features and amenities offered</p>
              </div>
              <button
                onClick={addAmenity}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Amenity
              </button>
            </div>

            <div className="space-y-3">
              {formData.amenities.map((amenity, index) => (
                <div key={amenity.id} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={amenity.icon}
                    onChange={(e) => updateAmenity(index, "icon", e.target.value)}
                    className="w-16 px-3 py-2 border rounded-lg text-center text-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                    placeholder="🚤"
                  />
                  <input
                    type="text"
                    value={amenity.name}
                    onChange={(e) => updateAmenity(index, "name", e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                    placeholder="Amenity name"
                  />
                  <button
                    onClick={() => removeAmenity(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {formData.amenities.length === 0 && (
                <p className="text-gray-500 text-center py-8">No amenities added yet</p>
              )}
            </div>

            <hr className="border-gray-200" />

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Inclusions</h3>
              <div className="space-y-3">
                {formData.inclusions.map((inclusion, index) => (
                  <div key={inclusion.id} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <input
                      type="text"
                      value={inclusion.text}
                      onChange={(e) => updateInclusion(index, e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                      placeholder="What's included"
                    />
                    <button
                      onClick={() => removeInclusion(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addInclusion}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors"
                >
                  + Add Inclusion
                </button>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Exclusions</h3>
              <div className="space-y-3">
                {formData.exclusions.map((exclusion, index) => (
                  <div key={exclusion.id} className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <input
                      type="text"
                      value={exclusion.text}
                      onChange={(e) => updateExclusion(index, e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                      placeholder="What's not included"
                    />
                    <button
                      onClick={() => removeExclusion(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addExclusion}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors"
                >
                  + Add Exclusion
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Time Slots Tab */}
        {activeTab === "slots" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Time Slots</h3>
                <p className="text-sm text-gray-500">Define available booking time slots</p>
              </div>
              <button
                onClick={addTimeSlot}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Time Slot
              </button>
            </div>

            <div className="space-y-4">
              {formData.timeSlots.map((slot, index) => (
                <div key={slot.id} className="border rounded-xl p-4">
                  <div className="grid md:grid-cols-5 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Slot Name</label>
                      <input
                        type="text"
                        value={slot.name}
                        onChange={(e) => updateTimeSlot(index, "name", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                        placeholder="e.g., Morning Cruise"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => updateTimeSlot(index, "startTime", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) => updateTimeSlot(index, "endTime", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={slot.price}
                          onChange={(e) => updateTimeSlot(index, "price", parseInt(e.target.value))}
                          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                        />
                        <button
                          onClick={() => removeTimeSlot(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {formData.timeSlots.length === 0 && (
                <p className="text-gray-500 text-center py-8">No time slots defined. Add slots for users to choose from.</p>
              )}
            </div>
          </div>
        )}

        {/* Extras Tab */}
        {activeTab === "extras" && (
          <div className="space-y-8">
            {/* Extra Hours */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Extra Hours Options</h3>
                  <p className="text-sm text-gray-500">Additional hours users can add to their booking</p>
                </div>
                <button
                  onClick={addExtraHour}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Extra Hour
                </button>
              </div>

              <div className="space-y-4">
                {formData.extraHours.map((extra, index) => (
                  <div key={extra.id} className="flex items-center gap-4">
                    <div className="w-24">
                      <input
                        type="number"
                        value={extra.hours}
                        onChange={(e) => updateExtraHour(index, "hours", parseInt(e.target.value))}
                        className="w-full px-4 py-2 border rounded-lg text-center focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                        min="1"
                      />
                      <span className="text-sm text-gray-500 text-center block mt-1">hours</span>
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={extra.price}
                        onChange={(e) => updateExtraHour(index, "price", parseInt(e.target.value))}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                        placeholder="Price"
                      />
                    </div>
                    <button
                      onClick={() => removeExtraHour(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                {formData.extraHours.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No extra hour options defined</p>
                )}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Add-ons */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Add-ons</h3>
                  <p className="text-sm text-gray-500">Optional services users can add to their booking</p>
                </div>
                <button
                  onClick={addAddon}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Add-on
                </button>
              </div>

              <div className="space-y-4">
                {formData.addons.map((addon, index) => (
                  <div key={addon.id} className="border rounded-xl p-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={addon.name}
                          onChange={(e) => updateAddon(index, "name", e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                          placeholder="e.g., DJ Service"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input
                          type="text"
                          value={addon.description || ""}
                          onChange={(e) => updateAddon(index, "description", e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                          placeholder="Brief description"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={addon.price}
                            onChange={(e) => updateAddon(index, "price", parseInt(e.target.value))}
                            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                          />
                          <button
                            onClick={() => removeAddon(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {formData.addons.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No add-ons defined</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
