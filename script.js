const isGithubPreview = location.hostname.endsWith("github.io");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

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

leadForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (isGithubPreview) { statusNode.textContent = "Preview only: the waitlist form will be connected on Cloudflare."; return; }`n  statusNode.textContent = "Sending...";

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
