export type TripCategory = "International" | "National";

export type DiscoveryTrip = {
  id: string;
  title: string;
  category: TripCategory;
  destination: string;
  duration: number;
  price: number;
  currency: "INR";
  image: string;
  description: string;
};

export const internationalTrips: DiscoveryTrip[] = [
  { id: "european-summer-tour", title: "European Summer Tour", category: "International", destination: "Paris, Swiss Alps & Rome", duration: 10, price: 210000, currency: "INR", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85", description: "Iconic cities, alpine scenery and long golden evenings." },
  { id: "thailand-escape", title: "Thailand Escape", category: "International", destination: "Bangkok & Phuket", duration: 7, price: 100000, currency: "INR", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1400&q=85", description: "Temple mornings, island waters and vibrant local flavours." },
  { id: "bali-slow-life", title: "Bali Slow Life", category: "International", destination: "Ubud & Nusa Dua", duration: 6, price: 82000, currency: "INR", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85", description: "Rice terraces, thoughtful stays and unhurried coastal days." },
  { id: "dubai-signature", title: "Dubai Signature", category: "International", destination: "Dubai, UAE", duration: 5, price: 75000, currency: "INR", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1400&q=85", description: "Skyline glamour, desert horizons and warm Arabian hospitality." },
  { id: "maldives-blue", title: "Maldives Blue", category: "International", destination: "North Male Atoll", duration: 5, price: 150000, currency: "INR", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85", description: "Barefoot island living, reef adventures and quiet blue water." },
  { id: "japan-in-season", title: "Japan In Season", category: "International", destination: "Tokyo, Kyoto & Osaka", duration: 9, price: 245000, currency: "INR", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1400&q=85", description: "Ancient streets, design culture and remarkable seasonal food." },
];

export const nationalTrips: DiscoveryTrip[] = [
  { id: "north-east-india", title: "North East India Explorer", category: "National", destination: "Sikkim, Meghalaya & Assam", duration: 8, price: 64900, currency: "INR", image: "https://images.unsplash.com/photo-1470214304380-aadaedcfff1b?auto=format&fit=crop&w=1400&q=85", description: "Himalayan roads, cloud forests and remarkable local cultures." },
  { id: "golden-triangle", title: "Golden Triangle", category: "National", destination: "Delhi, Agra & Jaipur", duration: 6, price: 38900, currency: "INR", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=85", description: "India's essential first journey through three unforgettable cities." },
  { id: "kerala-backwaters", title: "Kerala Backwaters", category: "National", destination: "Kochi, Munnar & Alleppey", duration: 7, price: 45900, currency: "INR", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=85", description: "Tea country, tropical waterways and the ease of the south." },
  { id: "rajasthan-royal", title: "Royal Rajasthan", category: "National", destination: "Jodhpur, Jaisalmer & Udaipur", duration: 8, price: 52900, currency: "INR", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=85", description: "Fortresses, desert skies and storied heritage stays." },
  { id: "goa-coastal", title: "Goa Coastal Days", category: "National", destination: "North & South Goa", duration: 5, price: 29900, currency: "INR", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=85", description: "Palm-lined shores, old churches and easy coastal living." },
  { id: "himachal-highlands", title: "Himachal Highlands", category: "National", destination: "Shimla, Manali & Spiti", duration: 8, price: 49900, currency: "INR", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=85", description: "Mountain passes, pine forests and clear Himalayan air." },
];

