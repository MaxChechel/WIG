import { gsap } from "gsap";

export default function scramble(element, text) {
  const tl = gsap.timeline();
  tl.to(element, {
    duration: 0.4,
    scrambleText: {
      text: text,
      chars: "0123456789",
      revealDelay: 0,
      speed: 1,
    },
  });
}
