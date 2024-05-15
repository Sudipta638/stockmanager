import { connectToDatabase } from "@/utlis/db";
import { connect } from "http2";
import Image from "next/image";

export default function Home() {
  connectToDatabase();
  return (
    <div>
      <h1>Home</h1>
     fsfdsfdsf
    </div>
  );
}
