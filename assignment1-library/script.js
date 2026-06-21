// ── Book Class ───────────────────────────────────────────────────────────────

class Book {
  constructor(title, author, year) {
    this.title     = title;
    this.author    = author;
    this.year      = year;
    this.available = true;
    this.id        = Date.now() + Math.random();
  }
}

// ── Library Class ─────────────────────────────────────────────────────────────

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, year) {
    const book = new Book(title, author, year);
    this.books.push(book);
    return book;
  }

  borrowBook(id) {
    const book = this.books.find(b => b.id === id);
    if (!book)           return { ok: false, msg: "Book not found." };
    if (!book.available) return { ok: false, msg: `"${book.title}" is already borrowed.` };
    book.available = false;
    return { ok: true, msg: `"${book.title}" has been borrowed.` };
  }

  returnBook(id) {
    const book = this.books.find(b => b.id === id);
    if (!book)          return { ok: false, msg: "Book not found." };
    if (book.available) return { ok: false, msg: `"${book.title}" was not borrowed.` };
    book.available = true;
    return { ok: true, msg: `"${book.title}" has been returned.` };
  }

  listAvailable() {
    return this.books.filter(b => b.available);
  }
}

// ── App State ─────────────────────────────────────────────────────────────────

const lib    = new Library();
let   filter = 'all';

// Pre-load 3 sample books
lib.addBook("Things Fall Apart",    "Chinua Achebe",       1958);
lib.addBook("Purple Hibiscus",      "Chimamanda Adichie",  2003);
lib.addBook("Half of a Yellow Sun", "Chimamanda Adichie",  2006);

// Mark one as borrowed for demo purposes
lib.books[1].available = false;

// ── Event Handlers ────────────────────────────────────────────────────────────

function handleAdd() {
  const title  = document.getElementById('inTitle').value.trim();
  const author = document.getElementById('inAuthor').value.trim();
  const year   = parseInt(document.getElementById('inYear').value);

  if (!title)                          return toast("Please enter a title.");
  if (!author)                         return toast("Please enter an author.");
  if (!year || year < 1000 || year > 2100) return toast("Please enter a valid year.");

  lib.addBook(title, author, year);

  document.getElementById('inTitle').value  = '';
  document.getElementById('inAuthor').value = '';
  document.getElementById('inYear').value   = '';

  render();
  toast(`"${title}" added to the library! 📖`);
}

function handleBorrow(id) {
  const result = lib.borrowBook(id);
  toast(result.msg);
  render();
}

function handleReturn(id) {
  const result = lib.returnBook(id);
  toast(result.msg);
  render();
}

function setFilter(f, btn) {
  filter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderBookList();
}

// ── Render Functions ──────────────────────────────────────────────────────────

function render() {
  renderStats();
  renderBookList();
  renderAvailList();
}

function renderStats() {
  const total = lib.books.length;
  const avail = lib.listAvailable().length;

  document.getElementById('statTotal').textContent  = total;
  document.getElementById('statAvail').textContent  = avail;
  document.getElementById('statBorrow').textContent = total - avail;
}

function renderBookList() {
  const el = document.getElementById('bookList');
  let books = lib.books;

  if (filter === 'available') books = books.filter(b => b.available);
  if (filter === 'borrowed')  books = books.filter(b => !b.available);

  if (books.length === 0) {
    el.innerHTML = `<p class="empty">No books match this filter.</p>`;
    return;
  }

  el.innerHTML = books.map(b => `
    <div class="book-card ${b.available ? '' : 'unavailable'}">
      <div class="book-info">
        <h3>${esc(b.title)}</h3>
        <div class="book-meta">${esc(b.author)} &bull; ${b.year}</div>
      </div>
      <div class="book-actions">
        <span class="badge ${b.available ? 'badge-avail' : 'badge-borrow'}">
          ${b.available ? 'Available' : 'Borrowed'}
        </span>
        ${b.available
          ? `<button class="btn btn-borrow" onclick="handleBorrow(${b.id})">Borrow</button>`
          : `<button class="btn btn-return" onclick="handleReturn(${b.id})">Return</button>`
        }
      </div>
    </div>
  `).join('');
}

function renderAvailList() {
  const el    = document.getElementById('availList');
  const books = lib.listAvailable();

  if (books.length === 0) {
    el.innerHTML = `<p class="empty">No available books right now.</p>`;
    return;
  }

  el.innerHTML = books.map(b => `
    <div class="avail-item">
      📗 <strong>${esc(b.title)}</strong>
      <span> — ${esc(b.author)}</span>
    </div>
  `).join('');
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

let toastTimer;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

// ── Init ──────────────────────────────────────────────────────────────────────

render();