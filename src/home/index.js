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
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsload",
    (listInstances) => {
      observer.observe(cardsList, {
        childList: true,
        subtree: true,
      });
      const [listInstance] = listInstances;

      if (listInstance && listInstance.items) {
        listInstance.on("renderitems", () => {
          const items = listInstance.items;

          console.log("Current Items:", items);

          // Define the attribute value to find and the target index (6th position, 0-based index)
          const targetAttributeValue = "Webflow";
          const targetIndex = 5; // 6th position (0-based index)

          // Find the index of the item with the specific attribute
          const itemIndex = items.findIndex(
            (item) =>
              item.element.getAttribute("data-sponsor") === targetAttributeValue
          );

          if (itemIndex !== -1) {
            // Remove the item from its current position
            const [itemToMove] = items.splice(itemIndex, 1);

            // Check if the target index is within bounds
            if (targetIndex <= items.length) {
              items.splice(targetIndex, 0, itemToMove);
            } else {
              items.push(itemToMove); // If targetIndex is out of bounds, append to the end
            }

            listInstance.renderItems();
          } else {
            console.warn("Item with the specified attribute not found.");
          }
        });
      } else {
        console.warn("No items available in the list.");
      }
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
