import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Endpoint: AI Reflection (Phản hồi tâm lý & thần kinh thấu cảm)
app.post("/api/reflect", async (req, res) => {
  try {
    const { mood, smallWins, gratitude, selfEsteem, futureSelfMessage } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(200).json({
        reflection: "Cảm ơn bạn đã dành thời gian ghi chép nhật ký hôm nay! Việc thực hành nhận diện cảm xúc và trân trọng những điều nhỏ bé chính là bước đi vững chắc để rèn luyện sự dẻo dai thần kinh (Neuroplasticity). Hãy tiếp tục nuôi dưỡng thói quen này mỗi ngày cùng nguyên tắc 3K nhé!",
        isFallback: true
      });
    }

    const prompt = `
Bạn là một chuyên gia tâm lý học tích cực và cố vấn EdTech chăm sóc sức khỏe tinh thần dành cho học sinh.
Hãy đọc bản nhật ký biết ơn dưới đây và đưa ra một lời phản hồi ấm áp, thấu cảm, khích lệ và mang tính khoa học thần kinh (ngắn gọn, khoảng 3-4 câu).

Dữ liệu nhật ký của học sinh:
- Cảm xúc hôm nay: ${mood}
- 3 Niềm vui nhỏ (Dopamine): ${Array.isArray(smallWins) ? smallWins.join("; ") : smallWins}
- Lời tri ân (Oxytocin): Cho "${gratitude?.target || ''}" vì "${gratitude?.reason || ''}"
- Điểm mạnh/Thành tựu bản thân (Lòng tự trọng - Resilience): ${selfEsteem}
- Thông điệp gửi tương lai (Lạc quan): ${futureSelfMessage}

Yêu cầu lời phản hồi:
1. Luôn thấu cảm, tôn trọng cảm xúc (dù là buồn, tức giận hay vui vẻ).
2. Nhấn mạnh việc giải phóng hormone hạnh phúc (Dopamine, Oxytocin) hoặc củng cố liên kết thần kinh tích cực.
3. Nhắc nhẹ nguyên tắc 3K: "Không áp lực - Không phán xét - Kiên trì".
4. Dùng ngôn từ gần gũi với học sinh, không giáo điều, mang năng lượng chữa lành.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        systemInstruction: "Bạn là người đồng hành EdTech tâm lý học tích cực cho học sinh. Trả lời bằng tiếng Việt thấu cảm, truyền cảm hứng.",
      }
    });

    const reflection = response.text || "Bộ não của bạn vừa tạo nên một liên kết thần kinh tích cực mới hôm nay! Hãy tự hào về hành trình của mình nhé.";
    return res.json({ reflection });
  } catch (error) {
    console.error("Gemini reflection error:", error);
    return res.status(200).json({
      reflection: "Tuyệt vời! Việc ghi chép nhật ký hôm nay là một món quà tuyệt vời dành cho bộ não của bạn. Hãy giữ vững tinh thần 3K: Không áp lực - Không phán xét - Kiên trì!",
      isFallback: true
    });
  }
});

// API Endpoint: Gợi ý câu hỏi truyền cảm hứng (Prompt Inspiration)
app.post("/api/prompt-idea", async (req, res) => {
  try {
    const { mood, week } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        prompts: [
          "Một khoảnh khắc khiến bạn mỉm cười nhẹ nhàng hôm nay là gì?",
          "Lời cảm ơn nào bạn chưa kịp nói ra với một người bạn hay thầy cô?",
          "Một việc nhỏ bạn đã cố gắng hết sức hôm nay?"
        ]
      });
    }

    const prompt = `Gợi ý 3 câu hỏi gợi mở ngắn gọn (mỗi câu dưới 15 từ) để giúp học sinh ghi nhật ký biết ơn dựa trên cảm xúc hiện tại (${mood}) và tuần thứ ${week || 1} trong chu kỳ 12 tuần dẻo thần kinh. Trả lời dạng JSON array các chuỗi văn bản.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    let prompts = [];
    try {
      prompts = JSON.parse(response.text || "[]");
    } catch {
      prompts = [
        "Hôm nay có điều nhỏ bé nào làm bạn thấy dễ chịu?",
        "Ai đã hỗ trợ hoặc làm bạn thấy ấm áp hôm nay?",
        "Bạn tự hào nhất về điều gì ở bản thân ngày hôm nay?"
      ];
    }

    return res.json({ prompts });
  } catch (err) {
    return res.json({
      prompts: [
        "Hôm nay điều gì làm tâm trạng bạn thay đổi tích cực?",
        "Một bài học hoặc trải nghiệm nhỏ đáng nhớ hôm nay?",
        "Bạn muốn nhắn gửi điều gì cho bản thân ngày mai?"
      ]
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Gratitude Journal EdTech Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
