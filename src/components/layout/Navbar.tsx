import { Link } from "@solidjs/router";
import { Component } from "solid-js";

const Navbar: Component = () => (
  <nav class="fixed top-0 w-full bg-primary">
    <ul class="flex fluidContainer w-min justify-center items-center text-white">
      <li>
        <Link class="px-6 py-2 block font-bold text-xl" href="/">
          Graphik
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
