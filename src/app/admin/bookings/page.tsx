"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Filter,
  Eye,
  Check,
  X,
  RefreshCw,
  Download,
  MoreHorizontal
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Demo bookings
const bookings = [
  { id: "GYW-2024-0142", yacht: "Sea Princess", customer: "Rahul Mehta", phone: "+91 9876543210", date: "2024-01-15", time: "8AM - 12PM", guests: 15, amount: 28500, status: "confirmed", payment: "paid" },
  { id: "GYW-2024-0141", yacht: "Royal Duchess", customer: "Priya Sharma", phone: "+91 9876543211", date: "2024-01-14", time: "4PM - 8PM", guests: 8, amount: 42000, status: "pending", payment: "pending" },
  { id: "GYW-2024-0140", yacht: "Party Barge", customer: "Vikram Singh", phone: "+91 9876543212", date: "2024-01-13", time: "Full Day", guests: 45, amount: 55000, status: "confirmed", payment: "paid" },
  { id: "GYW-2024-0139", yacht: "Corporate Cruiser", customer: "TechCorp Inc", phone: "+91 9876543213", date: "2024-01-12", time: "9AM - 5PM", guests: 25, amount: 65000, status: "completed", payment: "paid" },
  { id: "GYW-2024-0138", yacht: "Sea Princess", customer: "Anita Desai", phone: "+91 9876543214", date: "2024-01-11", time: "12PM - 4PM", guests: 12, amount: 28500, status: "cancelled", payment: "refunded" },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const paymentColors = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  refunded: "bg-purple-100 text-purple-700",
  failed: "bg-red-100 text-red-700",
};

export default function BookingsAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.yacht.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && booking.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors inline-flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export
          </button>
          <Link
            href="/admin/bookings/new"
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            New Booking
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by booking ID, customer or yacht..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
            />
          </div>
          <div className="flex gap-2">
            {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium capitalize transition-colors",
                  statusFilter === status
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

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Booking ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Yacht</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Payment</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-900">{booking.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{booking.customer}</p>
                      <p className="text-sm text-gray-500">{booking.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{booking.yacht}</p>
                    <p className="text-sm text-gray-500">{booking.guests} guests • {booking.time}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{formatDate(booking.date)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{formatCurrency(booking.amount)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-3 py-1 text-xs font-medium rounded-full capitalize", statusColors[booking.status as keyof typeof statusColors])}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-3 py-1 text-xs font-medium rounded-full capitalize", paymentColors[booking.payment as keyof typeof paymentColors])}>
                      {booking.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      {booking.status === "pending" && (
                        <>
                          <button className="p-2 hover:bg-green-100 rounded-lg transition-colors">
                            <Check className="w-4 h-4 text-green-600" />
                          </button>
                          <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No bookings found matching your criteria</p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 1-{filteredBookings.length} of {bookings.length} bookings</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
