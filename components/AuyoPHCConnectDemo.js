import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export default function AuyoPHCConnectDemo() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I am the Auyo PHC Health Assistant, Developed by Hamisu Isyaku, National Health Fellow. I provide health education only. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en"); // en = English, ha = Hausa
  const messagesEndRef = useRef(null);

  // Send message function
  const sendMessage = async (customMessage) => {
    const userMessage = customMessage || input;
    if (!userMessage.trim()) return;

    setMessages([...messages, { role: "user", text: userMessage }]);
    if (!customMessage) setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages.map((m) => ({ role: m.role, content: m.text })), { role: "user", content: userMessage }],
          language,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.message }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "assistant", text: "Sorry, I am unable to respond right now." }]);
    }
  };

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-2">Auyo PHC Connect (Demo)</h1>
      <p className="text-sm text-gray-600 mb-4">Tech-driven community health assistant | Developed by Hamisu Isyaku, National Health Fellow</p>

      {/* Language toggle */}
      <div className="mb-2 flex gap-2">
        <Button onClick={() => setLanguage("en")} className={language === "en" ? "bg-blue-500 text-white" : ""}>English</Button>
        <Button onClick={() => setLanguage("ha")} className={language === "ha" ? "bg-blue-500 text-white" : ""}>Hausa</Button>
      </div>

      {/* Show All PHCs button */}
      <div className="mb-2">
        <Button onClick={() => sendMessage(language === "ha" ? "Jerin asibitoci" : "List all PHC")}>
          {language === "ha" ? "Nuna duk PHC" : "Show All PHCs"}
        </Button>
      </div>

      {/* Chat messages */}
      <Card className="mb-4">
        <CardContent className="p-4 h-64 overflow-y-auto space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className={msg.role === "user" ? "text-right" : "text-left"}>
              <span className={msg.role === "user" ? "bg-blue-400 text-white px-3 py-2 rounded inline-block" : "bg-gray-200 text-gray-800 px-3 py-2 rounded inline-block"}>
                {msg.text}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </CardContent>
      </Card>

      {/* Input box */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={language === "ha" ? "Rubuta saƙo..." : "Type your message..."}
        />
        <Button onClick={() => sendMessage()}>{language === "ha" ? "Aika" : "Send"}</Button>
      </div>
    </div>
  );
}


