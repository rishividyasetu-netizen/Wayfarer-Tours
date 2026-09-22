import TripDiscoveryPage from "../components/TripDiscoveryPage";
import { nationalTrips } from "../components/tripData";

export default function NationalTripsPage() {
  return <TripDiscoveryPage kind="National" trips={nationalTrips} heroImage="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1800&q=85" intro="See India at its most vivid, from Himalayan valleys and royal desert cities to tropical backwaters, coastlines, and living heritage." />;
}
