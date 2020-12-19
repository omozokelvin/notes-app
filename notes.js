const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if(!duplicateNote) {
    notes.push({title, body});

    saveNote(notes);
    console.log(chalk.green.inverse('new notes added'));
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }

}

const removeNote = (title) => {
  const notes = loadNotes();

  const notesToKeep = notes.filter((note) => note.title !== title);

  if(notes.length > notesToKeep.length) {
    saveNote(notesToKeep);
    console.log(chalk.green.inverse('Note removed!'));
  } else {
    console.log(chalk.red.inverse('No note found'));
  }
}

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse('Your notes \n'));

  notes.forEach(note => console.log(note.title));
}

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if(!note) {
    console.log(chalk.red('Note not found!'));
  } else {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  }
}

const saveNote = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJsON);
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch(e) {
    return [];
  }
}


module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};