import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col">
        This is the dashboard!
        <Link href="/">back to main page</Link>
    </div>
  );
}
