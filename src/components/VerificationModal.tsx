import React from 'react';
import { X, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { HeritageRecord } from '../data/cahueData';

interface VerificationModalProps {
  record: HeritageRecord | null;
  onClose: () => void;
  onSuccess: (submissionInfo: { id: string; message: string }) => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  record,
  onClose,
  onSuccess,
}) => {
  const [contributorName, setContributorName] = React.useState('');
  const [organization, setOrganization] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [suggestedSourceUrl, setSuggestedSourceUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  if (!record) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim()) {
      setError('Vui lòng cung cấp căn cứ hoặc tài liệu đối chiếu cụ thể.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/records/verify-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recordId: record.id,
          contributorName,
          organization,
          notes,
          suggestedSourceUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Lỗi gửi yêu cầu xác minh.');
      }

      onSuccess({
        id: data.submissionId || 'VERIF-SUBMITTED',
        message: data.message || 'Góp ý xác minh đã được tiếp nhận thành công.',
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Không thể gửi đề xuất. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="w-full max-w-lg bg-[#FAF8F5] rounded-xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-200 bg-[#F5EFE6]">
          <div className="space-y-0.5 min-w-0 pr-2">
            <span className="text-xs font-mono uppercase text-stone-500">
              Quy trình kiểm chứng học thuật
            </span>
            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 break-words">
              Đề xuất nguồn kiểm chứng: {record.id}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-stone-800">
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Bản ghi: {record.name} ({record.verificationStatus})</span>
            </div>
            <p>
              Để bảo vệ tính chân thực của di sản Ca Huế, mọi bổ sung phải có căn cứ từ công trình nghiên cứu, bản ký âm hoặc tư liệu lưu trữ của các viện nghiên cứu, bảo tàng có thẩm quyền.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Họ tên người nghiên cứu / đóng góp
            </label>
            <input
              type="text"
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              placeholder="VD: Nguyễn Văn A (Nhà nghiên cứu / Sinh viên)"
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#4A154B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Đơn vị / Cơ sở đào tạo (nếu có)
            </label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="VD: Học viện Âm nhạc Huế / ĐH Khoa học Huế"
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#4A154B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Tài liệu / Bản ký âm / Căn cứ thẩm định <span className="text-rose-600">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ghi rõ tên tài liệu, tác giả, nhà xuất bản, năm, số trang hoặc địa chỉ lưu trữ bản ký âm gốc..."
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#4A154B]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1">
              Đường dẫn số hóa (nếu có công bố công khai)
            </label>
            <input
              type="url"
              value={suggestedSourceUrl}
              onChange={(e) => setSuggestedSourceUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#4A154B]"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 rounded-md text-stone-700 hover:bg-stone-100 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A154B] text-white rounded-md hover:bg-[#381039] transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Đang gửi...' : 'Gửi thẩm định'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
