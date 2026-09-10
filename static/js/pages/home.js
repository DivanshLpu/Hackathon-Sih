document.addEventListener("DOMContentLoaded", async () => {
  renderPublicNavbar();
  renderFooter();

  const target = document.getElementById("featured-internships");

  try {
    const result = await API.get("/api/internships/featured");
    const items = result.data?.items || [];

    if (!items.length) {
      target.innerHTML = `<div class="col-12"><div class="empty-state"><h3>No internships available</h3><p>Check back later for new opportunities.</p></div></div>`;
      return;
    }

    target.innerHTML = items.map(item => `
      <div class="col-md-6 col-lg-4">
        <article class="app-card internship-card">
          <div class="d-flex justify-content-between gap-2 mb-2">
            <div>
              <h3 class="mb-1">${escapeHTML(item.title)}</h3>
              <div class="company-name">${escapeHTML(item.company?.name)}</div>
            </div>
            ${item.match?.percentage != null ? `<span class="status-badge status-success">${escapeHTML(item.match.percentage)}% match</span>` : ""}
          </div>
          <div class="meta-row mb-3">
            <span>${escapeHTML(item.location)}</span>
            <span>${escapeHTML(item.work_mode)}</span>
            <span>${escapeHTML(item.duration)}</span>
          </div>
          ${renderSkillTags(item.skills)}
          <div class="card-footer-area">
            <a class="btn btn-outline-custom w-100" href="pages/public/internship-details.html?id=${encodeURIComponent(item.id)}">View Details</a>
          </div>
        </article>
      </div>
    `).join("");
  } catch (error) {
    target.innerHTML = `<div class="col-12"><div class="alert alert-custom">${escapeHTML(error.message)}</div></div>`;
  }
});
