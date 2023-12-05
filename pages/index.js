import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function Home() {
  const [data, setData] = useState("");
  const [allMsg, setAllMsg] = useState([]);

  const sendMsg = () => {
    socket.emit("sendMessage", data);
    setData(""); // Clear input after sending
  };

  useEffect(() => {
    // Initialize socket only once
    if (!socket) {
      socket = io();
      socket.on("Receive-Message", (msg) => {
        console.log(msg);
        setAllMsg((prev) => [...prev, msg]);
      });
    }

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, []);

  return (
    <div>
      <h1>Hello world!</h1>
      <input
        type="text"
        placeholder="Enter message"
        value={data}
        onChange={(e) => setData(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMsg()}
      />

      {allMsg?.map((item, idx) => (
        <div key={idx}>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}
