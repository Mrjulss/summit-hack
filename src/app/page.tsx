"use client"

import { useState } from "react";
import LogoItem from "./components/logo-item";
import Searchbar from "./components/searchbar";
import { UserSelection } from "./components/user-selection";
import { UserType } from "./dashboard/types/userTypes";

export default function Home() {

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
        <LogoItem name="Wealthy"/>
        <Searchbar/>
    </div>
  );
}
