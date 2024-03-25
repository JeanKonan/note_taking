const apiUrl = '/api/notes';

const renderNotes = async () => {
  const response = await fetch(apiUrl)
  const notes = await response.json();
  let theNotes = JSON.parse(localStorage.getItem('notes'));

  const appContainer = document.getElementById('app');
  appContainer.innerHTML = '';

  if (theNotes.length === 0) {

    const noNotesMessage = document.createElement('p');
    noNotesMessage.textContent = 'No notes available.';
    appContainer.appendChild(noNotesMessage);

  } else {

    theNotes.forEach((note) => {
      const noteElement = document.createElement('div');
      noteElement.className = 'note';
      noteElement.dataset.id = note.title;
      noteElement.style.backgroundColor = note.color;

      if (note.color == "blue" || note.color == "green"){
        noteElement.style.backgroundColor = `light${note.color}`;
      }

      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
      `;
      appContainer.appendChild(noteElement);
    });

  }
};

const showCreateNoteForm = () => {
  const createNoteForm = document.getElementById('createNoteForm');
  createNoteForm.style.display = 'block';
};

const hideCreateNoteForm = () => {
  const createNoteForm = document.getElementById('createNoteForm');
  createNoteForm.style.display = 'none';
};

const deleteNote = async (noteTitle) => {
  // Remove note from UI
  const noteElement = document.querySelector(`.note[data-id="${noteTitle}"]`);
  noteElement.remove();

  // Remove note from local storage
  let myNotes = JSON.parse(localStorage.getItem('notes')) || [];
  myNotes = myNotes.filter((note) => note.title !== noteTitle);
  localStorage.setItem('notes', JSON.stringify(myNotes));
};

const showDeleteNoteForm = () => {
  const deleteNoteForm = document.getElementById('deleteNoteForm');
  deleteNoteForm.style.display = 'block';

  // Populate select options with note titles
  const selectNote = document.getElementById('selectNote');
  selectNote.innerHTML = '';
  let myNotes = JSON.parse(localStorage.getItem('notes')) || [];
  myNotes.forEach((note) => {
    const option = document.createElement('option');
    option.value = note.title;
    option.textContent = note.title;
    selectNote.appendChild(option);
  });
};

const hideDeleteNoteForm = () => {
  const deleteNoteForm = document.getElementById('deleteNoteForm');
  deleteNoteForm.style.display = 'none';
};

const deleteSelectedNote = () => {
  const selectNote = document.getElementById('selectNote');
  const noteTitle = selectNote.value;
  deleteNote(noteTitle);

  hideDeleteNoteForm();
};

const addNote = async () => {
  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');
  const colorRadios = document.getElementsByName('color');

  if (!titleInput || !contentInput) {
    console.error('Title or content input element not found.');
    return;
  }

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  let color = '';

  for (const radio of colorRadios) {
    if (radio.checked) {
      color = radio.value;
      break;
    }
  }

  if (title && content && color) {
    let method = 'POST';
    let url = apiUrl;

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, color }),
    });
  }

  let myNotes = JSON.parse(localStorage.getItem('notes'));

  if(!myNotes){
    myNotes = [];
  }

  myNotes.push({ title, content, color })
  localStorage.setItem('notes', JSON.stringify(myNotes));

  hideCreateNoteForm();
};

// const attachNoteClickListeners = () => {
//   const noteElements = document.querySelectorAll('.note');
//   noteElements.forEach((noteElement) => {
//     noteElement.addEventListener('click', () => {
//       const noteId = noteElement.dataset.id;
//       handleNoteClick(noteId);
//     });
//   });
// };

window.onload = () => {
  // localStorage.clear();
  const storedNotes = localStorage.getItem('notes');
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
    renderNotes();
  }

  const createNoteBtn = document.getElementById('createNoteBtn');
  const deleteNoteBtn = document.getElementById('deleteNoteBtn');

  createNoteBtn.addEventListener('click', showCreateNoteForm);
  deleteNoteBtn.addEventListener('click', showDeleteNoteForm);

  const appContainer = document.getElementById('app');
  const colorButtons = document.querySelectorAll('.colorButton');

  // attachNoteClickListeners();

  colorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      colorButtons.forEach((btn) => btn.classList.remove('selected'));
      button.classList.add('selected');
    });
  });
};
