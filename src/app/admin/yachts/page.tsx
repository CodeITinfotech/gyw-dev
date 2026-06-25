"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Star,
  Users,
  DollarSign,
  ToggleLeft,
  ToggleRight,
  Ship,
  X,
  Image as ImageIcon,
  MapPin,
  Check
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { getYachts } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Yacht } from "@/types";

interface YachtFormData {
  id?: string;
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
  imageUrl: string;
}

export default function YachtsAdminPage() {
  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showStatus, setShowStatus] = useState<"all" | "active" | "inactive">("all");
  const [showModal, setShowModal] = useState(false);
  const [editingYacht, setEditingYacht] = useState<YachtFormData | null>(null);
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
    imageUrl: "",
  });

  useEffect(() => {
    loadYachts();
  }, []);

  const loadYachts = async () => {
    try {
      const data = await getYachts();
      setYachts(data);
    } catch (error) {
      console.error("Failed to load yachts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredYachts = yachts.filter((yacht) => {
    const matchesSearch = yacht.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      yacht.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (showStatus === "active") return matchesSearch && yacht.isActive;
    if (showStatus === "inactive") return matchesSearch && !yacht.isActive;
    return matchesSearch;
  });

  const handleAddNew = () => {
    setEditingYacht(null);
    setFormData({
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
      imageUrl: "",
    });
    setShowModal(true);
  };

  const handleEdit = (yacht: Yacht) => {
    setEditingYacht(yacht);
    setFormData({
      id: yacht.id,
      name: yacht.name,
      slug: yacht.slug,
      description: yacht.description,
      shortDescription: yacht.shortDescription || "",
      capacity: yacht.capacity,
      price: yacht.price,
      pricePerHour: yacht.pricePerHour || yacht.price / 2,
      minimumBookingHours: yacht.minimumBookingHours,
      location: yacht.location || "Goa, India",
      featured: yacht.featured,
      isActive: yacht.isActive,
      imageUrl: yacht.images?.[0]?.url || "",
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingYacht) {
      // Update existing
      setYachts(yachts.map(y => 
        y.id === editingYacht.id 
          ? { 
              ...y, 
              ...formData, 
              images: formData.imageUrl ? [{ id: y.images?.[0]?.id || "1", yachtId: y.id, url: formData.imageUrl, isPrimary: true, sortOrder: 0 }] : y.images 
            } 
          : y
      ));
    } else {
      // Add new
      const newYacht: Yacht = {
        id: `new-${Date.now()}`,
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
        description: formData.description,
        shortDescription: formData.shortDescription,
        capacity: formData.capacity,
        price: formData.price,
        pricePerHour: formData.pricePerHour,
        minimumBookingHours: formData.minimumBookingHours,
        location: formData.location,
        featured: formData.featured,
        isActive: formData.isActive,
        categoryId: "1",
        enableDateField: true,
        enableGuestField: true,
        enableTimeSlot: true,
        enableExtraHours: true,
        enableAddons: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        images: formData.imageUrl ? [{ id: "new", yachtId: `new-${Date.now()}`, url: formData.imageUrl, isPrimary: true, sortOrder: 0 }] : [],
        amenities: [],
        inclusions: [],
        exclusions: [],
        timeSlots: [],
        extraHours: [],
        addons: [],
        reviews: [],
      };
      setYachts([...yachts, newYacht]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this yacht?")) {
      setYachts(yachts.filter(y => y.id !== id));
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Yachts</h1>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Yacht
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search yachts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "active", "inactive"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setShowStatus(status)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium capitalize transition-colors",
                  showStatus === status
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Yachts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredYachts.map((yacht) => (
          <div key={yacht.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Image */}
            <div className="relative aspect-[16/10]">
              {yacht.images?.[0] ? (
                <Image
                  src={yacht.images[0].url}
                  alt={yacht.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl">🚤</span>
                </div>
              )}
              
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => {
                    setYachts(yachts.map(y => 
                      y.id === yacht.id ? { ...y, isActive: !y.isActive } : y
                    ));
                  }}
                  className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                >
                  {yacht.isActive ? (
                    <ToggleRight className="w-6 h-6 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* Featured Badge */}
              {yacht.featured && (
                <div className="absolute top-3 left-3">
                  <span className="bg-luxury-gold text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{yacht.name}</h3>
                  <p className="text-sm text-gray-500">{yacht.location || "Goa, India"}</p>
                </div>
                <p className="text-lg font-bold text-primary">
                  {formatCurrency(yacht.price)}
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{yacht.capacity}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{yacht.pricePerHour}/hr</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(yacht)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(yacht.id)}
                  className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredYachts.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Ship className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No yachts found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery
              ? "Try adjusting your search"
              : "Get started by adding your first yacht"}
          </p>
          <button
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Yacht
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingYacht ? "Edit Yacht" : "Add New Yacht"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <ImageIcon className="w-4 h-4 inline mr-1" />
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  />
                  {formData.imageUrl && (
                    <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Name & Slug */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                      placeholder="e.g., Sea Princess"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                      placeholder="e.g., Goa, India"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                    placeholder="Describe the yacht..."
                  />
                </div>

                {/* Capacity & Price */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Capacity
                    </label>
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Base Price
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price/Hour
                    </label>
                    <input
                      type="number"
                      value={formData.pricePerHour}
                      onChange={(e) => setFormData({ ...formData, pricePerHour: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                      min="0"
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                {editingYacht ? "Save Changes" : "Add Yacht"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
