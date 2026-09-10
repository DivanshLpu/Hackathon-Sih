document.addEventListener("DOMContentLoaded", async () => {
  renderPublicNavbar("internships");
  renderFooter();

  const id = new URLSearchParams(window.location.search).get("id");
  const target = document.getElementById("details");

  if (!id) {
    target.innerHTML = `<div class="alert alert-custom">Internship ID is missing.</div>`;
    return;
  }

  try {
    const result = await API.get(`/api/internships/${encodeURIComponent(id)}`);
    const item = result.data;

    let matchHTML = "";
    try {
      const match = await API.get(`/api/internships/${encodeURIComponent(id)}/match`);
      if (match.data) {
        matchHTML = `
          <div class="app-card">
            <h3>Your skill match</h3>
            <div class="display-6 fw-bold mb-3">${escapeHTML(match.data.percentage)}%</div>
            <div class="small fw-semibold mb-2">Matched</div>
            ${renderSkillTags(match.data.matched_skills)}
            <div class="small fw-semibold mt-3 mb-2">Missing</div>
            ${renderSkillTags(match.data.missing_skills)}
          </div>
        `;
      }
    } catch (_) {
      // Public visitors may not have match access.
    }

    target.innerHTML = `
      <div class="row g-4">
        <div class="col-lg-8">
          <div class="page-header">
            <div class="company-name mb-2">${escapeHTML(item.company?.name)}</div>
            <h1>${escapeHTML(item.title)}</h1>
            <div class="meta-row">${escapeHTML(item.location)} · ${escapeHTML(item.work_mode)} · ${escapeHTML(item.duration)}</div>
          </div>
          <div class="app-card mb-3">
            <h3>About the role</h3>
            <p>${escapeHTML(item.description)}</p>
            <h3 class="mt-4">Responsibilities</h3>
            <ul>${(item.responsibilities || []).map(x => `<li>${escapeHTML(x)}</li>`).join("")}</ul>
            <h3 class="mt-4">Required skills</h3>
            ${renderSkillTags(item.required_skills || [])}
            <h3 class="mt-4">Preferred skills</h3>
            ${renderSkillTags(item.preferred_skills || [])}
          </div>
        </div>
        <div class="col-lg-4">
          ${matchHTML}
          <div class="app-card mt-3">
            <div class="small text-muted-custom">Stipend</div>
            <div class="fw-semibold mb-3">${item.stipend != null ? "₹" + Number(item.stipend).toLocaleString("en-IN") : "Not specified"}</div>
            <div class="small text-muted-custom">Application deadline</div>
            <div class="fw-semibold mb-3">${escapeHTML(item.deadline || "Not specified")}</div>
            <a href="../public/login.html" class="btn btn-primary-custom w-100">Login to Apply</a>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    target.innerHTML = `<div class="alert alert-custom">${escapeHTML(error.message)}</div>`;
  }
});
