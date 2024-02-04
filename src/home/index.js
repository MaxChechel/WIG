import { gsap } from "gsap";
import { Flip } from "gsap/all";
import ScrambleTextPlugin from "gsap/dist/ScrambleTextPlugin";

import navLinksHadler from "../components/navLinksHandler";

gsap.registerPlugin(Flip, ScrambleTextPlugin);

let mm = gsap.matchMedia();
document.addEventListener("DOMContentLoaded", () => {
  //Hovers
  mm.add("(hover:hover)", () => {
    navLinksHadler();
  });
});
