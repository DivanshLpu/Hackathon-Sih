document.addEventListener("DOMContentLoaded", async () => {
  renderPublicNavbar("internships");
  renderFooter();

  const list = document.getElementById("internship-list");
  const form = document.getElementById("filter-form");
  const pagination = document.getElementById("pagination");

  async function load(page = 1) {
    list.innerHTML = `<div class="col-12"><div class="loading-skeleton skeleton-lg"></div></div>`;

    const params = new URLSearchParams({
      page,
      per_page: 9,
      search: form.search.value.trim(),
      skill: form.skill.value.trim(),
      location: form.location.value.trim(),
      work_mode: form.work_mode.value,
      sort: form.sort.value
    });

    try {
      const result = await API.get(`/api/internships?${params.toString()}`);
      const items = result.data?.items || [];
      const pageInfo = result.data?.pagination;

      if (!items.length) {
        list.innerHTML = `<div class="col-12"><div class="empty-state"><h3>No internships found</h3><p>Try changing your search or filters.</p></div></div>`;
      } else {
        list.innerHTML = items.map(item => `
          <div class="col-md-6 col-lg-4">
            <article class="app-card internship-card">
              <div class="d-flex justify-content-between gap-2 mb-2">
                <div>
                  <h3 class="mb-1">${escapeHTML(item.title)}</h3>
                  <div class="company-name">${escapeHTML(item.company?.name)}</div>
                </div>
                ${item.match?.percentage != null ? `<span class="status-badge status-success">${escapeHTML(item.match.percentage)}%</span>` : ""}
              </div>
              <div class="meta-row mb-3">
                <span>${escapeHTML(item.location)}</span>
                <span>${escapeHTML(item.work_mode)}</span>
              </div>
              ${renderSkillTags(item.skills)}
              <div class="card-footer-area">
                <a class="btn btn-primary-custom w-100" href="internship-details.html?id=${encodeURIComponent(item.id)}">View Internship</a>
              </div>
            </article>
          </div>
        `).join("");
      }

      renderPagination(pagination, pageInfo, load);
    } catch (error) {
      list.innerHTML = `<div class="col-12"><div class="alert alert-custom">${escapeHTML(error.message)}</div></div>`;
      pagination.innerHTML = "";
    }
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    load(1);
  });

  await load(1);
});

function renderPagination(target, info, callback) {
  if (!info || info.pages <= 1) {
    target.innerHTML = "";
    return;
  }

  let html = "";
  for (let i = 1; i <= info.pages; i++) {
    html += `<button class="btn ${i === info.page ? "btn-primary-custom" : "btn-outline-custom"} btn-sm" data-page="${i}">${i}</button>`;
  }
  target.innerHTML = html;
  target.querySelectorAll("[data-page]").forEach(btn => {
    btn.addEventListener("click", () => callback(Number(btn.dataset.page)));
  });
}
