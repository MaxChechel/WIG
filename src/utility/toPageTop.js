export default function toPageTop() {
  let isRefreshing = false;
  window.addEventListener("beforeunload", function () {
    isRefreshing = true;
  });
  window.addEventListener("unload", function () {
    if (isRefreshing) {
      window.scrollTo(0, 0);
    }
  });
}
