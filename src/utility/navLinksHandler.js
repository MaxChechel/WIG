import { gsap } from "gsap";
import scramble from "./scrambleText";

export default function navLinksHadler() {
  //Nav links hover
  const navLinks = document.querySelectorAll(".navbar_link");
  const navMenus = document.querySelectorAll(".navbar_menu-container");
  const navTagShape = document.querySelector(".navbar_tag-shape");
  const navTags = document.querySelectorAll(".navbar_tags-list a");

  function scrambleIn(link) {
    const linkTextEl = link.querySelector(".navbar_link-text");
    if (link.getAttribute("data-nav-link") === "categories")
      scramble(linkTextEl, "Explore");
    if (link.getAttribute("data-nav-link") === "newsletter")
      scramble(linkTextEl, "Subscribe");
  }

  function scrambleOut(link) {
    const linkTextEl = link.querySelector(".navbar_link-text");
    if (!link.classList.contains("is-opened")) {
      if (link.getAttribute("data-nav-link") === "categories")
        scramble(linkTextEl, "Categories");
      if (link.getAttribute("data-nav-link") === "newsletter")
        scramble(linkTextEl, "Newsletter");
    } else scramble(linkTextEl, "Close");
  }

  function openNavMenu(link) {
    const name = link.getAttribute("data-nav-link");

    navMenus.forEach((menu) => {
      menu.getAttribute("data-nav-list") === name
        ? menu.classList.add("is-opened")
        : null;
      if (menu.classList.contains("is-opened")) {
        if (menu.getAttribute("data-nav-list") !== name) {
          const tlOut = gsap.timeline();
          const tlIn = gsap.timeline();
          tlOut
            .to(menu.querySelector(".navbar_menu-content-inner"), {
              opacity: 0,
            })
            .to(
              menu,
              {
                height: 0,
                duration: 0.8,
                ease: "power4.out",
              },
              "<10%"
            );
          if (menu.getAttribute("data-nav-list") === "categories") {
            navTags.forEach(function (item) {
              item.classList.remove("is-active");
            });
            navTagShape.classList.remove("is-active");
          }

          tlIn
            .to(
              `[data-nav-list=${name}]`,
              {
                height: "auto",
                duration: 0.8,
                ease: "power4.out",
              },
              0.2
            )
            .to(
              `[data-nav-list=${name}] .navbar_menu-content-inner`,
              {
                opacity: 1,
              },
              "<30%"
            );
        } else {
          const tl = gsap.timeline();

          tl.to(menu, {
            height: "auto",
            delay: 0.2,
            duration: 0.8,
            ease: "power4.out",
          })
            .to(
              ".navbar_logo-link, .navbar_component",
              {
                color: "#fff",
                duration: 0.25,
              },
              "<5%"
            )
            .to(
              menu.querySelector(".navbar_menu-content-inner"),
              {
                opacity: 1,
              },
              "<30%"
            );
        }
      }
    });
  }

  function linkClickHandler(link, e) {
    const linkTextEl = link.querySelector(".navbar_link-text");
    e.preventDefault();
    navLinks.forEach((link) => {
      if (link === e.currentTarget) {
        //If menu is not opened
        if (!link.classList.contains("is-opened")) {
          link.classList.add("is-opened");
          scramble(linkTextEl, "Close");
          openNavMenu(link);
        } else {
          //If menu is opened
          scrambleIn(link);
          const tl = gsap.timeline();

          tl.to(`[data-nav-list].is-opened .navbar_menu-content-inner`, {
            opacity: 0,
          })
            .to(
              `[data-nav-list].is-opened`,
              {
                height: 0,
                duration: 0.8,
                ease: "power4.in",
              },
              "<10%"
            )
            .to(
              " .navbar_component",
              {
                color: "#2d2d2b",
                duration: 0.25,
              },
              "<90%"
            )
            .to(
              ".navbar_logo-link",
              {
                color: "#3a8cf7",
                duration: 0.25,
              },
              "<0%"
            );

          link.classList.remove("is-opened");
          navTags.forEach(function (item) {
            item.classList.remove("is-active");
          });
          navTagShape.classList.remove("is-active");
        }
      } else if (link !== e.currentTarget) {
        if (link.classList.contains("is-opened")) {
          link.classList.remove("is-opened");
          scrambleIn(link);
        }
      }
    });
  }
  navLinks.forEach((link) => {
    const linkTextEl = link.querySelector(".navbar_link-text");
    //Hover in
    link.addEventListener("mouseenter", () => {
      if (link.classList.contains("is-opened")) {
        scramble(linkTextEl, "Close");
      } else scrambleIn(link);
    });
    //Hover out
    link.addEventListener("mouseleave", () => {
      scrambleOut(link);
    });

    //Click in

    link.addEventListener("click", (e) => linkClickHandler(link, e));
  });
}
