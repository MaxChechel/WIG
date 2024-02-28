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

      let has480p = false;
      for (let i = 0; i < qualityLevels.length; i++) {
        const qualityLevel = qualityLevels[i];

        // Enable only the 720p quality level and disable others
        if (qualityLevel.height === 480) {
          qualityLevel.enabled = true;
          has480p = true;
          console.log("480p quality level enabled");
        } else {
          qualityLevel.enabled = false;
        }
      }

      if (!has480p) {
        console.log("480p quality level not found.");
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
