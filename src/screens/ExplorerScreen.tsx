import React from 'react';
import { Music, Radio, BookOpen, ExternalLink, ShieldCheck, Info, Sparkles, Layers } from 'lucide-react';
import { HERITAGE_RECORDS, HeritageRecord } from '../data/cahueData';
import { HeritageImage } from '../components/HeritageImage';

interface ExplorerScreenProps {
  onSelectRecord: (record: HeritageRecord) => void;
  onSelectSourceById: (sourceId: string) => void;
}

export const ExplorerScreen: React.FC<ExplorerScreenProps> = ({
  onSelectRecord,
  onSelectSourceById,
}) => {
  const [activeTab, setActiveTab] = React.useState<'modes' | 'instruments'>('modes');

  const songRecords = HERITAGE_RECORDS.filter((r) => r.category === 'Bài bản & Điệu thức');
  const instrumentRecords = HERITAGE_RECORDS.filter((r) => r.category === 'Nhạc cụ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 w-full">
      {/* Page Header */}
      <div className="space-y-3 border-b border-stone-200 pb-4 sm:pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4A154B]">
          <span>Chuyên đề âm nhạc học</span>
          <span aria-hidden="true">·</span>
          <span>Cố đô Huế</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Khám Phá Hệ Thống Bài Bản & Nhạc Cụ Ca Huế
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
          Tìm hiểu cấu trúc âm luật, điệu thức, thang âm ngũ cung và hệ thống nhạc cụ cổ truyền của Ca Huế. 
          Theo nguyên tắc bảo tồn di sản, mọi thông tin đều gắn với khảo cứu của Viện Âm nhạc và Bảo tàng Cổ vật Cung đình Huế. 
          Không sử dụng âm thanh mô phỏng giả lập; các đường dẫn ngoài chỉ trỏ tới kho lưu trữ công lập có thẩm quyền.
        </p>

        {/* Tab switch */}
        <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('modes')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'modes'
                ? 'bg-[#4A154B] text-white shadow-sm'
                : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/60'
            }`}
          >
            Hệ thống Bài bản & Điệu thức ({songRecords.length} bài bản)
          </button>
          <button
            onClick={() => setActiveTab('instruments')}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'instruments'
                ? 'bg-[#4A154B] text-white shadow-sm'
                : 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/60'
            }`}
          >
            Bộ Nhạc cụ Thính phòng & Định âm ({instrumentRecords.length} nhạc cụ)
          </button>
        </div>
      </div>

      {/* Tab Content 1: Modes & Repertoire */}
      {activeTab === 'modes' && (
        <div className="space-y-10">
          {/* Theoretical Box */}
          <div className="bg-[#FAF8F5] rounded-xl border border-stone-300 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-serif font-bold text-stone-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#4A154B]" />
              Âm luật học: Sự lưỡng hợp giữa Hơi Bắc và Hơi Nam
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              Theo công trình khảo cứu của GS.TS Trần Văn Khê và Viện Âm nhạc (Nguồn [SRC-04], [SRC-02]), 
              Ca Huế sở hữu hệ thống bài bản phong phú với hơn 60 khúc điệu nhưng quy tụ trong hai hệ thống điệu thức nền tảng:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-xs sm:text-sm">
              <div className="p-4 bg-white rounded-lg border border-stone-200 space-y-2">
                <span className="font-semibold text-[#4A154B] uppercase tracking-wider text-xs block">
                  1. Điệu Bắc (Hơi Bắc)
                </span>
                <p className="text-stone-700 leading-relaxed">
                  Đặc trưng bởi cấu trúc ngũ cung chuẩn mực (Hò, Xự, Xang, Xê, Cống), không rung nhấn quá sâu. 
                  Biểu cảm sự trang trọng, tươi sáng, uy nghiêm mang phong vị cung đình. 
                  Thường mở màn bằng liên hoàn Lưu Thủy - Kim Tiền - Xuân Phong - Long Hổ hoặc Cổ Bản.
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-stone-200 space-y-2">
                <span className="font-semibold text-purple-900 uppercase tracking-wider text-xs block">
                  2. Điệu Nam (Hơi Nam, Nam Ai, Nam Bình, Oán)
                </span>
                <p className="text-stone-700 leading-relaxed">
                  Đặc trưng bởi các nốt nhấn chùng dây độc đáo (nốt Xự nhấn non, nốt Cống rung hột, nốt Xang vuốt lả). 
                  Biểu cảm nỗi buồn kín đáo, trầm tư sâu lắng, ai oán nhưng tao nhã, phản ánh tâm sự thế sự và con người xứ Huế.
                </p>
              </div>
            </div>
          </div>

          {/* Songs List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Danh mục bài bản điệu thức đã số hóa
              </h3>
              <span className="text-xs text-stone-500 font-mono">
                Số lượng: {songRecords.length} bài bản
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {songRecords.map((song) => (
                <div
                  key={song.id}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-[#4A154B]/50 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {song.image && (
                      <div className="h-48 overflow-hidden bg-stone-100 border-b border-stone-200 relative">
                        <HeritageImage
                          src={song.image}
                          alt={song.name}
                          caption={song.imageCaption}
                          showCaptionOverlay={Boolean(song.imageCaption)}
                          className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                        <span>{song.id}</span>
                        <span className="font-sans font-semibold text-[#4A154B] bg-[#FAF8F5] px-2 py-0.5 rounded border border-stone-200">
                          {song.musicalMode}
                        </span>
                      </div>

                      <h4 
                        onClick={() => onSelectRecord(song)}
                        className="font-serif font-bold text-lg text-stone-900 hover:text-[#4A154B] transition-colors cursor-pointer"
                      >
                        {song.name}
                      </h4>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {song.shortDescription}
                      </p>

                      {song.performanceRole && (
                        <div className="p-3 bg-[#FAF8F5] rounded border border-stone-200 text-xs text-stone-700">
                          <strong className="text-stone-900 block mb-0.5">Vai trò trong thực hành:</strong>
                          {song.performanceRole}
                        </div>
                      )}

                      {song.externalAudioRef && (
                        <div className="p-3 bg-sky-50/80 rounded border border-sky-200 text-xs space-y-1">
                          <span className="font-semibold text-sky-900 block">
                            Tư liệu tham khảo khoa học ({song.externalAudioRef.platformName})
                          </span>
                          <p className="text-stone-600 text-[11px]">
                            {song.externalAudioRef.description}
                          </p>
                          <a
                            href={song.externalAudioRef.externalUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sky-800 hover:underline font-semibold pt-1"
                          >
                            <span>Mở tư liệu đối chứng chính thức</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => onSelectSourceById(song.sourceReference.sourceId)}
                      className="text-stone-500 hover:text-[#4A154B] font-mono hover:underline"
                    >
                      Nguồn: [{song.sourceReference.sourceId}]
                    </button>
                    <button
                      onClick={() => onSelectRecord(song)}
                      className="text-[#4A154B] font-semibold hover:underline"
                    >
                      Xem chi tiết bài bản →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Musical Instruments */}
      {activeTab === 'instruments' && (
        <div className="space-y-10">
          {/* Instruments Theory Note */}
          <div className="bg-[#FAF8F5] rounded-xl border border-stone-300 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Quy chuẩn Dàn Nhạc Thính Phòng: "Hòa Đàn Ngũ Tuyệt"
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              Theo tài liệu Bảo tàng Cổ vật Cung đình Huế (Nguồn [SRC-03]), dàn nhạc Ca Huế truyền thống không sử dụng nhạc cụ gõ to hay tăng âm điện tử. 
              Biên chế kinh điển là dàn <strong>Ngũ tuyệt</strong> gồm: Đàn Nguyệt, Đàn Tranh, Đàn Tỳ Bà, Đàn Nhị và Đàn Tam. 
              Nếu thiếu Đàn Tam, dàn nhạc trở thành <strong>Tứ tuyệt</strong>. Nhạc công điều khiển âm sắc hòa quyện, đối thoại và tôn vinh giọng ca ca nhi.
            </p>
          </div>

          {/* Instrument Gallery & Detail Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {instrumentRecords.map((inst) => (
              <div
                key={inst.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {inst.image && (
                    <div className="h-60 overflow-hidden bg-stone-100 border-b border-stone-200 relative">
                      <HeritageImage
                        src={inst.image}
                        alt={inst.name}
                        caption={inst.imageCaption}
                        showCaptionOverlay={Boolean(inst.imageCaption)}
                        className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                      <span>{inst.id}</span>
                      <span className="font-sans font-medium text-emerald-700 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {inst.verificationStatus}
                      </span>
                    </div>

                    <h3 
                      onClick={() => onSelectRecord(inst)}
                      className="font-serif font-bold text-xl text-stone-900 hover:text-[#4A154B] transition-colors cursor-pointer"
                    >
                      {inst.name}
                    </h3>

                    <p className="text-sm text-stone-700 leading-relaxed">
                      {inst.shortDescription}
                    </p>

                    <div className="space-y-1.5 pt-2 text-xs text-stone-600">
                      <div>
                        <strong className="text-stone-900">Đặc tính kỹ thuật & âm sắc:</strong>
                        <p className="mt-0.5 text-stone-700 leading-relaxed">{inst.culturalValue}</p>
                      </div>
                      {inst.performanceRole && (
                        <div className="pt-1">
                          <strong className="text-stone-900">Vai trò trong dàn nhạc:</strong>
                          <p className="mt-0.5 text-stone-700">{inst.performanceRole}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-mono">
                    Nguồn: [{inst.sourceReference.sourceId}] {inst.sourceReference.publisherOrAuthor}
                  </span>
                  <button
                    onClick={() => onSelectRecord(inst)}
                    className="text-[#4A154B] font-semibold hover:underline"
                  >
                    Xem hồ sơ hiện vật →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
