import { PrismaClient, TourType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.tour.createMany({
    data: [
      { title: "Monsoon in Munnar", slug: "monsoon-in-munnar", type: TourType.DOMESTIC, destination: "Kerala, India", itinerary: "Tea estates, misty valleys and slow mornings", duration: 5, price: 28900, currency: "INR", images: ["https://images.unsplash.com/photo-1602216056096-3b40cc0c9944"], slots: 12 },
      { title: "The Icelandic Loop", slug: "the-icelandic-loop", type: TourType.OUTBOUND, destination: "Iceland", itinerary: "Waterfalls, geothermal pools and the northern lights", duration: 8, price: 1890, currency: "USD", images: ["https://images.unsplash.com/photo-1504829857797-ddff29c27927"], slots: 8 },
      { title: "A Week in Rajasthan", slug: "a-week-in-rajasthan", type: TourType.INBOUND, destination: "Rajasthan, India", itinerary: "Fort cities, desert skies and family kitchens", duration: 7, price: 1120, currency: "USD", images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245"], slots: 10 }
    ],
    skipDuplicates: true,
  });
}

main().finally(() => prisma.$disconnect());
