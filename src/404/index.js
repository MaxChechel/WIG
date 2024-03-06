import { gsap } from "gsap";
import { Flip } from "gsap/all";
import ScrambleTextPlugin from "gsap/dist/ScrambleTextPlugin";

import tagsCount from "../utility/tagsCount";
import navLinksHadler from "../components/navLinksHandler";

gsap.registerPlugin(Flip, ScrambleTextPlugin);

fetch("/")
  .then((response) => {
    // Check if the request was successful
    if (response.ok) {
      return response.text(); // Return the response text (HTML content)
    }
    throw new Error("Network response was not ok.");
  })
  .then((html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Example: Count elements with a specific class
    const nav = doc.querySelector(".navbar_wrapper");
    document.querySelector(".nav_404").append(nav);
  })
  .then(() => {
    tagsCount();
    navLinksHadler();
  })
  .catch((error) => {
    console.error("Error fetching page:", error);
  });
