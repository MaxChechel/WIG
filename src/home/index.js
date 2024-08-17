import { gsap } from "gsap";
import { Flip } from "gsap/all";
import ScrambleTextPlugin from "gsap/dist/ScrambleTextPlugin";

import videojs from "video.js";
import initVideo from "../utility/initVideo";
import tagsCount from "../utility/tagsCount";

import navLinksHadler from "../utility/navLinksHandler";
import toPageTop from "../utility/toPageTop";

gsap.registerPlugin(Flip, ScrambleTextPlugin);

const navTags = document.querySelectorAll(".navbar_tags-list a");
const navTagShape = document.querySelector(".navbar_tag-shape");

let mm = gsap.matchMedia();
document.addEventListener("DOMContentLoaded", () => {
  toPageTop();
  tagsCount();

  //Mutation observer for new loaded items
  const cardsList = document.querySelector(".cards_list");
  const cardItems = document.querySelectorAll(".card_item:not(.is-sponsor)");
  cardItems.forEach((item) => initVideo(item));

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          // Check if the added node is the type of element you want to animate
          if (node.nodeType === 1 && node.classList.contains("card_item")) {
            // ELEMENT_NODE
            initVideo(node);
          }
        });
      }
    }
  });

  // window.fsAttributes = window.fsAttributes || [];
  // window.fsAttributes.push([
  //   "cmsload",
  //   (listInstances) => {
  //     observer.observe(cardsList, {
  //       childList: true,
  //       subtree: true,
  //     });
  //     const [listInstance] = listInstances;

  //     console.log(listInstance.items);
  //   },
  // ]);
  let hasRendered = false;
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsload",
    (listInstances) => {
      const [listInstance] = listInstances;

      // Listen for the 'renderitems' event to ensure items are fully rendered
      listInstance.on("renderitems", () => {
        // Select the container of the items
        const container = listInstance.wrapper; // The container that holds the items

        // Get current DOM elements
        const elements = Array.from(container.children);

        // Define the attribute value to find and the target index (6th position, 0-based index)
        const targetAttributeValue = "Webflow";
        const targetIndex = 5; // 6th position (0-based index)

        // Find the item with the specific attribute
        const itemToMove = elements.find(
          (element) =>
            element.getAttribute("data-sponsor") === targetAttributeValue
        );

        // Find the 5th item (6th position, 0-based index)
        const fifthItem = elements[targetIndex];

        // Move the item to the position after the 5th item
        container.insertBefore(itemToMove, fifthItem.nextSibling);

        !hasRendered ? listInstance.renderItems() : (hasRendered = true);
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
