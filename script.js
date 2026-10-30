/* 1. FIND THE TABS, PANELS AND PROJECT SECTION */
const tabs = document.querySelectorAll(".project-tab");
const panels = document.querySelectorAll(".project-panel");
const projectsSection = document.querySelector("#projects");

/* 2. ACTIVATE A TAB */
function activateTab(selectedTab) {
  // Turn off the intro delay so the new panel shows up right away.
  projectsSection.classList.add("is-visible");

  // Update every tab button.
  tabs.forEach((tab) => {
    const isSelected = tab === selectedTab;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  });

  // Show only the panel linked to the selected button.
  const panelId = selectedTab.getAttribute("aria-controls");
  panels.forEach((panel) => {
    panel.hidden = panel.id !== panelId;
  });
}

/* 3. HANDLE MOUSE CLICKS */
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateTab(tab);
  });
});

/* 4. SUPPORT KEYBOARD NAVIGATION */
tabs.forEach((tab, index) => {
  tab.addEventListener("keydown", (event) => {
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    tabs[nextIndex].focus();
    activateTab(tabs[nextIndex]);
  });
});

/* 5. LET VISITORS SKIP THE INTRO */
const skipButton = document.querySelector("#skip-intro");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

skipButton.addEventListener("click", () => {
  // Reveal the tabs immediately.
  projectsSection.classList.add("is-visible");

  // Move the visitor down to the project section.
  projectsSection.scrollIntoView({
    behavior: reducedMotion.matches ? "auto" : "smooth",
    block: "start"
  });
});