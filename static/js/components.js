function renderPublicNavbar(active = "") {
  const target = document.getElementById("public-navbar");
  if (!target) return;

  target.innerHTML = `
    <nav class="navbar navbar-expand-lg app-navbar">
      <div class="container app-container">
        <a class="navbar-brand brand d-flex align-items-center" href="${pageRoot()}index.html">
          <span class="brand-mark">I</span>InternX
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#publicNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="publicNav">
          <div class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <a class="nav-link nav-link-custom ${active === "internships" ? "active" : ""}" href="${pageRoot()}pages/public/internships.html">Internships</a>
            <a class="nav-link nav-link-custom ${active === "companies" ? "active" : ""}" href="${pageRoot()}pages/public/register.html?role=company">For Companies</a>
            <button class="icon-button ms-lg-2" type="button" onclick="toggleTheme()" aria-label="Toggle theme">◐</button>
            <a class="btn btn-outline-custom ms-lg-2" href="${pageRoot()}pages/public/login.html">Login</a>
            <a class="btn btn-primary-custom" href="${pageRoot()}pages/public/register.html">Register</a>
          </div>
        </div>
      </div>
    </nav>
  `;
}

function renderFooter() {
  const target = document.getElementById("public-footer");
  if (!target) return;
  target.innerHTML = `
    <footer class="footer">
      <div class="container app-container d-flex flex-wrap justify-content-between gap-3">
        <div>
          <div class="brand mb-1">InternX</div>
          <div class="small text-muted-custom">Skills, opportunities and industry connection.</div>
        </div>
        <div class="small text-muted-custom">© 2026 InternX</div>
      </div>
    </footer>
  `;
}

function pageRoot() {
  const path = window.location.pathname.replace(/\\/g, "/");
  if (path.includes("/pages/public/") || path.includes("/pages/student/") || path.includes("/pages/company/")) {
    return "../../";
  }
  return "";
}

function escapeHTML(value) {
  const div = document.createElement("div");
  div.textContent = value ?? "";
  return div.innerHTML;
}

function renderSkillTags(skills = []) {
  return `<div class="skill-list">${skills.map(skill => `<span class="skill-tag">${escapeHTML(typeof skill === "string" ? skill : skill.name)}</span>`).join("")}</div>`;
}

function statusClass(status) {
  const map = {
    accepted: "status-success",
    shortlisted: "status-info",
    pending: "status-warning",
    rejected: "status-danger",
    active: "status-success",
    closed: "status-danger",
    draft: "status-warning",
    expired: "status-danger"
  };
  return map[status] || "status-info";
}

function renderStatus(status) {
  return `<span class="status-badge ${statusClass(status)}">${escapeHTML(String(status).replaceAll("_", " "))}</span>`;
}

window.addEventListener("auth:unauthorized", () => {
  const publicPage = window.location.pathname.includes("/public/") || window.location.pathname.endsWith("index.html") || window.location.pathname === "/";
  if (!publicPage && !window.location.pathname.includes("/login.html")) {
    window.location.href = `${pageRoot()}pages/public/login.html`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const themeScript = document.createElement("script");
  themeScript.src = `${pageRoot()}js/theme.js`;
  document.head.appendChild(themeScript);
});
