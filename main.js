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
    const selected = new Set();

    const filters = document.getElementById('filters');
    filters.innerHTML = allTags.map(tag =>
      `<button class="filter-tag" data-tag="${tag}">${tag}</button>`
    ).join('');

    const grid = document.getElementById('project-grid');

    function renderGrid() {
      const visible = selected.size === 0
        ? projects
        : projects.filter(p => [...selected].every(t => p.tags.includes(t)));

      grid.innerHTML = visible.map(p => `
        <div class="card${p.url ? ' card--clickable' : ''}"
             ${p.url ? `onclick="window.open('${p.url.startsWith('http') ? p.url : 'https://' + p.url}','_blank','noopener,noreferrer')"` : ''}>
          <h2>${p.title}</h2>
          <p>${p.description}</p>
          <div class="tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="card-links">
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">GitHub</a>` : ''}
          </div>
        </div>
      `).join('') || '<p class="empty">Brak projektów dla wybranych kategorii.</p>';
    }

    filters.addEventListener('click', e => {
      const btn = e.target.closest('.filter-tag');
      if (!btn) return;
      const tag = btn.dataset.tag;
      if (selected.has(tag)) {
        selected.delete(tag);
        btn.classList.remove('filter-tag--active');
      } else {
        selected.add(tag);
        btn.classList.add('filter-tag--active');
      }
      renderGrid();
    });

    renderGrid();
  } catch (err) {
    document.getElementById('project-grid').innerHTML =
      `<p class="error">Błąd: ${err.message}</p>`;
  }
}

init();
