const addBtn = document.querySelector('#btn');
const main = document.querySelector('#main');

// Function to save notes to localStorage
const saveNote = () => {
    const noteElements = document.querySelectorAll('.note textarea');
    const data = [];

    noteElements.forEach((note) => data.push(note.value));

    // Save notes only if there are any
    if (data.length > 0) {
        localStorage.setItem("note", JSON.stringify(data));
    } else {
        localStorage.removeItem("note");
    }
};

// Add event listener for the "Add Note" button
addBtn.addEventListener('click', () => {
    addNote();
});

// Function to add a new note to the DOM
const addNote = (text = '') => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <i class="save fas fa-save"></i>
        <i class="trash fas fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
    `;

    // Add event listeners for the "Save" and "Trash" icons
    note.querySelector(".trash").addEventListener('click', () => {
        note.remove();
        saveNote();

        // If all notes are deleted, add an empty note
        if (main.querySelectorAll('.note').length === 0) {
            addNote(); // Ensure one empty note is always present
        }
    });

    note.querySelector('.save').addEventListener('click', () => {
        saveNote();
    });

    main.appendChild(note);
    saveNote();
};

// Load notes from localStorage on page load
(function () {
    const lsnotes = JSON.parse(localStorage.getItem("note")) || [];

    // Load saved notes if there are any
    if (lsnotes.length > 0) {
        lsnotes.forEach((note) => {
            addNote(note);
        });
    } else {
        // If no saved notes, add one empty note
        addNote();
    }
})();
