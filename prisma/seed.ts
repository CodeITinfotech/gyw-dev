// Seed script for Prisma database with MongoDB
// Run with: npx prisma db seed

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create admin user
  await prisma.user.upsert({
    where: { email: "admin@goayachtworld.com" },
    update: {},
    create: {
      email: "admin@goayachtworld.com",
      password: "admin123", // In production, this should be hashed!
      name: "Admin User",
      role: "ADMIN",
    },
  });
  console.log("✅ Created admin user (admin@goayachtworld.com / admin123)");

  // Create yacht categories
  const categories = [
    { name: "Luxury Yacht", slug: "luxury-yacht", icon: "🚤", description: "Premium luxury yachts for special occasions", sortOrder: 1 },
    { name: "Party Yacht", slug: "party-yacht", icon: "🎉", description: "Perfect for parties and celebrations", sortOrder: 2 },
    { name: "Sunset Cruise", slug: "sunset-cruise", icon: "🌅", description: "Romantic sunset experiences", sortOrder: 3 },
    { name: "Corporate", slug: "corporate", icon: "💼", description: "Professional corporate events", sortOrder: 4 },
    { name: "Romantic", slug: "romantic", icon: "💕", description: "Intimate experiences for couples", sortOrder: 5 },
  ];

  const createdCategories: Record<string, any> = {};
  for (const cat of categories) {
    const created = await prisma.yachtCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    createdCategories[cat.slug] = created;
  }
  console.log(`✅ Created ${categories.length} yacht categories`);

  // Create sample yachts
  const yachtsData = [
    {
      name: "Sea Princess",
      slug: "sea-princess",
      description: "Experience the ultimate luxury on the Sea Princess, a 50ft motor yacht perfect for parties up to 25 guests. Features include air-conditioned cabins, sun deck, and premium sound system.",
      shortDescription: "50ft luxury motor yacht for parties up to 25 guests",
      capacity: 25,
      price: 25000,
      categorySlug: "luxury-yacht",
      location: "Vasco da Gama, Goa",
      featured: true,
      pricePerHour: 15000,
      minimumBookingHours: 2,
      images: [
        { url: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800", isPrimary: true },
        { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800", isPrimary: false },
      ],
      amenities: [
        { icon: "❄️", name: "Air Conditioning" },
        { icon: "🔊", name: "Sound System" },
        { icon: "☀️", name: "Sun Deck" },
        { icon: "🏊", name: "Swimming Platform" },
      ],
      inclusions: ["Captain & Crew", "Fuel charges", "Life jackets"],
      exclusions: ["Food & Beverages", "Decoration"],
      timeSlots: [
        { name: "Morning (8AM - 12PM)", startTime: "08:00", endTime: "12:00", price: 25000 },
        { name: "Afternoon (12PM - 4PM)", startTime: "12:00", endTime: "16:00", price: 25000 },
        { name: "Sunset (4PM - 8PM)", startTime: "16:00", endTime: "20:00", price: 30000 },
      ],
      extraHours: [{ hours: 1, price: 15000 }, { hours: 2, price: 25000 }],
      addons: [
        { name: "Balloon Decoration", description: "Beautiful balloon arrangement", price: 5000 },
        { name: "Birthday Cake", description: "Customized 2kg cake", price: 3500 },
        { name: "DJ Service", description: "Professional DJ with equipment", price: 15000 },
      ],
    },
    {
      name: "Royal Duchess",
      slug: "royal-duchess",
      description: "A magnificent 60ft sailing yacht offering an elegant experience. Perfect for intimate celebrations and romantic cruises.",
      shortDescription: "60ft sailing yacht for intimate celebrations",
      capacity: 15,
      price: 35000,
      categorySlug: "romantic",
      location: "Vasco da Gama, Goa",
      featured: true,
      pricePerHour: 12000,
      minimumBookingHours: 3,
      images: [
        { url: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800", isPrimary: true },
      ],
      amenities: [
        { icon: "❄️", name: "Air Conditioning" },
        { icon: "🍽️", name: "Dining Area" },
      ],
      inclusions: ["Captain & Crew", "Fuel charges"],
      exclusions: [],
      timeSlots: [
        { name: "Sunset Cruise (4PM - 7PM)", startTime: "16:00", endTime: "19:00", price: 35000 },
      ],
      extraHours: [{ hours: 1, price: 12000 }],
      addons: [
        { name: "Champagne Service", description: "Premium champagne with setup", price: 8000 },
        { name: "Flower Decoration", description: "Romantic rose petals & flowers", price: 6000 },
      ],
    },
    {
      name: "Party Barge",
      slug: "party-barge",
      description: "The ultimate party vessel! Spacious deck, club-level sound system, and light show. Capacity for 50+ guests.",
      shortDescription: "Ultimate party yacht for 50+ guests",
      capacity: 50,
      price: 45000,
      categorySlug: "party-yacht",
      location: "Vasco da Gama, Goa",
      featured: true,
      pricePerHour: 12000,
      minimumBookingHours: 4,
      images: [
        { url: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800", isPrimary: true },
      ],
      amenities: [
        { icon: "🔊", name: "Club Sound System" },
        { icon: "💡", name: "Light Show" },
        { icon: "🍾", name: "Bar Counter" },
      ],
      inclusions: ["Captain & Crew", "Fuel charges", "Basic decor"],
      exclusions: [],
      timeSlots: [
        { name: "Full Day (8AM - 8PM)", startTime: "08:00", endTime: "20:00", price: 80000 },
        { name: "Night Party (8PM - 1AM)", startTime: "20:00", endTime: "01:00", price: 60000 },
      ],
      extraHours: [{ hours: 1, price: 10000 }],
      addons: [
        { name: "DJ Service", description: "Professional DJ", price: 20000 },
        { name: "Catering", description: "Buffet for 50 guests", price: 25000 },
      ],
    },
    {
      name: "Corporate Cruiser",
      slug: "corporate-cruiser",
      description: "Professional yacht for corporate events, team outings, and business meetings.",
      shortDescription: "Professional yacht for corporate events",
      capacity: 30,
      price: 50000,
      categorySlug: "corporate",
      location: "Vasco da Gama, Goa",
      featured: true,
      pricePerHour: 15000,
      minimumBookingHours: 4,
      images: [
        { url: "https://images.unsplash.com/photo-1565976469785-0538f6f0e379?w=800", isPrimary: true },
      ],
      amenities: [
        { icon: "📶", name: "WiFi" },
        { icon: "📺", name: "Projector" },
        { icon: "🍽️", name: "Catering Space" },
      ],
      inclusions: ["Captain & Crew", "Fuel charges", "Basic setup"],
      exclusions: [],
      timeSlots: [
        { name: "Business Day (9AM - 5PM)", startTime: "09:00", endTime: "17:00", price: 50000 },
      ],
      extraHours: [],
      addons: [
        { name: "Catering", description: "Full day catering", price: 15000 },
        { name: "Event Coordinator", description: "Professional event manager", price: 10000 },
      ],
    },
  ];

  for (const yachtData of yachtsData) {
    const { images, amenities, inclusions, exclusions, timeSlots, extraHours, addons, categorySlug, ...yachtInfo } = yachtData;

    const yacht = await prisma.yacht.upsert({
      where: { slug: yachtInfo.slug },
      update: {},
      create: {
        ...yachtInfo,
        categoryId: createdCategories[categorySlug].id,
      },
    });

    // Create Images
    for (let i = 0; i < images.length; i++) {
      await prisma.yachtImage.create({
        data: {
          yachtId: yacht.id,
          url: images[i].url,
          isPrimary: images[i].isPrimary,
          sortOrder: i,
        },
      });
    }

    // Create Amenities
    for (const amenity of amenities) {
      await prisma.yachtAmenity.create({
        data: {
          yachtId: yacht.id,
          ...amenity,
        },
      });
    }

    // Create Inclusions
    for (const text of inclusions) {
      await prisma.yachtInclusion.create({
        data: { yachtId: yacht.id, text },
      });
    }

    // Create Exclusions
    for (const text of exclusions) {
      await prisma.yachtExclusion.create({
        data: { yachtId: yacht.id, text },
      });
    }

    // Create Time Slots
    for (let i = 0; i < timeSlots.length; i++) {
      await prisma.timeSlot.create({
        data: {
          yachtId: yacht.id,
          ...timeSlots[i],
          isActive: true,
          sortOrder: i + 1,
        },
      });
    }

    // Create Extra Hours
    for (const extra of extraHours) {
      await prisma.extraHour.create({
        data: { yachtId: yacht.id, ...extra, isActive: true },
      });
    }

    // Create Addons
    for (const addon of addons) {
      await prisma.yachtAddon.create({
        data: { yachtId: yacht.id, ...addon, isActive: true },
      });
    }

    console.log(`✅ Created yacht: ${yacht.name}`);
  }

  // Create testimonials
  const testimonials = [
    { name: "Priya Sharma", location: "Mumbai", content: "Amazing experience! We celebrated our anniversary on the Royal Duchess and it was absolutely magical.", rating: 5, sortOrder: 1 },
    { name: "Rahul Mehta", location: "Bangalore", content: "Booked the Party Barge for my brother's bachelor party. 50 of us had an unforgettable time!", rating: 5, sortOrder: 2 },
    { name: "Anita Desai", location: "Pune", content: "Corporate event on the Corporate Cruiser was a huge success. Professional setup, great service.", rating: 5, sortOrder: 3 },
    { name: "Vikram Singh", location: "Delhi", content: "Family birthday celebration on Sea Princess was perfect! Kids loved the experience.", rating: 5, sortOrder: 4 },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: `testimonial-${t.sortOrder}` },
      update: {},
      create: { id: `testimonial-${t.sortOrder}`, ...t, isActive: true },
    });
  }
  console.log(`✅ Created ${testimonials.length} testimonials`);

  // Create sample coupons
  await prisma.coupon.upsert({
    where: { code: "WELCOME10" },
    update: {},
    create: {
      code: "WELCOME10",
      type: "PERCENTAGE",
      value: 10,
      maxDiscount: 5000,
      startsAt: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  });

  await prisma.coupon.upsert({
    where: { code: "FLAT500" },
    update: {},
    create: {
      code: "FLAT500",
      type: "FIXED",
      value: 500,
      minAmount: 5000,
      startsAt: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  });
  console.log("✅ Created sample coupons");

  // Create website settings
  await prisma.websiteSetting.upsert({
    where: { key: "company_name" },
    update: {},
    create: { key: "company_name", value: "Goa Yacht World", category: "general" },
  });

  await prisma.websiteSetting.upsert({
    where: { key: "whatsapp_number" },
    update: {},
    create: { key: "whatsapp_number", value: "918446275985", category: "contact" },
  });

  // Create homepage settings
  await prisma.homepageSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      heroHeading: "Experience Luxury on the Arabian Sea",
      heroSubheading: "Premium yacht rentals in Goa for parties, celebrations & corporate events",
      heroCtaText: "Book Now",
      heroCtaLink: "/yachts",
    },
  });
  console.log("✅ Created settings");

  console.log("\n🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
