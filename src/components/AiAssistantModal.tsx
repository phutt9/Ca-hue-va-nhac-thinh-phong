import React from 'react';
import { X, Sparkles, Send, BookOpen, AlertCircle, RefreshCw, User, Bot } from 'lucide-react';
import { HERITAGE_RECORDS, OFFICIAL_SOURCES } from '../data/cahueData';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToRecord?: (recordId: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  "Sự khác biệt giữa Ca Huế thính phòng và Ca Huế du lịch là gì?",
  "Dàn nhạc Ngũ tuyệt gồm những nhạc cụ nào và vai trò của đàn Nguyệt?",
  "Hơi Bắc và Hơi Nam trong Ca Huế có sắc thái tình cảm ra sao?",
  "Có thông tin nào về bài bản Long Điệp không?",
];

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Kính chào quý vị. Tôi là Trợ lý số hóa di sản Ca Huế và Ca nhạc thính phòng. Tôi được thiết kế để trả lời dựa trên cơ sở dữ liệu khoa học và các nguồn tư liệu chính thức (Viện Âm nhạc, Cục Di sản văn hóa, Bảo tàng Cố đô). Nếu nội dung câu hỏi chưa có đủ căn cứ trong hệ thống, tôi sẽ nói rõ để bảo đảm tính chuẩn xác học thuật.',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuestion, setInputQuestion] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (questionToSend?: string) => {
    const q = (questionToSend || inputQuestion).trim();
    if (!q || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Lỗi kết nối máy chủ Gemini.');
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'Dữ liệu hiện có chưa đủ để xác minh câu trả lời.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setError(err.message || 'Không thể liên lạc với Trợ lý. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="w-full max-w-2xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[85vh] max-h-[720px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-[#4A154B] text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FAF8F5]/10 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#F9F1DC]">
                Trợ lý tìm hiểu Ca Huế
              </h3>
              <p className="text-[11px] text-stone-300">
                Đối soát dữ liệu nguồn kiểm chứng · Cố đô Huế
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white rounded-md transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* System Notice */}
        <div className="px-4 py-2 bg-amber-50/90 border-b border-amber-200/80 text-[11px] text-amber-950 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>
            Trợ lý chỉ phản hồi dựa trên {HERITAGE_RECORDS.length} bản ghi và {OFFICIAL_SOURCES.length} tài liệu chính thức đã được kiểm chứng. Không tự tạo thông tin lịch sử.
          </span>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[#4A154B] text-[#D4AF37] flex items-center justify-center shrink-0 text-xs font-bold font-royal mt-1">
                  CH
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-lg p-4 space-y-2 leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#4A154B] text-white shadow-sm'
                    : 'bg-white border border-stone-200 text-stone-800 shadow-xs'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
                <div
                  className={`text-[10px] text-right font-mono ${
                    m.sender === 'user' ? 'text-stone-300' : 'text-stone-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#4A154B] text-[#D4AF37] flex items-center justify-center shrink-0 text-xs font-bold font-royal">
                CH
              </div>
              <div className="bg-white border border-stone-200 rounded-lg p-4 text-xs text-stone-500 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#4A154B]" />
                <span>Đang đối chiếu cơ sở dữ liệu di sản...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-md">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Chips */}
        <div className="px-4 py-2 border-t border-stone-200 bg-[#F5EFE6] overflow-x-auto">
          <div className="flex items-center gap-2 text-xs whitespace-nowrap">
            <span className="text-stone-500 font-medium">Gợi ý:</span>
            {SUGGESTED_QUESTIONS.map((sq, i) => (
              <button
                key={i}
                disabled={loading}
                onClick={() => handleSend(sq)}
                className="px-2.5 py-1 bg-white hover:bg-stone-100 text-stone-700 rounded border border-stone-300 text-xs transition-colors shrink-0 disabled:opacity-50"
              >
                {sq}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-stone-200 bg-[#FAF8F5]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder="Đặt câu hỏi về bài bản, nhạc cụ, không gian Ca Huế..."
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-white border border-stone-300 rounded-lg text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#4A154B]"
            />
            <button
              type="submit"
              disabled={!inputQuestion.trim() || loading}
              className="p-2.5 bg-[#4A154B] text-white rounded-lg hover:bg-[#381039] disabled:opacity-50 transition-colors"
              aria-label="Gửi câu hỏi"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
