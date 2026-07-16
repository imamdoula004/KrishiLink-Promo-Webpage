"use client";

import dynamic from "next/dynamic";

const PromoPageContent = dynamic(
  () => import("../components/PromoPageContent"),
  { ssr: false }
);

export default function Home() {
  return <PromoPageContent />;
}
