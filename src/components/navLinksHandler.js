import { gsap } from "gsap";
import scramble from "./scrambleText";

export default function navLinksHadler() {
  //Nav links hover
  const nav = document.querySelector(".navbar_component");
  const navLinks = document.querySelectorAll(".navbar_link");
  const navMenus = document.querySelectorAll(".navbar_menu-container");

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

  function removeOpenedClas() {
    navLinks.forEach((link) => {
      link.classList.remove("is-opened");
    });
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
          tlOut.to(menu, {
            height: 0,
            duration: 0.8,
            ease: "power4.out",
          });
          tlIn.to(
            `[data-nav-list=${name}]`,
            {
              height: "auto",
              duration: 0.8,
              ease: "power4.out",
            },
            0.2
          );
        } else {
          const tl = gsap.timeline();
          tl.to(menu, {
            height: "auto",
            delay: 0.2,
            duration: 0.8,
            ease: "power4.out",
          }).call(() => {
            nav.classList.add("is-active");
          }, "+=0.2");
        }
      }
    });
  }
  function closeNavMenu(link) {
    const name = link.getAttribute("data-nav-link");
    gsap.to(`[data-nav-list]`, {
      height: 0,
      top: "auto",
      duration: 1,
      ease: "power4.out",
    });
  }

  navLinks.forEach((link) => {
    const linkTextEl = link.querySelector(".navbar_link-text");
    //Hover in
    link.addEventListener("mouseenter", () => {
      console.log("test");
      if (link.classList.contains("is-opened")) {
        scramble(linkTextEl, "Close");
      } else scrambleIn(link);
    });
    //Hover out
    link.addEventListener("mouseleave", () => {
      scrambleOut(link);
    });

    //Click in
    link.addEventListener("click", (e) => {
      navLinks.forEach((link) => {
        const name = link.getAttribute("data-nav-link");
        const dropdown = document.querySelector(`[data-nav-list=${name}]`);

        if (link === e.currentTarget) {
          if (!link.classList.contains("is-opened")) {
            link.classList.add("is-opened");
            //dropdown.classList.add("is-opened");
            scramble(linkTextEl, "Close");
            // closeNavMenu(link);
            openNavMenu(link);
          } else {
            scrambleIn(linkTextEl);
            const tl = gsap.timeline();
            tl.to(`[data-nav-list].is-opened`, {
              height: 0,
              duration: 0.8,
              ease: "power4.in",
            }).call(() => {
              nav.classList.remove("is-active");
            }, "+=0.2");
            //   .to(
            //     ".blog-list_question h3",
            //     {
            //       opacity: 0,
            //       stagger: { each: 0.05, start: "end" },
            //     },
            //     0.2
            //   )
            //   .to(
            //     ".blog-list_divider",
            //     {
            //       opacity: 0,
            //       width: "0%",
            //       stagger: { each: 0.05, start: "end" },
            //     },
            //     0.2
            //   );
            link.classList.remove("is-opened");
          }
        } else if (link !== e.currentTarget) {
          if (link.classList.contains("is-opened")) {
            link.classList.remove("is-opened");
            scrambleIn(linkTextEl);
          }
        }
      });
    });
  });
}
