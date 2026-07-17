import { Suspense } from "react";
import NavbarComponent from "./NavbarComponent";

export default function Navbar() {
  return (
    <Suspense fallback={<nav className="h-20 bg-zinc-950 border-b border-zinc-900" />}>
      <NavbarComponent />
    </Suspense>
  );
}
