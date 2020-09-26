import React, { useEffect, useState, useContext } from "react";
import firebase from "../config/firebase";
import "firebase/firestore";
import { AuthContext } from "../AuthService";

const Room = () => {
  const [messages, setMessages] = useState(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("messages")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return doc.data();
        });

        function compare(a, b) {
          let r = 0;
          if (a.createdAt < b.createdAt) {
            r = -1;
          } else if (a.createdAt > b.createdAt) {
            r = 1;
          }
          return r;
        }
        messages.sort(compare);
        setMessages(messages);
        console.log(messages);
      });
  }, []);

  const user = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.firestore().collection("messages").add({
      content: value,
      user: user.displayName,
      createdAt: new Date(),
    });
    setValue("");
  };
  return (
    <>
      <h1>Room</h1>
      {messages &&
        (() => {
          const array = [];
          for (let i = 0; i < messages.length; i++) {
            array.push(
              <li>
                Name : {messages[i].user} <br /> Comment : {messages[i].content}
              </li>
            );
          }
          return <>{array}</>;
        })()}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button type="submit">送信</button>
      </form>
      <button onClick={() => firebase.auth().signOut()}>Logout</button>
    </>
  );
};

export default Room;
