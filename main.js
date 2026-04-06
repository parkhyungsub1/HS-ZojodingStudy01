// 샘플 초기 데이터
let posts = [
  {
    id: 1,
    title: '첫 번째 블로그 글',
    content: '안녕하세요! 블로그를 시작합니다.\n이 곳에 다양한 이야기를 담을 예정입니다.',
    date: '2026-04-06'
  },
  {
    id: 2,
    title: '두 번째 글입니다',
    content: '오늘은 날씨가 참 좋네요.\n산책을 다녀왔습니다.',
    date: '2026-04-06'
  }
];

let nextId = 3;

function showView(name) {
  document.getElementById('view-list').classList.add('hidden');
  document.getElementById('view-detail').classList.add('hidden');
  document.getElementById('view-write').classList.add('hidden');
  document.getElementById('view-' + name).classList.remove('hidden');

  if (name === 'list') renderList();
}

function renderList() {
  const container = document.getElementById('post-list');
  if (posts.length === 0) {
    container.innerHTML = '<p class="empty-msg">아직 작성된 글이 없습니다.</p>';
    return;
  }
  container.innerHTML = [...posts].reverse().map(post => `
    <div class="post-card" onclick="showDetail(${post.id})">
      <h3>${escapeHtml(post.title)}</h3>
      <div class="post-meta">${post.date}</div>
      <p>${escapeHtml(post.content)}</p>
    </div>
  `).join('');
}

function showDetail(id) {
  const post = posts.find(p => p.id === id);
  if (!post) return;
  document.getElementById('post-detail').innerHTML = `
    <h2>${escapeHtml(post.title)}</h2>
    <div class="post-meta">${post.date}</div>
    <div class="post-body">${escapeHtml(post.content)}</div>
  `;
  showView('detail');
}

document.getElementById('post-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('input-title').value.trim();
  const content = document.getElementById('input-content').value.trim();
  if (!title || !content) return;

  posts.push({
    id: nextId++,
    title,
    content,
    date: new Date().toISOString().slice(0, 10)
  });

  this.reset();
  showView('list');
});

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// 초기 렌더
renderList();
