async function init() {
  try {
    const res = await fetch('./projects.json');
    if (!res.ok) throw new Error('Nie można załadować projektów.');
    const data = await res.json();

    document.title = data.owner.name + ' — Projekty';
    document.getElementById('owner-name').textContent = data.owner.name;
    document.getElementById('owner-tagline').textContent = data.owner.tagline;

    const nav = document.getElementById('owner-links');
    if (data.owner.github)
      nav.innerHTML += `<a href="${data.owner.github}" target="_blank" rel="noopener noreferrer">GitHub</a>`;
    if (data.owner.linkedin)
      nav.innerHTML += `<a href="${data.owner.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>`;
    if (data.owner.email)
      nav.innerHTML += `<a href="mailto:${data.owner.email}">Email</a>`;

    const projects = data.projects;

    const allTags = [...new Set(projects.flatMap(p => p.tags))].sort();

    const filters = document.getElementById('filters');
    filters.innerHTML = allTags.map(tag => `
      <label class="filter-label">
        <input type="checkbox" class="filter-cb" value="${tag}" checked>
        ${tag}
      </label>
    `).join('');

    const grid = document.getElementById('project-grid');

    function renderGrid() {
      const active = [...document.querySelectorAll('.filter-cb:checked')].map(cb => cb.value);
      const visible = projects.filter(p => p.tags.some(t => active.includes(t)));
      grid.innerHTML = visible.map(p => `
        <div class="card">
          <h2>${p.title}</h2>
          <p>${p.description}</p>
          <div class="tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="card-links">
            ${p.url ? `<a href="${p.url}" target="_blank" rel="noopener noreferrer">Aplikacja</a>` : ''}
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
          </div>
        </div>
      `).join('') || '<p class="empty">Brak projektów dla wybranych kategorii.</p>';
    }

    filters.addEventListener('change', renderGrid);
    renderGrid();
  } catch (err) {
    document.getElementById('project-grid').innerHTML =
      `<p class="error">Błąd: ${err.message}</p>`;
  }
}

init();
