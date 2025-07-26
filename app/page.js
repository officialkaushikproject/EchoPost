import { connect } from "@/utils/db";

export default function Home() {
  connect();
  return (
    <div>
      Home Page
    </div>
  );
}
