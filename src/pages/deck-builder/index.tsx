import dynamic from "next/dynamic";
import Loader from "components/Common/Loader";

const DeckBuilder = dynamic(
  () => import("components/DeckBuilder/DeckBuilder"),
  { ssr: false, loading: () => <Loader /> }
);

const DeckBuilderPage = () => {
  return <DeckBuilder />;
};

export default DeckBuilderPage;
