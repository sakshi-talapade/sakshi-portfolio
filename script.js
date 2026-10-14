const projectData = {
  copilot: {
    kicker: "PRODUCT · AI / NLP · IN PROGRESS",
    title: "AI Job Application Copilot",
    summary: "A product concept and in-progress build exploring how candidates can compare job opportunities, understand role fit, and identify skill gaps.",
    detail: "<strong>Problem</strong><br>Job seekers can struggle to prioritise roles and understand why a job is or isn't a good fit.<br><br><strong>Approach</strong><br>Explore profile-to-job matching using NLP and embeddings, with explainable ranking signals such as skill similarity, experience fit, and role preferences.<br><br><strong>Success measures to evaluate</strong><br>Recommendation relevance, ranking quality, skill-gap usefulness, and application intent.<br><br><strong>Status</strong><br>In progress. The final case study will distinguish implemented functionality from planned evaluation."
  },
  analytics: {
    kicker: "ANALYTICS · SQL · PRACTICE PROJECT",
    title: "Funnel & Growth Analytics",
    summary: "A simulated food-delivery checkout scenario used to practise funnel diagnosis, metric definition, and experiment design.",
    detail: "<strong>Question</strong><br>At which step might users be dropping out of the checkout journey?<br><br><strong>Approach</strong><br>Define funnel events, calculate step-to-step conversion, segment the journey, and investigate plausible friction points before proposing a test.<br><br><strong>Deliverables to build</strong><br>SQL analysis, a compact dashboard, a prioritised hypothesis, and an experiment plan.<br><br><strong>Transparency</strong><br>This is a practice scenario. No real company data or measured business impact is claimed."
  },
  strategy: {
    kicker: "LEADERSHIP · MARKETING & PR · E-CELL IIT MADRAS",
    title: "Building campaigns at E-Cell, IIT Madras",
    summary: "A leadership story about creating campaigns that connect entrepreneurship with rural communities, technology, art, and sustainable livelihoods.",
    detail: "<strong>Role</strong><br>Lead, Marketing & PR Department for two years; founded the UDAAN and In-Verse campaigns.<br><br><strong>What this can demonstrate</strong><br>Campaign framing, stakeholder coordination, storytelling, team leadership, and translating a broad mission into activities.<br><br><strong>Next step</strong><br>Add verified campaign details, specific contributions, and any defensible reach or participation figures from the resume or original records."
  }
};

const cards = [...document.querySelectorAll(".project-card")];
const filters = [...document.querySelectorAll(".filter")];
filters.forEach(button => button.addEventListener("click", () => {
  filters.forEach(item => item.classList.toggle("active", item === button));
  const selected = button.dataset.filter;
  cards.forEach(card => {
    const show = selected === "all" || card.dataset.category === selected;
    card.classList.toggle("hidden", !show);
  });
}));

const dialog = document.getElementById("projectDialog");
const titleEl = document.getElementById("dialogTitle");
const kickerEl = document.getElementById("dialogKicker");
const summaryEl = document.getElementById("dialogSummary");
const detailEl = document.getElementById("dialogDetail");
function openProject(card) {
  const category = card.dataset.category;
  const key = category === "product" ? "copilot" : category === "analytics" ? "analytics" : "strategy";
  const data = projectData[key];
  kickerEl.textContent = data.kicker;
  titleEl.textContent = data.title;
  summaryEl.textContent = data.summary;
  detailEl.innerHTML = data.detail;
  dialog.showModal();
}
cards.forEach(card => {
  card.addEventListener("click", () => openProject(card));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(card);
    }
  });
});
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.textContent = isDark ? "☼" : "◐";
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}
