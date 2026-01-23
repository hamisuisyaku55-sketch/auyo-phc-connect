import dynamic from "next/dynamic";

const AuyoPHCConnectDemo = dynamic(() => import("../components/AuyoPHCConnectDemo"), { ssr: false });

export default function Home() {
  return <AuyoPHCConnectDemo />;
}
