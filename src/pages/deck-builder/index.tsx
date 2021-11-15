import dynamic from "next/dynamic";

const DeckBuilder = dynamic(
  () => import("components/DeckBuilder/DeckBuilder"),
  { ssr: false }
);

const DeckBuilderPage = () => {
  return <DeckBuilder />;
};

export default DeckBuilderPage;
