import prisma from "./prisma";
import type { Yacht, YachtCategory, Testimonial } from "@/types";

// Categories
export const getCategories = async (): Promise<YachtCategory[]> => {
  const categories = await prisma.yachtCategory.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  return categories;
};

export const getCategoryBySlug = async (slug: string): Promise<YachtCategory | null> => {
  return prisma.yachtCategory.findUnique({
    where: { slug },
  });
};

export const getCategoryById = async (id: string): Promise<YachtCategory | null> => {
  return prisma.yachtCategory.findUnique({
    where: { id },
  });
};

// Yachts
export const getYachts = async (): Promise<Yacht[]> => {
  const yachts = await prisma.yacht.findMany({
    where: { isActive: true },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });
  
  // Transform to include all related data
  const fullYachts = await Promise.all(
    yachts.map(async (yacht) => {
      const [
        allImages,
        timeSlots,
        extraHours,
        addons,
        inclusions,
        exclusions,
        amenities,
        reviews,
      ] = await Promise.all([
        prisma.yachtImage.findMany({ where: { yachtId: yacht.id } }),
        prisma.timeSlot.findMany({ where: { yachtId: yacht.id } }),
        prisma.extraHour.findMany({ where: { yachtId: yacht.id } }),
        prisma.yachtAddon.findMany({ where: { yachtId: yacht.id } }),
        prisma.yachtInclusion.findMany({ where: { yachtId: yacht.id } }),
        prisma.yachtExclusion.findMany({ where: { yachtId: yacht.id } }),
        prisma.yachtAmenity.findMany({ where: { yachtId: yacht.id } }),
        prisma.review.findMany({ where: { yachtId: yacht.id, isApproved: true } }),
      ]);

      return {
        ...yacht,
        images: allImages,
        timeSlots,
        extraHours,
        addons,
        inclusions,
        exclusions,
        amenities,
        reviews,
        pricePerHour: yacht.pricePerHour || yacht.price / 2,
      };
    })
  );

  return fullYachts;
};

export const getFeaturedYachts = async (): Promise<Yacht[]> => {
  const yachts = await prisma.yacht.findMany({
    where: { featured: true, isActive: true },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      category: true,
    },
  });
  return yachts;
};

export const getYachtBySlug = async (slug: string): Promise<Yacht | null> => {
  const yacht = await prisma.yacht.findUnique({
    where: { slug },
    include: {
      images: true,
      timeSlots: { where: { isActive: true }, orderBy: { sortOrder: "asc" } },
      extraHours: { where: { isActive: true } },
      addons: { where: { isActive: true } },
      inclusions: true,
      exclusions: true,
      amenities: true,
      reviews: { where: { isApproved: true } },
      category: true,
    },
  });
  
  if (!yacht) return null;
  
  return {
    ...yacht,
    pricePerHour: yacht.pricePerHour || yacht.price / 2,
  };
};

export const getYachtById = async (id: string): Promise<Yacht | null> => {
  const yacht = await prisma.yacht.findUnique({
    where: { id },
    include: {
      images: true,
      timeSlots: { where: { isActive: true }, orderBy: { sortOrder: "asc" } },
      extraHours: { where: { isActive: true } },
      addons: { where: { isActive: true } },
      inclusions: true,
      exclusions: true,
      amenities: true,
      reviews: { where: { isApproved: true } },
      category: true,
    },
  });
  
  if (!yacht) return null;
  
  return {
    ...yacht,
    pricePerHour: yacht.pricePerHour || yacht.price / 2,
  };
};

export const getYachtsByCategory = async (categorySlug: string): Promise<Yacht[]> => {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];
  
  const yachts = await prisma.yacht.findMany({
    where: { categoryId: category.id, isActive: true },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      category: true,
    },
  });
  
  return yachts;
};

// Create/Update/Delete Yachts
export const createYacht = async (data: Partial<Yacht> & { name: string; slug: string; description: string; capacity: number; price: number; categoryId: string }) => {
  return prisma.yacht.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      shortDescription: data.shortDescription,
      capacity: data.capacity,
      price: data.price,
      categoryId: data.categoryId,
      location: data.location,
      featured: data.featured || false,
      isActive: data.isActive ?? true,
      enableDateField: data.enableDateField ?? true,
      enableGuestField: data.enableGuestField ?? true,
      enableTimeSlot: data.enableTimeSlot ?? true,
      enableExtraHours: data.enableExtraHours ?? true,
      enableAddons: data.enableAddons ?? true,
      pricePerHour: data.pricePerHour,
      minimumBookingHours: data.minimumBookingHours || 2,
    },
  });
};

export const updateYacht = async (id: string, data: Partial<Yacht>) => {
  return prisma.yacht.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      shortDescription: data.shortDescription,
      capacity: data.capacity,
      price: data.price,
      categoryId: data.categoryId,
      location: data.location,
      featured: data.featured,
      isActive: data.isActive,
      enableDateField: data.enableDateField,
      enableGuestField: data.enableGuestField,
      enableTimeSlot: data.enableTimeSlot,
      enableExtraHours: data.enableExtraHours,
      enableAddons: data.enableAddons,
      pricePerHour: data.pricePerHour,
      minimumBookingHours: data.minimumBookingHours,
    },
  });
};

export const deleteYacht = async (id: string) => {
  return prisma.yacht.delete({
    where: { id },
  });
};

// Testimonials
export const getTestimonials = async (): Promise<Testimonial[]> => {
  return prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
};

// Bookings
export const getBookings = async () => {
  return prisma.booking.findMany({
    include: {
      yacht: true,
      user: true,
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getBookingById = async (id: string) => {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      yacht: true,
      user: true,
      items: true,
      coupon: true,
    },
  });
};

export const createBooking = async (data: {
  bookingId: string;
  yachtId: string;
  bookingDate: Date;
  guests: number;
  basePrice: number;
  totalAmount: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  specialRequests?: string;
  status?: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
}) => {
  return prisma.booking.create({
    data: {
      bookingId: data.bookingId,
      yachtId: data.yachtId,
      bookingDate: data.bookingDate,
      guests: data.guests,
      basePrice: data.basePrice,
      totalAmount: data.totalAmount,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      specialRequests: data.specialRequests,
      status: data.status || "PENDING",
      paymentStatus: "PENDING",
    },
  });
};

// Coupons
export const getCouponByCode = async (code: string) => {
  const now = new Date();
  return prisma.coupon.findFirst({
    where: {
      code,
      isActive: true,
      startsAt: { lte: now },
      expiresAt: { gte: now },
    },
  });
};

// FAQ data (static for now)
export const getFAQs = () => [
  {
    question: "What is included in the yacht rental price?",
    answer: "Our yacht rental prices include the yacht, captain & crew, fuel charges, and basic safety equipment (life jackets). Food, beverages, decorations, and additional services are available as add-ons.",
  },
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 3-5 days in advance for standard dates. For weekends, holidays, and special occasions, we suggest booking 2-3 weeks ahead to ensure availability.",
  },
  {
    question: "Is there a security deposit?",
    answer: "Yes, we require a refundable security deposit of ₹5,000-₹10,000 depending on the yacht. The deposit is returned after the trip if no damage occurs.",
  },
  {
    question: "What happens if it rains?",
    answer: "We have a flexible policy for weather conditions. If it's raining heavily, we can reschedule your booking to another date at no extra cost. Light rain usually doesn't affect the trip.",
  },
  {
    question: "Can I bring my own food and drinks?",
    answer: "Yes, you're welcome to bring your own food and beverages. We also offer catering services and can arrange for supplies to be loaded on the yacht.",
  },
  {
    question: "Are the yachts safe?",
    answer: "Absolutely! All our yachts are Coast Guard certified and regularly maintained. They come equipped with life jackets, first aid kits, fire extinguishers, and communication devices.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made 7+ days before the booking get a full refund. 3-7 days before: 50% refund. Less than 3 days: no refund. Weather-related cancellations get full refund or free rescheduling.",
  },
];
