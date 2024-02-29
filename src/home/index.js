import { gsap } from "gsap";
import { Flip } from "gsap/all";
import ScrambleTextPlugin from "gsap/dist/ScrambleTextPlugin";

import videojs from "video.js";

import navLinksHadler from "../components/navLinksHandler";

gsap.registerPlugin(Flip, ScrambleTextPlugin);

const navTags = document.querySelectorAll(".navbar_tags-list a");
const navTagShape = document.querySelector(".navbar_tag-shape");

let mm = gsap.matchMedia();
document.addEventListener("DOMContentLoaded", () => {
  //Video
  document.querySelectorAll(".video").forEach((el) => {
    const player = videojs(el, {
      // Plugin options here
      html5: {
        hls: {
          overrideNative: !videojs.browser.IS_SAFARI,
        },
        dash: {
          overrideNative: true,
        },
      },
    });

    player.qualityLevels(); // Initialize quality levels

    player.on("loadedmetadata", function () {
      const qualityLevels = player.qualityLevels();

      let has720p = false;
      for (let i = 0; i < qualityLevels.length; i++) {
        const qualityLevel = qualityLevels[i];

        // Enable only the 720p quality level and disable others
        if (qualityLevel.height === 720) {
          qualityLevel.enabled = true;
          has720p = true;
          console.log("720p quality level enabled");
        } else {
          qualityLevel.enabled = false;
        }
      }

      if (!has720p) {
        console.log("720p quality level not found.");
        // Optionally enable all levels if 720p is not found
        for (let i = 0; i < qualityLevels.length; i++) {
          qualityLevels[i].enabled = true;
        }
      }
    });

    // Mute the video initially
    player.muted(true);

    // Video.js event handlers
    player.on("mouseenter", () => {
      player
        .play()
        .catch((e) =>
          console.log(`Error trying to play the video: ${e.message}`)
        );
    });

    player.on("mouseleave", () => {
      player.pause();
      player.currentTime(0); // Reset video progress to start
    });
  });

  //Mutation observer for new loaded items
  const cardsList = document.querySelector(".cards_list");
  const cardItems = document.querySelectorAll(".card_item");
  cardItems.forEach((card) => card.classList.add("is-active"));
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    "cmsload",
    (listInstances) => {
      console.log("cmsload Successfully loaded!");

      // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
      const [listInstance] = listInstances;
      console.log(listInstance);

      // The `renderitems` event runs whenever the list renders items after switching pages.
      listInstance.on("renderitems", (renderedItems) => {
        renderedItems.map((item) => item.classList);
        console.log(
          "The following items have been rendered on the Collection List: ",
          renderedItems
        );
      });
    },
  ]);
  // const observer = new MutationObserver((mutationsList, observer) => {
  //   for (const mutation of mutationsList) {
  //     if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
  //       mutation.addedNodes.forEach((node) => {
  //         // Check if the added node is the type of element you want to animate
  //         if (node.nodeType === 1) {
  //           // ELEMENT_NODE
  //           // Apply animations
  //           console.log(node);

  //           // If the node is a video element, initialize Video.js
  //           if (node.tagName === "VIDEO") {
  //             console.log(node);
  //             console.log("video");
  //           }

  //           // Initialize other functionalities as needed
  //         }
  //       });
  //     }
  //   }
  // });
  // setTimeout(() => {
  //   observer.observe(cardsList, {
  //     childList: true,
  //     subtree: true,
  //   });
  // }, 2000);
  // Start observing as before

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
