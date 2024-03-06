import React from 'react';

class NoteInput extends React.Component {

   constructor(props) {
   super(props);
 

   this.state = {
     title: '',
     body: '',
     maxTitleLength: 50,
   }
 
   this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
   this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
   this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
 }

 onTitleChangeEventHandler(event) {
   const newTitle = event.target.value;
    if (newTitle.length <= this.state.maxTitleLength) {
      this.setState({ title: newTitle });
    }
   this.setState(() => {
     return {
       title: event.target.value,
     }
   });
 }
 
 onBodyChangeEventHandler(event) {
   this.setState(() => {
     return {
       body: event.target.value,
     }
   });
 }
 
 onSubmitEventHandler(event) {
   event.preventDefault();
   this.props.addNote(this.state);

   this.setState({
    title: "",
    body: ""
  });
   }
 render() {
  const { title, body, maxTitleLength } = this.state;
   const remainingChars = maxTitleLength - title.length;

   return (
     <form onSubmit={this.onSubmitEventHandler}>
       <p className="note-input__title__char-limit">
       	sisa karakter: {remainingChars}
       </p>
       <input className="note-input__title" type="text" placeholder="Judul" maxLength={maxTitleLength} value={this.state.title} onChange={this.onTitleChangeEventHandler} required />
       <textarea className="note-input__body" type="text" placeholder="Tulis catatan Anda" value={this.state.body} onChange={this.onBodyChangeEventHandler} required>
       	
       </textarea>
     <button type="submit">Buat</button>
     </form>
   )
 }
}
 
export default NoteInput;
