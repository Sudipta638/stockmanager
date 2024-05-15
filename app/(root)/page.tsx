import Dashboard from "@/components/Dashboard";
import { connectToDatabase } from "@/utlis/db";
import { connect } from "http2";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Dashboard/>
    </div>
  );
}
