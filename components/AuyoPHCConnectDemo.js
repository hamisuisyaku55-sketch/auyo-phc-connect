import React, { useState } from "react";

const PHC_LIST = [
  "Auyo Ward – Auyo Primary Health Centre",
  "Auyakayi Ward – Auyakayi Primary Health Clinic",
  "Ayama Ward – Ayama Primary Health Clinic",
  "Ayan Ward – Ayan Primary Health Clinic",
  "Gamafoi Ward – Gamafoi Primary Health Centre",
  "Gamsarka Ward – Gamsarka Health Post / PHC",
  "Gatafa Ward – Gatafa Basic Primary Healthcare",
  "Kafur Ward – Health Post / Community Clinic",
  "Tsidir Ward – Tsidir Basic Health PHC",
  "Unik Ward – Unik PHC",
];

export default function AuyoPHCConnectDemo() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "Hello! I am the Auyo PHC Health Assistant, Developed by Hamisu Isyaku, National Health Fellow. I provide health education only. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: userMessage }],
          language,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.message },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I am unable to respond right now.",
        },
      ]);
    }
  };

  const showAllPHCs = () => {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text:
          "Here are all Primary Healthcare Centres in Auyo LGA:\n\n" +
          PHC_LIST.map((phc, i) => `${i + 1}. ${phc}`).join("\n"),
      },
    ]);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Auyo PHC Connect (Demo)</h2>
      <p>Tech-driven community health assistant</p>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setLanguage("en")}>English</button>
        <button onClick={() => setLanguage("ha")} style={{ marginLeft: 10 }}>
          Hausa
        </button>
        <button onClick={showAllPHCs} style={{ marginLeft: 10 }}>
          Show All PHCs
        </button>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 300,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: 8 }}>
            <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong>{" "}
            {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%", padding: 8 }}
      />
      <button onClick={sendMessage} style={{ padding: 8, marginLeft: 5 }}>
        Send
      </button>
    </div>
  );
}



