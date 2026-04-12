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

    const projects = [...data.projects].sort((a, b) => b.featured - a.featured);

    const grid = document.getElementById('project-grid');
    grid.innerHTML = projects.map(p => `
      <a class="card${p.featured ? ' card--featured' : ''}"
         href="${p.url}"
         target="_blank"
         rel="noopener noreferrer">
        <h2>${p.title}</h2>
        <p>${p.description}</p>
        <div class="tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </a>
    `).join('');
  } catch (err) {
    document.getElementById('project-grid').innerHTML =
      `<p class="error">Błąd: ${err.message}</p>`;
  }
}

init();
