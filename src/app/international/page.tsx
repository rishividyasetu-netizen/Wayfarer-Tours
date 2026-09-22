import TripDiscoveryPage from "../components/TripDiscoveryPage";
import { internationalTrips } from "../components/tripData";

export default function InternationalTripsPage() {
  return <TripDiscoveryPage kind="International" trips={internationalTrips} heroImage="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1800&q=85" intro="Cross borders with thoughtfully planned journeys through iconic cities, island escapes, and places that stay with you long after you return." />;
}
