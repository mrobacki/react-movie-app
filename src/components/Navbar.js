import { useState } from "react";
import Logo from "./ui/Logo";
import Search from "./ui/Search";
import Result from "./navbar/Result";

export default function Navbar({ movies }) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <Result movies={movies} />
    </nav>
  );
}
