import { DiscoveryTrip } from "./tripData";

export type TravelOffer = DiscoveryTrip & {
  originalPrice: number;
  discount: string;
};

export const travelOffers: TravelOffer[] = [
  { id: "europe-summer-offer", title: "European Summer Escape", category: "International", destination: "Paris, Swiss Alps & Rome", duration: 10, price: 168000, originalPrice: 210000, currency: "INR", discount: "20% off", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85", description: "A classic European route with more room to wander." },
  { id: "kerala-monsoon-offer", title: "Kerala Monsoon Special", category: "National", destination: "Munnar & Alleppey", duration: 6, price: 32900, originalPrice: 38900, currency: "INR", discount: "Save 15%", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=85", description: "Misty tea country and quiet backwater mornings." },
  { id: "bali-island-offer", title: "Bali Island Retreat", category: "International", destination: "Ubud & Nusa Dua", duration: 6, price: 67000, originalPrice: 82000, currency: "INR", discount: "Save 15%", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85", description: "A restorative island stay built around slow discovery." },
  { id: "rajasthan-royal-offer", title: "Royal Rajasthan", category: "National", destination: "Jodhpur & Udaipur", duration: 7, price: 44900, originalPrice: 52900, currency: "INR", discount: "Save 15%", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=85", description: "Heritage hotels, golden forts, and desert skies." },
  { id: "maldives-blue-offer", title: "Maldives Blue", category: "International", destination: "North Male Atoll", duration: 5, price: 125000, originalPrice: 150000, currency: "INR", discount: "Save 17%", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85", description: "Barefoot days in one of the world's clearest lagoons." },
  { id: "himachal-highlands-offer", title: "Himachal Highlands", category: "National", destination: "Shimla & Manali", duration: 7, price: 41900, originalPrice: 49900, currency: "INR", discount: "Save 16%", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=85", description: "Pine forests, mountain roads, and bright Himalayan air." },
];
