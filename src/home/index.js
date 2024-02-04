import { gsap } from "gsap";
import { Flip } from "gsap/all";
import ScrambleTextPlugin from "gsap/dist/ScrambleTextPlugin";

gsap.registerPlugin(Flip, ScrambleTextPlugin);

let mm = gsap.matchMedia();
document.addEventListener("DOMContentLoaded", () => {
  //Hovers
  mm.add("(hover:hover)", () => {
    //Inline links hover
    const inlineLinks = document.querySelectorAll(".navbar_link");
    inlineLinks.forEach((link) => {
      const textItem = link.querySelector(".inline-link_text");
      const text = textItem.textContent;

      link.addEventListener("mouseover", () => {
        setTimeout(() => {
          scramble(textItem, "Send message");
        }, 150);
      });
      link.addEventListener("mouseleave", () => {
        setTimeout(() => {
          scramble(textItem, text);
        }, 150);
      });
    });
  });
});
