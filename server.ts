import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { HERITAGE_RECORDS, OFFICIAL_SOURCES, SPACE_COMPARISON_DATA } from "./src/data/cahueData.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Serve static images directly with caching headers
app.use("/images", express.static(path.resolve(__dirname, "public/images"), { maxAge: "7d" }));
app.use("/src/assets/images", express.static(path.resolve(__dirname, "public/images"), { maxAge: "7d" }));

// Server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Build strict Grounded Knowledge Base for Ca Huế
const KNOWLEDGE_BASE_CONTEXT = `
DỮ LIỆU CHÍNH THỨC VÀ XÁC MINH VỀ CA HUẾ TRONG ỨNG DỤNG:

1. NGUỒN TÀI LIỆU KIỂM CHỨNG:
${OFFICIAL_SOURCES.map(
  (s) => `- [${s.id}] "${s.title}" (${s.publishedYear}) bởi ${s.authorOrPublisher}. Loại nguồn: ${s.sourceType}. Nội dung xác minh: ${s.verifiedScope}`
).join("\n")}

2. BẢN GHI DI SẢN CA HUẾ HIỆN CÓ:
${HERITAGE_RECORDS.map(
  (r) => `- Mã: ${r.id} | Tên: ${r.name} | Nhóm: ${r.category} | Hơi/Điệu: ${r.musicalMode || "N/A"} | Trạng thái: ${r.verificationStatus}
  Mô tả: ${r.shortDescription}
  Đặc điểm/Giá trị: ${r.culturalValue}
  Nguồn: [${r.sourceReference.sourceId}] ${r.sourceReference.sourceTitle} (${r.sourceReference.citationDetail})
  ${r.notesForVerification ? `Ghi chú thẩm định: ${r.notesForVerification}` : ""}`
).join("\n")}

3. ĐỐI SÁNH KHÔNG GIAN THƯỞNG THỨC TRUYỀN THỐNG VS DU LỊCH:
${SPACE_COMPARISON_DATA.map(
  (c) => `- Tiêu chí: ${c.criterion}
  + Thính phòng truyền thống: ${c.chamberTraditional}
  + Biểu diễn du lịch thuyền rồng: ${c.tourismModern}
  + Ghi chú khoa học: ${c.notes}`
).join("\n")}
`;

// API endpoint: Trợ lý tìm hiểu Ca Huế
app.post("/api/gemini/assistant", async (req, res) => {
  try {
    const { question, history } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Câu hỏi không hợp lệ." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: "Chưa cấu hình GEMINI_API_KEY trên máy chủ. Vui lòng kiểm tra mục Settings > Secrets.",
      });
    }

    const systemInstruction = `Bạn là "Trợ lý tìm hiểu Ca Huế và Ca nhạc thính phòng", một chuyên gia tư vấn di sản văn hóa phi vật thể nghiêm cẩn, khoa học và tôn trọng tính nguyên bản của Cố đô Huế.

QUY TẮC BẮT BUỘC (TUYỆT ĐỐI TUÂN THỦ):
1. CHỈ trả lời dựa trên CƠ SỞ DỮ LIỆU ĐÃ ĐƯỢC CUNG CẤP bên dưới.
2. TUYỆT ĐỐI KHÔNG tự bịa đặt thông tin lịch sử, tên nghệ nhân, bài bản, niên đại, địa danh hoặc nguồn tham khảo.
3. Nếu câu hỏi của người dùng hỏi về điều KHÔNG CÓ hoặc KHÔNG ĐỦ dữ liệu trong cơ sở dữ liệu đã cấp, bạn PHẢI NÓI RÕ:
   "Dữ liệu hiện có chưa đủ để xác minh câu trả lời cho nội dung này. Bạn có thể tham khảo thêm tại Thư viện Di sản hoặc các nguồn nghiên cứu chính thức từ Viện Âm nhạc và Sở VHTT Thừa Thiên Huế."
4. KHÔNG BAO GIỜ đưa ra câu trả lời khẳng định nếu thiếu căn cứ. Với các bản ghi có trạng thái "Cần xác minh nguồn" (như bài Quả Phụ, bản Long Điệp), phải nêu rõ trạng thái đang xác minh, không trình bày như sự thật tuyệt đối.
5. Khi trả lời, LUÔN LUÔN trích dẫn rõ mã nguồn (ví dụ: [SRC-01], [SRC-02], [SRC-04]...) và mã bản ghi liên quan (ví dụ: CH-BB-001, CH-NC-001...) để người dùng kiểm chứng.
6. Luôn phân biệt rạch ròi giữa Ca Huế thính phòng truyền thống (âm thanh mộc, tri âm tri kỷ, nhà rường) và Ca Huế biểu diễn du lịch trên sông Hương hiện đại (sân khấu hóa, micro, đại chúng).
7. Văn phong: Trang nhã, nhã nhặn, chuẩn mực tiếng Việt, giàu tính học thuật và tự hào về di sản Cố đô.

CƠ SỞ DỮ LIỆU ĐÃ ĐƯỢC KIỂM CHỨNG:
${KNOWLEDGE_BASE_CONTEXT}
`;

    // Send request using @google/genai SDK
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: question,
      config: {
        systemInstruction,
      },
    });

    const reply = response.text || "Dữ liệu hiện có chưa đủ để xác minh câu trả lời.";

    return res.json({
      answer: reply,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Gemini Assistant Error:", error);
    return res.status(500).json({
      error: "Đã xảy ra lỗi khi trao đổi với Trợ lý Gemini. Vui lòng thử lại sau.",
      detail: error?.message || String(error),
    });
  }
});

// Verification submission API: Allow users to submit verification notes/sources for review
app.post("/api/records/verify-request", (req, res) => {
  const { recordId, contributorName, organization, notes, suggestedSourceUrl } = req.body;
  if (!recordId || !notes) {
    return res.status(400).json({ error: "Thiếu mã bản ghi hoặc nội dung thẩm định." });
  }

  // Simulates structured research submission receipt
  return res.json({
    success: true,
    message: "Góp ý và đề xuất nguồn thẩm định đã được ghi nhận vào hàng đợi kiểm chứng khoa học.",
    submissionId: `VERIF-${Date.now().toString().slice(-6)}`,
    submittedAt: new Date().toISOString(),
    recordId,
  });
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ứng dụng Ca Huế đang chạy tại http://localhost:${PORT}`);
  });
}

startServer();
