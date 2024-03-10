const apiUrl = '/api/notes';

const renderNotes = async () => {
  const response = await fetch(apiUrl);
  const notes = await response.json();

  const appContainer = document.getElementById('app');
  appContainer.innerHTML = '';

  if (notes.length === 0) {
    const noNotesMessage = document.createElement('p');
    noNotesMessage.textContent = 'No notes available.';
    appContainer.appendChild(noNotesMessage);
  } else {
    notes.forEach((note) => {
      const noteElement = document.createElement('div');
      noteElement.className = 'note';
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
      `;
      appContainer.appendChild(noteElement);
    });
  }
};

const addNote = async () => {
  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;

  if (title && content) {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    const newNote = await response.json();
    renderNotes();
    document.querySelector('#content').value = '';
    document.querySelector('#title').value = '';
  }
};

window.onload = () => {
  renderNotes();

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Note';
  addButton.onclick = addNote;

  const appContainer = document.getElementById('app');
  appContainer.appendChild(addButton);
};
