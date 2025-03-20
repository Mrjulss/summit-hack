import Link from "next/link";
import LogoItem from "./components/logo-item";
import Searchbar from "./components/searchbar";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
        <LogoItem name="Wealthy"/>
        <Searchbar/>
    </div>
  );
}
