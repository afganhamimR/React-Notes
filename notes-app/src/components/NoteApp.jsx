import React from 'react';
import NoteList from './NoteList';
import NoteInput from './NoteInput';
import { getInitialData } from '../utils/index';


class NoteApp extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     notes: getInitialData(),
     searchKeyword: '',
   }
 
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);

 }
 
  handleSearchInputChange = (event) => {
    this.setState({ searchKeyword: event.target.value });
  };

 onDeleteHandler(id) {
   const notes = this.state.notes.filter(note => note.id !== id);
   this.setState({ notes });
 }

 onAddNoteHandler({ title, body }) {
  const currentTime = new Date();
  const formatter = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });


  const formattedTime = formatter.format(currentTime);
   this.setState((prevState) => {
     return {
       notes: [
         ...prevState.notes,
         {
           id: +new Date(),
           title,
           body,
           createdAt: formattedTime,
           archived: false,
         }
       ]
     }
   });
 }
 
 	render() {
    const { notes } = this.state;
    const isNotesEmpty = notes.length === 0;
    const { searchKeyword } = this.state;

     const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
        return (
 		<>
 		<div className="note-app__header">
 		<h1>My Notes</h1>
 		<div className="note-search">
 		<input type="text" placeholder="cari catatan"  value={searchKeyword} onChange={this.handleSearchInputChange}></input>
 		</div>
 		</div>
 		<div className="note-app__body">
        <div className="note-input">
        <h2>Buat Catatan</h2>
        <NoteInput addNote={this.onAddNoteHandler} />
        </div>
 			<h2>Catatan Aktif</h2>
      {isNotesEmpty ? (
          <p class="notes-list__empty-message">Tidak ada catatan</p>
        ) : (
          <NoteList  notes={searchKeyword ? filteredNotes : notes} onDelete={this.onDeleteHandler} />
        )}
        </div>
  		</>
 		);
}
}

export default NoteApp;

