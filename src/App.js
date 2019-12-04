import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      
      <div>
        <a href="https://youtube.com"><img src="https://img.icons8.com/cotton/2x/folder-invoices.png" /></a>
        <p>blah</p>
        <p><a href="#" onclick="window.open('http://google.com');
    window.open('http://yahoo.com');">Click to open Google and Yahoo</a></p>
        
      </div>
      </Container>
    </div>
  );
}

export default App;

