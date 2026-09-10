document.addEventListener("DOMContentLoaded", async () => {
  const target = document.getElementById("dashboard");
  try {
    const result = await API.get("/api/student/dashboard");
    const data = result.data;

    document.getElementById("student-name").textContent = data.student?.name || "";
    document.getElementById("profile-completion").textContent = `${data.student?.profile_completion ?? 0}%`;
    document.getElementById("skills-count").textContent = data.statistics?.skills ?? 0;
    document.getElementById("applications-count").textContent = data.statistics?.applications ?? 0;
    document.getElementById("accepted-count").textContent = data.statistics?.accepted ?? 0;

    const rec = document.getElementById("recommended");
    const items = data.recommended_internships || [];
    rec.innerHTML = items.length ? items.map(item => `
      <div class="col-md-6 col-lg-4">
        <article class="app-card internship-card">
          <div class="d-flex justify-content-between gap-2 mb-2">
            <div><h3 class="mb-1">${escapeHTML(item.title)}</h3><div class="company-name">${escapeHTML(item.company?.name)}</div></div>
            <span class="status-badge status-success">${escapeHTML(item.match?.percentage ?? 0)}%</span>
          </div>
          <div class="meta-row mb-3">${escapeHTML(item.location)} · ${escapeHTML(item.work_mode)}</div>
          ${renderSkillTags(item.skills)}
          <div class="card-footer-area"><a class="btn btn-outline-custom w-100" href="../public/internship-details.html?id=${encodeURIComponent(item.id)}">View</a></div>
        </article>
      </div>
    `).join("") : `<div class="col-12"><div class="empty-state"><h3>No recommendations</h3><p>Complete more of your profile to receive recommendations.</p></div></div>`;

    const apps = document.getElementById("recent-applications");
    const applications = data.recent_applications || [];
    apps.innerHTML = applications.length ? applications.map(app => `
      <tr>
        <td>${escapeHTML(app.internship?.title)}</td>
        <td>${escapeHTML(app.company?.name)}</td>
        <td>${escapeHTML(app.applied_at)}</td>
        <td>${renderStatus(app.status)}</td>
      </tr>
    `).join("") : `<tr><td colspan="4" class="text-center text-muted-custom py-4">No applications yet.</td></tr>`;
  } catch (error) {
    target.innerHTML = `<div class="alert alert-custom">${escapeHTML(error.message)}</div>`;
  }
});
