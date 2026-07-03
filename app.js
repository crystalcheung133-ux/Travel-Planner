const trip = {
  version: '2.3 Candidate',
  participants: ['Christal', 'Crystal', 'Mero', 'Vivian'],
  days: [
    {
      id: 'day1',
      title: 'Day 1',
      subtitle: 'Arrival · Phở SOL · Nha Suga Spa · Omakase Tiger',
      items: ['Airport arrival + hotel drop-off', 'Phở SOL first meal', 'Nha Suga Spa reset', 'Omakase Tiger sunset dinner']
    },
    {
      id: 'day2',
      title: 'Day 2',
      subtitle: 'Cooking Class · Mộc Kim Spa · Shopping · LÚNE',
      items: ['Saigon Cooking Class', 'Mộc Kim Spa & Beauty', 'Nguyễn Trãi / designer shopping', 'LÚNE dinner']
    },
    {
      id: 'day3',
      title: 'Day 3',
      subtitle: 'Crab noodles · Thảo Điền · Little Bear',
      items: ['Bánh canh cua Bà Ba', 'Thảo Điền browsing', 'Cafe / boutique window', 'Little Bear dinner']
    },
    {
      id: 'day4',
      title: 'Day 4',
      subtitle: 'War Museum · Pink Church · Shopping · Quince',
      items: ['War Remnants Museum', 'Pink Church / District 3', 'Trần Quang Diệu boutiques', 'Quince farewell dinner']
    },
    {
      id: 'day5',
      title: 'Day 5',
      subtitle: 'Phở Việt Nam · Bếp Mẹ Ỉn · Airport Spa',
      items: ['Phở Việt Nam breakfast', 'Final local lunch', 'Spa before airport', 'Evening flight home']
    },
    {
      id: 'overall',
      title: 'Overall Review',
      subtitle: 'Whole-trip rhythm, budget, balance, and must-change points',
      items: ['Favourite part', 'Main concern', 'Anything missing', 'Final comments']
    },
    {
      id: 'approval',
      title: 'Final Approval',
      subtitle: 'Approve this itinerary version or request another discussion',
      items: ['Approved', 'Approved with minor changes', 'Needs another discussion']
    }
  ]
};

const storageKey = 'journeyPlannerReviewsV01';
const app = document.querySelector('#app');
const templates = {
  home: document.querySelector('#home-template'),
  dashboard: document.querySelector('#dashboard-template'),
  review: document.querySelector('#review-template'),
  admin: document.querySelector('#admin-template')
};

function getReviews() {
  return JSON.parse(localStorage.getItem(storageKey) || '{}');
}

function setReviews(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

function route(name, params = {}) {
  app.innerHTML = '';
  const view = templates[name].content.cloneNode(true);
  app.appendChild(view);
  if (name === 'dashboard') renderDashboard();
  if (name === 'review') renderReview(params.id || 'day1');
  if (name === 'admin') renderAdmin();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completionByPerson(reviews) {
  const required = trip.days.map(day => day.id);
  return trip.participants.map(person => {
    const count = required.filter(dayId => reviews[dayId]?.[person]).length;
    return { person, count, completed: count === required.length };
  });
}

function renderDashboard() {
  const reviews = getReviews();
  const people = completionByPerson(reviews);
  const completed = people.filter(p => p.completed).length;
  const percent = Math.round((completed / trip.participants.length) * 100);

  document.querySelector('#progress-number').textContent = `${percent}%`;
  document.querySelector('#participant-progress').textContent = `${completed} / ${trip.participants.length} completed`;
  document.querySelector('#progress-bar').style.width = `${percent}%`;

  const participantWrap = document.querySelector('#participants');
  participantWrap.innerHTML = people.map(p => `
    <article class="person-card">
      <strong>${p.person}</strong>
      <span class="status-pill ${p.completed ? 'done' : 'pending'}">${p.completed ? 'Completed' : `${p.count} / ${trip.days.length}`}</span>
    </article>
  `).join('');

  const dayGrid = document.querySelector('#day-grid');
  dayGrid.innerHTML = trip.days.map(day => {
    const dayReviews = reviews[day.id] || {};
    const count = Object.keys(dayReviews).length;
    const hasIssue = Object.values(dayReviews).some(r => r.status === 'Needs discussion');
    const pill = hasIssue ? '<span class="status-pill issue">Needs review</span>' : `<span class="status-pill ${count ? 'done' : 'pending'}">${count} / 4 submitted</span>`;
    return `
      <article class="day-card">
        <div>
          ${pill}
          <h4>${day.title}</h4>
          <p>${day.subtitle}</p>
        </div>
        <button class="secondary-btn" data-review="${day.id}">Review →</button>
      </article>
    `;
  }).join('');

  document.querySelectorAll('[data-review]').forEach(btn => {
    btn.addEventListener('click', () => route('review', { id: btn.dataset.review }));
  });

  document.querySelector('#reset-demo').addEventListener('click', () => {
    if (confirm('Reset all demo review data?')) {
      localStorage.removeItem(storageKey);
      renderDashboard();
    }
  });
}

function renderReview(dayId) {
  const day = trip.days.find(d => d.id === dayId) || trip.days[0];
  document.querySelector('#review-title').textContent = day.title;
  document.querySelector('#review-summary').textContent = day.subtitle;
  document.querySelector('#review-version').textContent = `Version ${trip.version}`;
  document.querySelector('#review-items').innerHTML = day.items.map((item, index) => `
    <div class="mini-item"><span>${index + 1}</span><div>${item}</div></div>
  `).join('');

  const form = document.querySelector('#review-form');
  const note = document.querySelector('#save-note');

  form.person.addEventListener('change', () => {
    const existing = getReviews()[dayId]?.[form.person.value];
    if (!existing) return;
    form.rating.value = existing.rating;
    form.status.value = existing.status;
    form.change.value = existing.change || '';
    form.replacement.value = existing.replacement || '';
    form.favourite.value = existing.favourite || '';
    form.querySelectorAll('input[name="concerns"]').forEach(input => {
      input.checked = existing.concerns?.includes(input.value) || false;
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const person = data.get('person');
    const reviews = getReviews();
    reviews[dayId] = reviews[dayId] || {};
    reviews[dayId][person] = {
      rating: data.get('rating'),
      status: data.get('status'),
      concerns: data.getAll('concerns'),
      change: data.get('change'),
      replacement: data.get('replacement'),
      favourite: data.get('favourite'),
      savedAt: new Date().toISOString()
    };
    setReviews(reviews);
    note.textContent = 'Saved. You can come back and edit this anytime.';
    setTimeout(() => note.textContent = '', 2600);
  });
}

function renderAdmin() {
  const reviews = getReviews();
  const wrap = document.querySelector('#admin-grid');
  wrap.innerHTML = trip.days.map(day => {
    const entries = reviews[day.id] || {};
    const rows = trip.participants.map(person => {
      const r = entries[person];
      if (!r) return `<div class="review-entry"><strong>${person}</strong><span class="status-pill pending">Not submitted</span></div>`;
      const concerns = r.concerns?.length ? r.concerns.join(', ') : 'No concern selected';
      const stars = '★'.repeat(Number(r.rating)) + '☆'.repeat(5 - Number(r.rating));
      return `
        <div class="review-entry">
          <strong>${person}</strong>
          <span class="status-pill ${r.status === 'Needs discussion' ? 'issue' : r.status === 'Minor changes' ? 'pending' : 'done'}">${r.status}</span>
          <p>${stars} · ${concerns}</p>
          ${r.change ? `<p><b>Change:</b> ${escapeHtml(r.change)}</p>` : ''}
          ${r.replacement ? `<p><b>Replacement:</b> ${escapeHtml(r.replacement)}</p>` : ''}
          ${r.favourite ? `<p><b>Favourite:</b> ${escapeHtml(r.favourite)}</p>` : ''}
        </div>
      `;
    }).join('');
    return `<article class="admin-card"><h4>${day.title}</h4>${rows}</article>`;
  }).join('');

  document.querySelector('#export-json').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(reviews, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'journey-planner-reviews.json';
    a.click();
    URL.revokeObjectURL(url);
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag]));
}

document.addEventListener('click', event => {
  const routeTarget = event.target.closest('[data-route]');
  if (!routeTarget) return;
  route(routeTarget.dataset.route);
});

route('home');
