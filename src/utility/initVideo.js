import videojs from "video.js";

export default function initVideo(target) {
  const el = target.querySelector(".video");
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
  target.addEventListener("mouseenter", () => {
    player
      .play()
      .catch((e) =>
        console.log(`Error trying to play the video: ${e.message}`)
      );
  });

  target.addEventListener("mouseleave", () => {
    player.pause();
    player.currentTime(0); // Reset video progress to start
  });
}
