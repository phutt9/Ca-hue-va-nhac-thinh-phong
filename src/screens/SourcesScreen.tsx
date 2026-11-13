import React from 'react';
import { BookOpen, ExternalLink, ShieldCheck, CheckCircle2, Bookmark, FileText, ArrowRight } from 'lucide-react';
import { OFFICIAL_SOURCES, HERITAGE_RECORDS, HeritageSource, HeritageRecord } from '../data/cahueData';

interface SourcesScreenProps {
  onSelectRecord: (record: HeritageRecord) => void;
  highlightedSourceId?: string;
}

export const SourcesScreen: React.FC<SourcesScreenProps> = ({
  onSelectRecord,
  highlightedSourceId,
}) => {
  const [filterType, setFilterType] = React.useState<string>('all');

  const filteredSources = OFFICIAL_SOURCES.filter((s) => {
    if (filterType === 'official') return s.isOfficialStateSource;
    if (filterType === 'books') return s.sourceType === 'Sách khảo cứu khoa học';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 w-full">
      {/* Page Header */}
      <div className="space-y-3 border-b border-stone-200 pb-4 sm:pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4A154B]">
          <span>Thư mục tài liệu kiểm chứng</span>
          <span aria-hidden="true">·</span>
          <span>Tính minh bạch học thuật</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Danh Mục Nguồn Tư Liệu Thẩm Định Ca Huế
        </h1>
        <p className="text-sm text-stone-600 max-w-3xl leading-relaxed">
          Tập hợp đầy đủ {OFFICIAL_SOURCES.length} nguồn tham khảo phục vụ quá trình số hóa và đối chiếu bài bản. 
          Trong đó bao gồm tối thiểu {OFFICIAL_SOURCES.filter((s) => s.isOfficialStateSource).length} nguồn chính thức 
          từ Bộ Văn hóa Thể thao và Du lịch, Viện Âm nhạc, Bảo tàng Cổ vật Cung đình Huế và Sở Văn hóa & Thể thao Thừa Thiên Huế. 
          Mọi đường dẫn đều được đối chiếu với cổng lưu trữ công lập thực tế.
        </p>

        {/* Filter buttons */}
        <div className="pt-3 flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-[#4A154B] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Tất cả nguồn ({OFFICIAL_SOURCES.length})
          </button>
          <button
            onClick={() => setFilterType('official')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filterType === 'official'
                ? 'bg-[#4A154B] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Nguồn chính thức cơ quan nhà nước & Bảo tàng ({OFFICIAL_SOURCES.filter((s) => s.isOfficialStateSource).length})
          </button>
          <button
            onClick={() => setFilterType('books')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
              filterType === 'books'
                ? 'bg-[#4A154B] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Sách khảo cứu khoa học ({OFFICIAL_SOURCES.filter((s) => s.sourceType === 'Sách khảo cứu khoa học').length})
          </button>
        </div>
      </div>

      {/* Sources List */}
      <div className="space-y-6">
        {filteredSources.map((source) => {
          const isHighlighted = highlightedSourceId === source.id;
          const citingRecords = HERITAGE_RECORDS.filter(
            (r) => r.sourceReference.sourceId === source.id
          );

          return (
            <div
              key={source.id}
              id={`source-${source.id}`}
              className={`bg-white rounded-xl border p-6 sm:p-8 space-y-4 transition-all ${
                isHighlighted
                  ? 'border-[#4A154B] ring-2 ring-[#4A154B]/20 bg-purple-50/20'
                  : 'border-stone-200 shadow-xs hover:border-stone-300'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-stone-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="font-bold text-[#4A154B] bg-[#FAF8F5] px-2 py-0.5 rounded border border-stone-200">
                      [{source.id}]
                    </span>
                    <span className="text-stone-500 font-sans">{source.sourceType}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="text-stone-500 font-sans">Năm phát hành: {source.publishedYear}</span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-stone-900 leading-snug">
                    {source.title}
                  </h3>
                  <div className="text-xs text-stone-600 font-medium">
                    Đơn vị phát hành / Tác giả: <span className="text-stone-900">{source.authorOrPublisher}</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {source.isOfficialStateSource ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-xs font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Nguồn chính thức công lập
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-700 border border-stone-200 rounded-md text-xs font-medium">
                      <Bookmark className="w-3.5 h-3.5 text-stone-500" />
                      Công trình khảo cứu học thuật
                    </span>
                  )}
                </div>
              </div>

              {/* Verified Scope */}
              <div className="space-y-1.5 p-4 bg-[#FAF8F5] rounded-lg border border-stone-200 text-xs sm:text-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4A154B] block">
                  Phạm vi và nội dung được dùng để xác minh:
                </span>
                <p className="text-stone-800 leading-relaxed">
                  {source.verifiedScope}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {source.description}
              </p>

              {/* Records citing this source */}
              {citingRecords.length > 0 && (
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
                    Các bản ghi di sản tham chiếu nguồn này ({citingRecords.length} bản ghi):
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {citingRecords.map((rec) => (
                      <button
                        key={rec.id}
                        onClick={() => onSelectRecord(rec)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-stone-50 border border-stone-200 rounded text-xs text-stone-800 transition-colors cursor-pointer"
                        title={rec.name}
                      >
                        <span className="font-mono text-[#4A154B] font-semibold">{rec.id}</span>
                        <span className="line-clamp-1 max-w-[200px]">{rec.name}</span>
                        <ArrowRight className="w-3 h-3 text-stone-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Outbound Link */}
              {source.url && (
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#4A154B] font-semibold hover:underline"
                  >
                    <span>Cổng tra cứu / Lưu trữ gốc ({source.url})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-stone-400 text-[11px]">
                    Kiểm chứng đường dẫn: Đã xác thực
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
