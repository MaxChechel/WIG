export default function tagsCount() {
  const navTags = document.querySelectorAll(".tag.is-counter");

  navTags.forEach((tag) => {
    const slug = tag.getAttribute("data-tag-slug");
    const tagCounter = tag.querySelector(".tag_counter");
    fetch(`/category/${slug}`)
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
        const itemCount = doc.querySelectorAll(".category-count").length;
        if (itemCount === 0) {
          tag.remove();
        } else {
          tagCounter.textContent = itemCount;
        }

        // You can now manipulate or extract data from 'doc' as needed
      })
      .catch((error) => {
        console.error("Error fetching page:", error);
      });
  });
}
