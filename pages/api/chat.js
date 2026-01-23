import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages, language } = req.body;

  // Use mock if USE_MOCK=true
  if (process.env.USE_MOCK === "true") {
    const userMessage = messages[messages.length - 1].content.toLowerCase();

    const phcList = [
      { ward: "Auyo Ward", phc: "Auyo Primary Health Centre" },
      { ward: "Auyakayi Ward", phc: "Auyakayi Primary Health Clinic" },
      { ward: "Ayama Ward", phc: "Ayama Primary Health Clinic" },
      { ward: "Ayan Ward", phc: "Ayan Primary Health Clinic" },
      { ward: "Gamafoi Ward", phc: "Gamafoi Primary Health Centre" },
      { ward: "Gamsarka Ward", phc: "Gamsarka Health Post / Primary Health Centre" },
      { ward: "Gatafa Ward", phc: "Gatafa Basic Primary Healthcare" },
      { ward: "Kafur Ward", phc: "Health Post / Community Clinic" },
      { ward: "Tsidir Ward", phc: "Tsidir Basic Health PHC" },
      { ward: "Unik Ward", phc: "Unik PHC" },
    ];

    let reply = "";

    if (userMessage.includes("phc") || userMessage.includes("ward") || userMessage.includes("health centre")) {
      reply =
        language === "ha"
          ? "Ga jerin asibitocin lafiya a kowanne ward:\n" + phcList.map((p) => `- ${p.ward}: ${p.phc}`).join("\n")
          : "Here is the list of primary healthcare centers by ward:\n" + phcList.map((p) => `- ${p.ward}: ${p.phc}`).join("\n");
    } else if (userMessage.includes("malaria")) {
      reply = language === "ha" ? "Cutar zazzabin cizon sauro na daga cikin cututtuka masu haɗari." : "Malaria is a dangerous disease caused by mosquito bites.";
    } else if (userMessage.includes("vaccine")) {
      reply = language === "ha" ? "Rigakafi na taimakawa wajen kare jiki daga cututtuka." : "Vaccines help protect the body from diseases.";
    } else {
      reply = language === "ha" ? "Ina iya ba da bayani kan lafiyar jiki gaba ɗaya." : "I can provide general health information.";
    }

    return res.status(200).json({ message: reply });
  }

  // REAL API call
  try {
    const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: `You are a health assistant for Auyo LGA PHC. Respond in ${language === "en" ? "English" : "Hausa"}. Provide general health info only.` },
        ...messages,
      ],
      temperature: 0.7,
    });

    res.status(200).json({ message: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI API request failed" });
  }
}






