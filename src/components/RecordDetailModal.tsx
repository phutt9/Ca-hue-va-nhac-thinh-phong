import React from 'react';
import { X, CheckCircle2, AlertTriangle, ExternalLink, Bookmark, MapPin, Calendar, BookOpen, Music2, Share2, Check } from 'lucide-react';
import { HeritageRecord } from '../data/cahueData';
import { HeritageImage } from './HeritageImage';

interface RecordDetailModalProps {
  record: HeritageRecord | null;
  onClose: () => void;
  onOpenVerificationModal: (record: HeritageRecord) => void;
  onSelectSource?: (sourceId: string) => void;
}

export const RecordDetailModal: React.FC<RecordDetailModalProps> = ({
  record,
  onClose,
  onOpenVerificationModal,
  onSelectSource,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!record) return null;

  const isVerified = record.verificationStatus === 'Đã xác minh';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}?record=${record.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-stone-200 bg-[#F5EFE6]">
          <div className="space-y-1 pr-3 sm:pr-6 min-w-0">
            <div className="flex items-center gap-2 text-xs text-stone-600 font-mono flex-wrap">
              <span>{record.id}</span>
              <span aria-hidden="true">·</span>
              <span className="font-sans font-medium text-[#4A154B]">{record.category}</span>
              {record.musicalMode && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-sans font-medium text-amber-800">{record.musicalMode}</span>
                </>
              )}
            </div>
            <h2 className="text-lg sm:text-2xl font-serif font-bold text-stone-900 leading-snug break-words">
              {record.name}
            </h2>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={handleCopyLink}
              className="p-1.5 sm:p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 rounded-md transition-colors"
              title="Sao chép liên kết bản ghi"
            >
              {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" /> : <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-md transition-colors"
              aria-label="Đóng cửa sổ"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 text-stone-800 text-xs sm:text-sm md:text-base leading-relaxed">
          {/* Verification Status Banner */}
          <div className={`p-4 rounded-lg border flex items-start gap-3.5 ${
            isVerified 
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              : 'bg-amber-50/80 border-amber-200 text-amber-950'
          }`}>
            {isVerified ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <span>Trạng thái: {record.verificationStatus}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700">
                {isVerified
                  ? `Dữ liệu đã được kiểm chứng đối chiếu với nguồn tư liệu khoa học: ${record.sourceReference.sourceTitle}.`
                  : `Bản ghi đang trong diện nghiên cứu thẩm định. Thông tin chưa được xem là chân lý tuyệt đối và cần đối chiếu thêm bản ký âm lưu trữ.`}
              </p>
              {!isVerified && (
                <div className="pt-2">
                  <button
                    onClick={() => onOpenVerificationModal(record)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
                  >
                    Đề xuất tài liệu kiểm chứng
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Record Image if available */}
          {record.image ? (
            <div className="rounded-lg overflow-hidden border border-stone-200 bg-stone-100">
              <HeritageImage 
                src={record.image} 
                alt={record.name}
                className="w-full h-64 sm:h-80 object-cover" 
              />
              <div className="p-2.5 bg-stone-100/90 text-xs text-stone-600 font-serif italic text-center border-t border-stone-200">
                {record.imageCaption || "Hình ảnh lưu trữ di sản Ca Huế và nhạc khí Cố đô"}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-stone-400 shrink-0" />
              <div>
                <span className="font-semibold text-stone-800 block">Tư liệu hình ảnh gốc đang lưu trữ tại cơ sở nghiên cứu</span>
                <p className="text-stone-500 text-[11px] mt-0.5">
                  Bản ghi này hiện được số hóa dựa trên hồ sơ văn bản khoa học [{record.sourceReference.sourceId}]. Để đảm bảo tính xác thực lịch sử và bản quyền, hệ thống không tự tạo ảnh minh họa khi chưa có bản chụp hiện vật/chân dung đối chứng chính thức.
                </p>
              </div>
            </div>
          )}

          {/* Short Description */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
              Mô tả di sản
            </h3>
            <p className="text-stone-800 text-base leading-relaxed">
              {record.shortDescription}
            </p>
          </div>

          {/* Cultural Value & Characteristics */}
          <div className="space-y-2 p-4 bg-stone-100/70 rounded-lg border border-stone-200">
            <h3 className="text-xs uppercase tracking-wider text-[#4A154B] font-semibold flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#4A154B]" />
              Giá trị văn hóa & Đặc điểm nổi bật
            </h3>
            <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
              {record.culturalValue}
            </p>
          </div>

          {/* Performance Role */}
          {record.performanceRole && (
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider text-stone-500 font-semibold flex items-center gap-2">
                <Music2 className="w-4 h-4 text-stone-600" />
                Vai trò trong thực hành Ca Huế
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed">
                {record.performanceRole}
              </p>
            </div>
          )}

          {/* Detailed Content / Structure if available */}
          {record.detailedContent && record.detailedContent.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider text-stone-500 font-semibold">
                Nội dung chi tiết & Cấu trúc diễn xướng
              </h3>
              <ul className="space-y-2 border-l-2 border-[#4A154B]/30 pl-4">
                {record.detailedContent.map((item, idx) => (
                  <li key={idx} className="text-sm text-stone-700 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Spatial / Geographic Coordinates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-lg border border-stone-200 bg-[#F7F4EE]">
              <span className="text-xs text-stone-500 uppercase tracking-wider block font-semibold mb-1">
                Địa phương hiện nay
              </span>
              <div className="flex items-center gap-1.5 text-stone-900 font-medium text-sm">
                <MapPin className="w-4 h-4 text-[#4A154B]" />
                <span>{record.locationCurrent}</span>
              </div>
            </div>

            {record.locationHistoric && (
              <div className="p-3.5 rounded-lg border border-stone-200 bg-[#F7F4EE]">
                <span className="text-xs text-stone-500 uppercase tracking-wider block font-semibold mb-1">
                  Địa danh lịch sử
                </span>
                <div className="flex items-center gap-1.5 text-stone-900 font-medium text-sm">
                  <LandmarkIcon className="w-4 h-4 text-amber-800" />
                  <span>{record.locationHistoric}</span>
                </div>
              </div>
            )}
          </div>

          {/* Audio Reference if available */}
          {record.externalAudioRef && (
            <div className="p-4 rounded-lg border border-sky-200 bg-sky-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-sky-900 uppercase tracking-wider">
                  Tư liệu tham chiếu âm thanh (Bảo tồn khoa học)
                </span>
                <span className="text-[11px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-mono">
                  {record.externalAudioRef.platformName}
                </span>
              </div>
              <p className="text-xs text-stone-700">
                {record.externalAudioRef.description}
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                <a
                  href={record.externalAudioRef.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sky-800 hover:text-sky-950 font-semibold underline"
                >
                  <span>Truy cập nguồn phát hành chính thức</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-[11px] text-stone-500 italic">
                  * {record.externalAudioRef.licenseNotice}
                </span>
              </div>
            </div>
          )}

          {/* Source Reference Block */}
          <div className="p-4 rounded-lg border border-stone-300 bg-[#EFE9DF] space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-wider text-stone-600 font-semibold flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#4A154B]" />
                Nguồn tài liệu kiểm chứng
              </span>
              <span className="font-mono text-xs font-bold text-[#4A154B] bg-white px-2 py-0.5 rounded border border-stone-200">
                [{record.sourceReference.sourceId}]
              </span>
            </div>
            <p className="font-serif font-semibold text-stone-900 text-sm">
              "{record.sourceReference.sourceTitle}"
            </p>
            <div className="text-xs text-stone-700 space-y-1">
              <div>Đơn vị / Tác giả: <span className="font-medium text-stone-900">{record.sourceReference.publisherOrAuthor}</span></div>
              <div>Trích dẫn: <span className="font-mono">{record.sourceReference.citationDetail}</span></div>
            </div>
            {record.sourceReference.url && (
              <div className="pt-1">
                <a
                  href={record.sourceReference.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#4A154B] hover:underline font-medium"
                >
                  <span>Mở liên kết nguồn kiểm chứng ({record.sourceReference.url})</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 border-t border-stone-200 bg-[#FAF8F5] text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Ngày cập nhật: {record.updatedAt}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 text-white rounded-md hover:bg-stone-900 transition-colors"
          >
            Đóng hồ sơ
          </button>
        </div>
      </div>
    </div>
  );
};

const LandmarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h6M9 14h6M9 18h6" />
  </svg>
);
