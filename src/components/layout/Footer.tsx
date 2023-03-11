import { Component } from "solid-js";
import classes from "./Footer.module.css";

const Footer: Component = () => (
  <footer class=" bg-slate-300 py-2 text-sm text-slate-600">
    <div class="fluidContainer flex justify-between">
      <p>Physikal Calendar</p>
      <p>Opensoure Project</p>
    </div>
  </footer>
);

export default Footer;
