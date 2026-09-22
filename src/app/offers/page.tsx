import OffersPage from "../components/OffersPage";
import { travelOffers } from "../components/offerData";

export default function OffersRoute() {
  return <OffersPage offers={travelOffers} />;
}
