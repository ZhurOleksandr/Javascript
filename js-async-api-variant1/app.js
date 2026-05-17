const API_BASE = 'https://api.github.com';

const elements = {
  username: document.getElementById('username'),
  searchBtn: document.getElementById('searchBtn'),
  sortRepos: document.getElementById('sortRepos'),
  loading: document.getElementById('loading'),
  errorBox: document.getElementById('errorBox'),
  profileSection: document.getElementById('profileSection'),
  reposSection: document.getElementById('reposSection'),
  repoDetailsSection: document.getElementById('repoDetailsSection'),
  avatar: document.getElementById('avatar'),
  name: document.getElementById('name'),
  login: document.getElementById('login'),
  bio: document.getElementById('bio'),
  followers: document.getElementById('followers'),
  following: document.getElementById('following'),
  publicRepos: document.getElementById('publicRepos'),
  reposList: document.getElementById('reposList'),
  repoDetails: document.getElementById('repoDetails')
};

function setLoading(isLoading) {
  elements.loading.classList.toggle('hidden', !isLoading);
  elements.searchBtn.disabled = isLoading;
}

function showError(message) {
  elements.errorBox.textContent = message;
  elements.errorBox.classList.remove('hidden');
}

function clearError() {
  elements.errorBox.textContent = '';
  elements.errorBox.classList.add('hidden');
}

function hideResults() {
  elements.profileSection.classList.add('hidden');
  elements.reposSection.classList.add('hidden');
  elements.repoDetailsSection.classList.add('hidden');
}

function validateUsername(username) {
  return typeof username === 'string' && username.trim().length >= 1 && /^[a-zA-Z0-9-]+$/.test(username.trim());
}

function validateUserData(data) {
  return data && typeof data === 'object' && typeof data.login === 'string' && typeof data.public_repos === 'number';
}

function validateReposData(data) {
  return Array.isArray(data);
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' }
  });

  if (response.status === 403) {
    const reset = response.headers.get('x-ratelimit-reset');
    throw new Error(reset
      ? `Rate limit exceeded. Try again after ${new Date(Number(reset) * 1000).toLocaleTimeString()}.`
      : 'Rate limit exceeded.'
    );
  }

  if (response.status === 404) {
    throw new Error('User or repository not found.');
  }

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}

async function getUser(username) {
  const data = await fetchJson(`${API_BASE}/users/${encodeURIComponent(username)}`);
  if (!validateUserData(data)) throw new Error('Invalid user response from API');
  return data;
}

async function getRepos(username) {
  const data = await fetchJson(`${API_BASE}/users/${encodeURIComponent(username)}/repos?per_page=100`);
  if (!validateReposData(data)) throw new Error('Invalid repositories response from API');
  return data;
}

async function getRepoDetails(owner, repo) {
  const data = await fetchJson(`${API_BASE}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`);
  if (!data || typeof data !== 'object') throw new Error('Invalid repository details response');
  return data;
}

async function getReadme(owner, repo) {
  const response = await fetch(
    `${API_BASE}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`,
    { headers: { Accept: 'application/vnd.github.raw+json' } }
  );

  if (response.status === 404) return 'README not found.';
  if (!response.ok) throw new Error(`README error: ${response.status}`);
  return response.text();
}

async function getContributors(owner, repo) {
  const data = await fetchJson(`${API_BASE}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contributors?per_page=5`);
  return Array.isArray(data) ? data : [];
}

function sortRepos(repos, sortBy) {
  const copy = [...repos];
  if (sortBy === 'stars') return copy.sort((a, b) => b.stargazers_count - a.stargazers_count);
  if (sortBy === 'forks') return copy.sort((a, b) => b.forks_count - a.forks_count);
  return copy.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}

function renderProfile(user) {
  elements.avatar.src = user.avatar_url;
  elements.name.textContent = user.name || user.login;
  elements.login.textContent = `@${user.login}`;
  elements.bio.textContent = user.bio || 'No bio provided.';
  elements.followers.textContent = `Followers: ${user.followers}`;
  elements.following.textContent = `Following: ${user.following}`;
  elements.publicRepos.textContent = `Public repos: ${user.public_repos}`;
  elements.profileSection.classList.remove('hidden');
}

function renderRepos(repos, owner) {
  const sortBy = elements.sortRepos.value;
  const sorted = sortRepos(repos, sortBy);

  elements.reposList.innerHTML = sorted.map(repo => `
    <article class="repo-card">
      <h3>${repo.name}</h3>
      <div class="repo-meta">
        <span>Stars: ${repo.stargazers_count}</span>
        <span>Forks: ${repo.forks_count}</span>
        <span>Updated: ${new Date(repo.updated_at).toLocaleString()}</span>
        <span>Language: ${repo.language || 'Unknown'}</span>
      </div>
      <button data-owner="${owner}" data-repo="${repo.name}">Show details</button>
    </article>
  `).join('');

  elements.reposSection.classList.remove('hidden');

  elements.reposList.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', async () => {
      await loadRepoDetails(btn.dataset.owner, btn.dataset.repo);
    });
  });
}

async function loadRepoDetails(owner, repo) {
  try {
    clearError();
    setLoading(true);

    const [details, readme, contributors] = await Promise.all([
      getRepoDetails(owner, repo),
      getReadme(owner, repo),
      getContributors(owner, repo)
    ]);

    elements.repoDetails.innerHTML = `
      <div class="repo-card">
        <h3>${details.full_name}</h3>
        <p>${details.description || 'No description.'}</p>
        <div class="repo-meta">
          <span>Default branch: ${details.default_branch}</span>
          <span>Language: ${details.language || 'Unknown'}</span>
          <span>Stars: ${details.stargazers_count}</span>
          <span>Forks: ${details.forks_count}</span>
        </div>
        <h4>README</h4>
        <pre style="white-space: pre-wrap;">${String(readme).slice(0, 3000)}</pre>
        <h4>Contributors</h4>
        <p>${contributors.length ? contributors.map(c => c.login).join(', ') : 'No contributors data.'}</p>
      </div>
    `;
    elements.repoDetailsSection.classList.remove('hidden');
  } catch (error) {
    showError(error.message);
  } finally {
    setLoading(false);
  }
}

async function searchUser() {
  const username = elements.username.value.trim();

  try {
    clearError();
    hideResults();

    if (!validateUsername(username)) {
      throw new Error('Enter a valid GitHub username.');
    }

    setLoading(true);

    const [user, repos] = await Promise.all([
      getUser(username),
      getRepos(username)
    ]);

    renderProfile(user);
    renderRepos(repos, user.login);
  } catch (error) {
    showError(error.message);
  } finally {
    setLoading(false);
  }
}

elements.searchBtn.addEventListener('click', searchUser);

elements.sortRepos.addEventListener('change', () => {
  const username = elements.username.value.trim();
  if (elements.profileSection.classList.contains('hidden')) return;
  if (username) searchUser();
});

elements.username.addEventListener('keydown', event => {
  if (event.key === 'Enter') searchUser();
});

window.searchUser = searchUser;