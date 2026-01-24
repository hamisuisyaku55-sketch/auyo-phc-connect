export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, language } = req.body;

  const userMessage =
    messages && messages.length
      ? messages[messages.length - 1].content.toLowerCase()
      : "";

  let reply = "";

  if (userMessage.includes("malaria")) {
    reply =
      language === "ha"
        ? "Zazzabin cizon sauro cuta ce da sauro ke haddasawa, kuma ana kamuwa da ita idan sauro ya ciji mutum."
        : "Malaria is a disease caused by mosquito bites. It can be prevented by using mosquito nets and keeping the environment clean.";
  } else if (userMessage.includes("vaccine")) {
    reply =
      language === "ha"
        ? "Rigakafi na taimakawa wajen kare jiki daga cututtuka masu hadari."
        : "Vaccines help protect the body from dangerous diseases.";
  } else {
    reply =
      language === "ha"
        ? "Ina ba da bayanai kan lafiyar jiki gaba daya kawai."
        : "I provide general health information only.";
  }

  res.status(200).json({ message: reply });
}







