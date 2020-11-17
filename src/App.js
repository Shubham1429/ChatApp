import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Input, Button } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("messages").add({
      message: input,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  useEffect(() => {
    setUser(prompt("Please Enter Your Name"));
  }, []);

  useEffect(() => {
    //run when app loads
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const username = user;
  let ref = db.collection("messages");

  const handleclear = () => {
    db.collection("messages").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        ref
          .doc(doc.id)
          .delete()
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  return (
    <div className="App">
      {username === "Shenron" ? (
        <Button
          className="app__button"
          variant="contained"
          color="primary"
          onClick={handleclear}
        >
          Clear
        </Button>
      ) : (
        <Button style={{ visibility: "hidden" }}>Clear</Button>
      )}

      <h1>Hello</h1>
      <h2>Welcome {user}</h2>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} message={message} user={user} />
        ))}
      </FlipMove>
      <form className="app__form">
        <FormControl className="app__formcontrol">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconbutton"
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
            disabled={!input}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
