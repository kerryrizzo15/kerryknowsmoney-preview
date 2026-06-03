const isGithubPreview = location.hostname.endsWith("github.io");

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

document.documentElement.classList.add("js");

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

const leadForm = document.querySelector(".lead-form");
const statusNode = document.querySelector(".form-status");
const revealNodes = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

leadForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (isGithubPreview) { statusNode.textContent = "Preview only: the waitlist form will be connected on Cloudflare."; return; }
  statusNode.textContent = "Sending...";

  const formData = new FormData(leadForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(leadForm.action, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Something went wrong.");
    }

    leadForm.reset();
    statusNode.textContent = "You are on the list.";
  } catch (error) {
    statusNode.textContent = error.message;
  }
});
