"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Star,
  CheckCircle,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Trash2,
  MessageSquare
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  customerName: string;
  customerLocation?: string;
  yachtId: string;
  yachtName: string;
  rating: number;
  title?: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "approved" | "pending">("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      // Mock data for demonstration - replace with actual API call
      const mockReviews: Review[] = [
        {
          id: "1",
          customerName: "Priya Sharma",
          customerLocation: "Mumbai",
          yachtId: "2",
          yachtName: "Royal Duchess",
          rating: 5,
          title: "Magical Anniversary Celebration",
          content: "We celebrated our anniversary on the Royal Duchess and it was absolutely magical. The crew was professional and the sunset views were breathtaking. The champagne service was a lovely touch!",
          isApproved: true,
          createdAt: "2024-01-15",
        },
        {
          id: "2",
          customerName: "Rahul Mehta",
          customerLocation: "Bangalore",
          yachtId: "3",
          yachtName: "Party Barge",
          rating: 5,
          title: "Best Bachelor Party Ever!",
          content: "Booked the Party Barge for my brother's bachelor party. 50 of us had an unforgettable time! The sound system was incredible and everyone is still talking about it. DJ service was top-notch!",
          isApproved: true,
          createdAt: "2024-01-10",
        },
        {
          id: "3",
          customerName: "Anita Desai",
          customerLocation: "Pune",
          yachtId: "4",
          yachtName: "Corporate Cruiser",
          rating: 5,
          title: "Perfect Corporate Event",
          content: "Corporate event on the Corporate Cruiser was a huge success. Professional setup, great service, and excellent catering. Our team loved it! Will definitely book again for our next event.",
          isApproved: true,
          createdAt: "2024-01-05",
        },
        {
          id: "4",
          customerName: "Vikram Singh",
          customerLocation: "Delhi",
          yachtId: "1",
          yachtName: "Sea Princess",
          rating: 4,
          title: "Family Birthday Fun",
          content: "Family birthday celebration on Sea Princess was perfect! Kids loved the experience, adults enjoyed the party. Thank you Goa Yacht World! The only suggestion would be more vegetarian food options.",
          isApproved: true,
          createdAt: "2024-01-02",
        },
        {
          id: "5",
          customerName: "Deepa Krishnan",
          customerLocation: "Chennai",
          yachtId: "1",
          yachtName: "Sea Princess",
          rating: 5,
          content: "One of the best experiences of my life! The yacht was luxurious and the staff went above and beyond.",
          isApproved: false,
          createdAt: "2024-01-18",
        },
        {
          id: "6",
          customerName: "Arjun Patel",
          customerLocation: "Ahmedabad",
          yachtId: "3",
          yachtName: "Party Barge",
          rating: 3,
          title: "Good but room for improvement",
          content: "The party was great but the yacht arrived 30 minutes late. Also, the sound system had some issues at the start. Otherwise, it was a good experience.",
          isApproved: false,
          createdAt: "2024-01-19",
        },
      ];
      setReviews(mockReviews);
    } catch (error) {
      console.error("Failed to load reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (reviewId: string) => {
    setReviews(reviews.map(r => 
      r.id === reviewId ? { ...r, isApproved: true } : r
    ));
  };

  const handleReject = (reviewId: string) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = 
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.yachtName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === "approved") return matchesSearch && review.isApproved;
    if (filterStatus === "pending") return matchesSearch && !review.isApproved;
    return matchesSearch;
  });

  const pendingCount = reviews.filter(r => !r.isApproved).length;
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

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
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Total Reviews</p>
          <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Pending Approval</p>
          <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {reviews.filter(r => r.isApproved).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500">Average Rating</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-gray-900">{avgRating}</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "w-4 h-4",
                    star <= Math.round(parseFloat(avgRating))
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "approved", "pending"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium capitalize transition-colors",
                  filterStatus === status
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {status}
                {status === "pending" && pendingCount > 0 && (
                  <span className="ml-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-0.5 rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-500">
              {searchQuery ? "Try adjusting your search" : "No reviews to display"}
            </p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {review.customerName}
                        </h3>
                        {review.customerLocation && (
                          <span className="text-sm text-gray-500">
                            from {review.customerLocation}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                "w-4 h-4",
                                star <= review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          for {review.yachtName}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(new Date(review.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  
                  {review.title && (
                    <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                  )}
                  
                  <p className="text-gray-600">{review.content}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 md:items-end">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
                      review.isApproved
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    )}
                  >
                    {review.isApproved ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    {review.isApproved ? "Approved" : "Pending"}
                  </span>
                  
                  <div className="flex gap-2 mt-2">
                    {!review.isApproved && (
                      <>
                        <button
                          onClick={() => handleApprove(review.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(review.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          <ThumbsDown className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setSelectedReview(review)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleReject(review.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
