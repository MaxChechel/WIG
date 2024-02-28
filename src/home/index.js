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
  const videoElements = document.querySelectorAll(".video");

  videoElements.forEach((el) => {
    const player = videojs(el, {
      // Plugin options here
      // Example: enabling HTML5 playback with quality levels
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

    // Optionally, initialize the quality selector UI
    if (player.httpSourceSelector) {
      player.httpSourceSelector({
        default: "auto", // Set default quality level
      });
    }

    // Ensure the video is muted before playing
    player.muted(true);

    // Use Video.js events for handling mouse events
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
