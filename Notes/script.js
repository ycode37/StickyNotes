let canvas = document.getElementById('canvas');
let addNoteBtn = document.getElementById('addNoteBtn');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function createNote(id, text = '', x = 100, y = 100) {
  const note = document.createElement('div');
  note.classList.add('note');
  note.contentEditable = true;
  note.innerText = text;
  note.style.left = x + 'px';
  note.style.top = y + 'px';

  note.oninput = () => {
    const updated = notes.find((n) => n.id === id);
    updated.text = note.innerText;
    saveNotes();
  };

  note.onmousedown = function (e) {
    let offsetX = e.clientX - note.offsetLeft;
    let offsetY = e.clientY - note.offsetTop;

    function move(e) {
      note.style.left = e.clientX - offsetX + 'px';
      note.style.top = e.clientY - offsetY + 'px';

      const updated = notes.find((n) => n.id === id);
      updated.x = e.clientX - offsetX;
      updated.y = e.clientY - offsetY;
      saveNotes();
    }

    document.addEventListener('mousemove', move);

    document.onmouseup = () => {
      document.removeEventListener('mousemove', move);
    };
  };

  canvas.appendChild(note);
}

addNoteBtn.onclick = () => {
  const id = Date.now();
  notes.push({ id, text: '', x: 100, y: 100 });
  createNote(id);
  saveNotes();
};

notes.forEach((note) => createNote(note.id, note.text, note.x, note.y));
