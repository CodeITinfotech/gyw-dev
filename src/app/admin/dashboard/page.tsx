"use client";

import { useState } from "react";
import { 
  Ship, 
  Calendar, 
  Users, 
  DollarSign,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Edit2,
  Trash2,
  Star,
  ThumbsUp,
  MessageSquare
} from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  content: string;
  isActive: boolean;
}

// Demo data
const stats = [
  { 
    label: "Total Bookings", 
    value: "156", 
    change: "+12%", 
    positive: true,
    icon: Calendar,
    href: "/admin/bookings"
  },
  { 
    label: "Revenue", 
    value: "₹4,25,000", 
    change: "+8%", 
    positive: true,
    icon: DollarSign,
  },
  { 
    label: "Active Yachts", 
    value: "8", 
    change: "2 added",
    positive: true,
    icon: Ship,
    href: "/admin/yachts"
  },
  { 
    label: "Customers", 
    value: "234", 
    change: "+24",
    positive: true,
    icon: Users,
    href: "/admin/customers"
  },
];

const recentBookings = [
  { id: "GYW-2024-0142", yacht: "Sea Princess", customer: "Rahul Mehta", date: "2024-01-15", amount: 28500, status: "confirmed" },
  { id: "GYW-2024-0141", yacht: "Royal Duchess", customer: "Priya Sharma", date: "2024-01-14", amount: 42000, status: "pending" },
  { id: "GYW-2024-0140", yacht: "Party Barge", customer: "Vikram Singh", date: "2024-01-13", amount: 55000, status: "confirmed" },
  { id: "GYW-2024-0139", yacht: "Corporate Cruiser", customer: "TechCorp Inc", date: "2024-01-12", amount: 65000, status: "completed" },
];

const popularYachts = [
  { name: "Sea Princess", bookings: 45, revenue: 1125000 },
  { name: "Party Barge", bookings: 38, revenue: 1710000 },
  { name: "Royal Duchess", bookings: 32, revenue: 1120000 },
  { name: "Sunset Dream", bookings: 28, revenue: 840000 },
];

const testimonialsData: Testimonial[] = [
  { id: "1", name: "Priya Sharma", location: "Mumbai", rating: 5, content: "Amazing experience! We celebrated our anniversary on the Royal Duchess and it was absolutely magical.", isActive: true },
  { id: "2", name: "Rahul Mehta", location: "Bangalore", rating: 5, content: "Booked the Party Barge for my brother's bachelor party. 50 of us had an unforgettable time!", isActive: true },
  { id: "3", name: "Anita Desai", location: "Pune", rating: 5, content: "Corporate event on the Corporate Cruiser was a huge success. Professional setup, great service.", isActive: true },
  { id: "4", name: "Vikram Singh", location: "Delhi", rating: 5, content: "Family birthday celebration on Sea Princess was perfect! Kids loved the experience.", isActive: true },
];

export default function DashboardPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(testimonialsData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Testimonial>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: "",
    location: "",
    rating: 5,
    content: "",
    isActive: true
  });

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setEditForm({ ...testimonial });
  };

  const handleSaveEdit = () => {
    if (editingId) {
      setTestimonials(testimonials.map(t => 
        t.id === editingId ? { ...t, ...editForm } as Testimonial : t
      ));
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  const handleAdd = () => {
    const newItem: Testimonial = {
      id: `new-${Date.now()}`,
      name: newTestimonial.name || "",
      location: newTestimonial.location || "",
      rating: newTestimonial.rating || 5,
      content: newTestimonial.content || "",
      isActive: true
    };
    setTestimonials([...testimonials, newItem]);
    setIsAdding(false);
    setNewTestimonial({ name: "", location: "", rating: 5, content: "", isActive: true });
  };

  const activeTestimonials = testimonials.filter(t => t.isActive);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening.</p>
        </div>
        <Link
          href="/admin/bookings/new"
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          New Booking
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href || "#"}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Bookings</h2>
              <Link href="/admin/bookings" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
          </div>
          <div className="divide-y">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{booking.yacht}</p>
                    <p className="text-sm text-gray-500">{booking.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(booking.amount)}</p>
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Yachts */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Popular Yachts</h2>
              <Link href="/admin/yachts" className="text-sm text-primary hover:underline">
                Manage
              </Link>
            </div>
          </div>
          <div className="divide-y">
            {popularYachts.map((yacht, index) => (
              <div key={yacht.name} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{yacht.name}</p>
                    <p className="text-sm text-gray-500">{yacht.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(yacht.revenue)}</p>
                    <p className="text-sm text-gray-500">revenue</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Happy Clients / Testimonials Section */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Happy Clients</h2>
                <p className="text-sm text-gray-500">{activeTestimonials.length} testimonials</p>
              </div>
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {isAdding && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-primary/30">
              <h3 className="font-semibold text-gray-900 mb-4">Add New Testimonial</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                    placeholder="Customer name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newTestimonial.location}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, location: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                    placeholder="City"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewTestimonial({ ...newTestimonial, rating: star })}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${star <= (newTestimonial.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                <textarea
                  value={newTestimonial.content}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  placeholder="Customer's review..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setNewTestimonial({ name: "", location: "", rating: 5, content: "", isActive: true });
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={cn(
                  "p-4 rounded-xl border transition-all",
                  editingId === testimonial.id 
                    ? "bg-primary/5 border-primary/30" 
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                )}
              >
                {editingId === testimonial.id ? (
                  <div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value={editForm.location}
                          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setEditForm({ ...editForm, rating: star })}
                            className="p-1"
                          >
                            <Star
                              className={`w-6 h-6 ${star <= (editForm.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                      <textarea
                        value={editForm.content}
                        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.location}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">"{testimonial.content}"</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {testimonials.length === 0 && (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500">No testimonials yet. Add your first one!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/yachts/new"
            className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <Ship className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <span className="text-sm font-medium">Add New Yacht</span>
          </Link>
          <Link
            href="/admin/bookings/new"
            className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <span className="text-sm font-medium">Create Booking</span>
          </Link>
          <Link
            href="/admin/coupons/new"
            className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <span className="text-sm font-medium">Create Coupon</span>
          </Link>
          <Link
            href="/admin/reviews"
            className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <Star className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <span className="text-sm font-medium">Manage Reviews</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
