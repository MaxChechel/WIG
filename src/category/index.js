import { gsap } from "gsap";
import { Flip } from "gsap/all";
import ScrambleTextPlugin from "gsap/dist/ScrambleTextPlugin";

import videojs from "video.js";
import initVideo from "../utility/initVideo";

import navLinksHadler from "../utility/navLinksHandler";

gsap.registerPlugin(Flip, ScrambleTextPlugin);

const navTags = document.querySelectorAll(".navbar_tags-list a");
const navTagShape = document.querySelector(".navbar_tag-shape");

let mm = gsap.matchMedia();
document.addEventListener("DOMContentLoaded", () => {
  //Video

  //Mutation observer for new loaded items
  const cardsList = document.querySelector(".cards_list");
  const cardItems = document.querySelectorAll(".card_item");
  cardItems.forEach((item) => initVideo(item));

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          // Check if the added node is the type of element you want to animate
          if (node.nodeType === 1 && node.classList.contains("card_item")) {
            // ELEMENT_NODE
            // Apply animations
            console.log(node);
            initVideo(node);

            // Initialize other functionalities as needed
          }
        });
      }
    }
  });

  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsload",
    (listInstances) => {
      const categNum = document.querySelector(".category-h_num.is-num");
      categNum.textContent = listInstances[0].items.length;

      observer.observe(cardsList, {
        childList: true,
        subtree: true,
      });
    },
  ]);

  ///////////////

  navLinksHadler();
  //Hovers
  mm.add("(hover:hover)", () => {
    navTags.forEach(function (tag) {
      tag.addEventListener("mouseenter", function () {
        const state = Flip.getState(navTagShape, {
          props: "opacity",
          simple: true,
        });
        navTagShape.classList.add("is-active");
        navTags.forEach(function (item) {
          item.classList.remove("is-active");
        });
        tag.classList.add("is-active");

        this.appendChild(navTagShape);

        Flip.from(state, {
          absolute: true,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  });
});
