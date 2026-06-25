"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Plus, 
  Copy, 
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Percent,
  IndianRupee,
  Calendar,
  Tag,
  MoreHorizontal
} from "lucide-react";
import { format, formatDistanceToNow, isAfter, isBefore } from "date-fns";
import { cn } from "@/lib/utils";

interface Coupon {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  startsAt: string;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      // Mock data for demonstration - replace with actual API call
      const mockCoupons: Coupon[] = [
        {
          id: "1",
          code: "WELCOME10",
          type: "PERCENTAGE",
          value: 10,
          maxDiscount: 5000,
          usageLimit: 100,
          usedCount: 23,
          startsAt: "2024-01-01",
          expiresAt: "2024-12-31",
          isActive: true,
          createdAt: "2024-01-01",
        },
        {
          id: "2",
          code: "FLAT500",
          type: "FIXED",
          value: 500,
          minAmount: 5000,
          usageLimit: 50,
          usedCount: 18,
          startsAt: "2024-01-01",
          expiresAt: "2024-06-30",
          isActive: true,
          createdAt: "2024-01-01",
        },
        {
          id: "3",
          code: "SUMMER20",
          type: "PERCENTAGE",
          value: 20,
          minAmount: 10000,
          maxDiscount: 10000,
          usageLimit: 200,
          usedCount: 45,
          startsAt: "2024-03-01",
          expiresAt: "2024-05-31",
          isActive: false,
          createdAt: "2024-02-28",
        },
        {
          id: "4",
          code: "BIRTHDAY15",
          type: "PERCENTAGE",
          value: 15,
          maxDiscount: 7500,
          usedCount: 0,
          startsAt: "2024-01-01",
          expiresAt: "2024-12-31",
          isActive: true,
          createdAt: "2024-01-01",
        },
        {
          id: "5",
          code: "CORPORATE25",
          type: "PERCENTAGE",
          value: 25,
          minAmount: 25000,
          maxDiscount: 15000,
          usageLimit: 30,
          usedCount: 12,
          startsAt: "2024-01-01",
          expiresAt: "2024-12-31",
          isActive: true,
          createdAt: "2024-01-01",
        },
      ];
      setCoupons(mockCoupons);
    } catch (error) {
      console.error("Failed to load coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getCouponStatus = (coupon: Coupon) => {
    const now = new Date();
    const startsAt = new Date(coupon.startsAt);
    const expiresAt = new Date(coupon.expiresAt);

    if (!coupon.isActive) return "inactive";
    if (isBefore(now, startsAt)) return "scheduled";
    if (isAfter(now, expiresAt)) return "expired";
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return "exhausted";
    return "active";
  };

  const formatDiscount = (coupon: Coupon) => {
    if (coupon.type === "PERCENTAGE") {
      return `${coupon.value}% OFF${coupon.maxDiscount ? ` (up to ₹${coupon.maxDiscount.toLocaleString()})` : ""}`;
    }
    return `₹${coupon.value} OFF`;
  };

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCoupons = coupons.filter(c => getCouponStatus(c) === "active").length;

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
          <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
        </div>
        <button
          onClick={() => {
            setEditingCoupon(null);
            setShowModal(true);
          }}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Coupon
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Coupons</p>
          <p className="text-2xl font-bold text-gray-900">{coupons.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Active Coupons</p>
          <p className="text-2xl font-bold text-green-600">{activeCoupons}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Usage</p>
          <p className="text-2xl font-bold text-gray-900">
            {coupons.reduce((sum, c) => sum + c.usedCount, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Avg. Discount</p>
          <p className="text-2xl font-bold text-primary">
            {(coupons.reduce((sum, c) => sum + c.value, 0) / coupons.length).toFixed(0)}%
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by coupon code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
            />
          </div>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCoupons.map((coupon) => {
          const status = getCouponStatus(coupon);
          const isExpired = status === "expired";
          const usagePercent = coupon.usageLimit 
            ? (coupon.usedCount / coupon.usageLimit) * 100 
            : 0;

          return (
            <div
              key={coupon.id}
              className={cn(
                "bg-white rounded-xl shadow-sm p-6 border-2",
                isExpired ? "border-gray-200 opacity-75" : "border-primary/20"
              )}
            >
              {/* Coupon Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    status === "active" ? "bg-green-100 text-green-800" :
                    status === "expired" ? "bg-gray-100 text-gray-800" :
                    status === "scheduled" ? "bg-blue-100 text-blue-800" :
                    status === "exhausted" ? "bg-orange-100 text-orange-800" :
                    "bg-red-100 text-red-800"
                  )}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => copyToClipboard(coupon.code)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copy Code"
                  >
                    {copiedCode === coupon.code ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditingCoupon(coupon);
                      setShowModal(true);
                    }}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 tracking-wider">
                  {coupon.code}
                </h3>
                <button
                  onClick={() => copyToClipboard(coupon.code)}
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  {copiedCode === coupon.code ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Discount Value */}
              <div className="flex items-center gap-2 mb-4">
                {coupon.type === "PERCENTAGE" ? (
                  <Percent className="w-5 h-5 text-primary" />
                ) : (
                  <IndianRupee className="w-5 h-5 text-primary" />
                )}
                <span className="text-2xl font-bold text-primary">
                  {formatDiscount(coupon)}
                </span>
              </div>

              {/* Conditions */}
              <div className="space-y-2 mb-4 text-sm text-gray-600">
                {coupon.minAmount && (
                  <p>Min. booking: ₹{coupon.minAmount.toLocaleString()}</p>
                )}
                {coupon.maxDiscount && coupon.type === "PERCENTAGE" && (
                  <p>Max discount: ₹{coupon.maxDiscount.toLocaleString()}</p>
                )}
                {coupon.usageLimit && (
                  <p>Usage: {coupon.usedCount} / {coupon.usageLimit}</p>
                )}
              </div>

              {/* Usage Progress */}
              {coupon.usageLimit && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Usage</span>
                    <span>{usagePercent.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={cn(
                        "h-2 rounded-full transition-all",
                        usagePercent > 80 ? "bg-red-500" :
                        usagePercent > 50 ? "bg-yellow-500" : "bg-green-500"
                      )}
                      style={{ width: `${Math.min(usagePercent, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Expiry */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>
                  {isAfter(new Date(coupon.expiresAt), new Date())
                    ? `Expires ${formatDistanceToNow(new Date(coupon.expiresAt), { addSuffix: true })}`
                    : `Expired ${format(new Date(coupon.expiresAt), "MMM d, yyyy")}`
                  }
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCoupons.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Tag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No coupons found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery ? "Try adjusting your search" : "Create your first coupon to get started"}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Coupon
          </button>
        </div>
      )}
    </div>
  );
}
