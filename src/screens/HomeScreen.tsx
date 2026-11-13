import React from 'react';
import { ArrowRight, BookOpen, Music, Compass, ShieldCheck, Sparkles, AlertTriangle, Layers, Landmark } from 'lucide-react';
import { HERITAGE_RECORDS, OFFICIAL_SOURCES } from '../data/cahueData';
import { HeritageImage } from '../components/HeritageImage';

interface HomeScreenProps {
  onSelectTab: (tab: string) => void;
  onOpenAiAssistant: () => void;
  onSelectRecordById: (id: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectTab,
  onOpenAiAssistant,
  onSelectRecordById,
}) => {
  const totalRecords = HERITAGE_RECORDS.length;
  const verifiedRecords = HERITAGE_RECORDS.filter((r) => r.verificationStatus === 'Đã xác minh').length;
  const unverifiedRecords = HERITAGE_RECORDS.filter((r) => r.verificationStatus === 'Cần xác minh nguồn').length;
  const totalSources = OFFICIAL_SOURCES.length;
  const officialStateSources = OFFICIAL_SOURCES.filter((s) => s.isOfficialStateSource).length;

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 w-full">
      {/* Hero Marquee Section: Perfectly Balanced 2-Column Cultural Layout */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#270B28] via-[#2F0D30] to-[#1F0720] text-[#FAF8F5] border-b border-stone-800 w-full">
        {/* Archival ambient background */}
        <div className="absolute inset-0 z-0 opacity-15 mix-blend-luminosity">
          <img
            src="/images/authentic/cahue_thinhphong_authentic.jpg"
            alt="Diễn xướng Ca Huế"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#2F0D30]/60 to-[#1F0720]/90 z-1" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Editorial Heritage Introduction */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF8F5]/10 backdrop-blur-md border border-[#C59B27]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#C59B27] animate-pulse shrink-0" />
                <span>Di sản văn hóa phi vật thể Quốc gia · Bắc Trung Bộ</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-[1.18]">
                Ca Huế và Ca Nhạc Thính Phòng
              </h1>

              <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-2xl">
                Hệ thống số hóa bài bản, điệu thức, quy ước biểu diễn, nhạc cụ và không gian thưởng thức Ca Huế Cố đô. 
                Dữ liệu có nguồn kiểm chứng minh bạch từ Cục Di sản văn hóa, Viện Âm nhạc Quốc gia và Bảo tàng Cổ vật Cung đình Huế.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onSelectTab('library')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-[#C59B27] hover:bg-[#b0871d] active:bg-[#997316] text-stone-950 font-bold text-xs sm:text-sm rounded-md shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <span>Khám phá Thư viện ({totalRecords} bản ghi)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectTab('spaces')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-md border border-white/25 backdrop-blur-xs transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#D4AF37]" />
                  <span>Đối sánh không gian</span>
                </button>

                <button
                  onClick={onOpenAiAssistant}
                  className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-[#4A154B] hover:bg-[#3d123e] text-[#F9F1DC] font-medium text-xs sm:text-sm rounded-md border border-[#C59B27]/50 shadow-sm transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Trợ lý AI</span>
                </button>
              </div>

              {/* Trust & Citation Strip */}
              <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-stone-300 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>100% dữ liệu có nguồn trích dẫn</span>
                </div>
                <span className="text-white/20" aria-hidden="true">·</span>
                <span>QĐ 1877/QĐ-BVHTTDL</span>
                <span className="text-white/20" aria-hidden="true">·</span>
                <span>{totalRecords} Bản ghi di sản</span>
              </div>
            </div>

            {/* Right Column: Featured Cultural Photo Showcase Card */}
            <div className="lg:col-span-5 w-full">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-[#C59B27]/40 shadow-2xl bg-[#3D143E]/90 backdrop-blur-sm group">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                  <img
                    src="/images/authentic/cahue_thinhphong_authentic.jpg"
                    alt="Biểu diễn Ca Huế trong không gian thính phòng mẫu mực"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2F0D30] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-3 left-3 bg-[#2F0D30]/85 backdrop-blur-xs text-[#D4AF37] border border-[#C59B27]/30 text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
                    <Music className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Không gian Thính phòng Cố đô</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-2 text-stone-200 text-xs">
                  <div className="flex items-center justify-between text-[#D4AF37] font-serif font-bold text-sm">
                    <span>Diễn Xướng Ca Huế Thính Phòng</span>
                    <span className="text-[11px] font-mono text-stone-400 font-normal">[CH-BB-004]</span>
                  </div>
                  <p className="text-stone-300 leading-relaxed text-[11px] sm:text-xs">
                    Ảnh tư liệu: Không gian thính phòng tao nhã với dàn nhạc Ngũ tuyệt và ca nhi diễn tấu mộc trong trang phục truyền thống xứ Huế (Tư liệu Wikimedia Commons).
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-white/10 text-[11px] text-stone-400">
                    <span>Nguồn: Viện Âm nhạc & BVHTTDL</span>
                    <button
                      onClick={() => onSelectRecordById('CH-BB-004')}
                      className="text-[#D4AF37] hover:underline font-semibold"
                    >
                      Xem bản ghi Tứ Đại Cảnh →
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quantitative Rigor Stats Strip (Elevated Card Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20 w-full">
        <div className="bg-white rounded-xl border border-stone-200/90 shadow-lg p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-stone-100 gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900">
                Chỉ số Số hóa Dữ liệu Thực tế
              </h2>
              <p className="text-xs text-stone-500">
                Thống kê trực tiếp từ cơ sở dữ liệu đã phân loại trong ứng dụng (không sử dụng số liệu giả định).
              </p>
            </div>
            <div className="text-xs font-mono text-stone-600 bg-[#FAF8F5] px-3 py-1 rounded-md border border-stone-200 flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Dữ liệu Kiểm chứng</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-100">
            <div className="space-y-1 sm:px-2 pt-2 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-[#4A154B] tabular-nums">
                {totalRecords}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Tổng bản ghi di sản
              </div>
              <div className="text-[11px] text-stone-500">
                5 nhóm nội dung chính
              </div>
            </div>

            <div className="space-y-1 sm:px-4 pt-3 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-700 tabular-nums flex items-center gap-1.5">
                <span>{verifiedRecords}</span>
                <ShieldCheck className="w-5 h-5 text-emerald-600 inline shrink-0" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Đã xác minh nguồn
              </div>
              <div className="text-[11px] text-stone-500">
                Kiểm chứng tài liệu học thuật
              </div>
            </div>

            <div className="space-y-1 sm:px-4 pt-3 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-700 tabular-nums flex items-center gap-1.5">
                <span>{unverifiedRecords}</span>
                <AlertTriangle className="w-5 h-5 text-amber-600 inline shrink-0" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Cần xác minh nguồn
              </div>
              <div className="text-[11px] text-stone-500">
                Đang đối chiếu bản ký âm
              </div>
            </div>

            <div className="space-y-1 sm:px-4 pt-3 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tabular-nums">
                {totalSources}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                Nguồn tư liệu tham khảo
              </div>
              <div className="text-[11px] text-stone-500">
                {officialStateSources} nguồn cơ quan nhà nước
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Overview: What is Ca Huế Thính Phòng? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#4A154B] font-semibold">
                <Landmark className="w-3.5 h-3.5 text-[#4A154B]" />
                <span>Khái luận di sản văn hóa</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug">
                Nghệ thuật thính phòng đỉnh cao giữa lòng văn hóa Bắc Trung Bộ
              </h2>
              <div className="text-stone-700 text-sm sm:text-base leading-relaxed space-y-3.5">
                <p>
                  Ca Huế là một thể loại âm nhạc cổ truyền mang tính chuyên nghiệp, bác học của xứ Huế, 
                  được hình thành từ sự giao lưu và kết tinh giữa dòng âm nhạc dân gian vùng Bình - Trị - Thiên 
                  với âm nhạc cung đình triều Nguyễn.
                </p>
                <p>
                  Khác với các hình thức diễn xướng dân gian ngoài trời, Ca Huế đích thực là thể loại ca nhạc 
                  <strong> thính phòng tao nhã</strong>, vốn được tổ chức trong các dinh thự, phủ đệ của hoàng thân quốc thích 
                  hoặc tư gia của giới tao nhân mặc khách. Nghệ thuật này đòi hỏi kỹ thuật đàn hát mộc tinh tế, 
                  sự am tường lề lối ngón đàn và mối quan hệ tri âm sâu sắc giữa người thưởng ngoạn và ca nhi.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone-600 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4A154B]" />
                  <span>Không gian: Thính phòng tư gia / Nhà rường</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4A154B]" />
                  <span>Dàn nhạc: Ngũ tuyệt / Tứ tuyệt cổ điển</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
                <img
                  src="/images/authentic/songhuong_hue_authentic.jpg"
                  alt="Dòng sông Hương êm đềm xứ Huế"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-72 object-cover"
                />
                <div className="p-4 bg-[#FAF8F5] border-t border-stone-200 text-xs text-stone-700 space-y-1">
                  <p className="font-serif font-semibold text-stone-900">
                    Dòng sông Hương êm đềm xứ Huế
                  </p>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Ảnh tư liệu thực tế (Wikimedia Commons): Cảnh sắc sông Hương thanh bình - cái nôi thiên nhiên nuôi dưỡng tâm hồn ca nhạc thính phòng Cố đô.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 2 Pillars of Musical Modes: Hơi Bắc & Hơi Nam */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#4A154B] font-semibold">
            Hệ thống âm luật
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Hai Hệ Thống Điệu Thức Cốt Lõi
          </h2>
          <p className="text-sm text-stone-600">
            Hệ thống bài bản Ca Huế phân định rõ nét giữa Hơi Bắc và Hơi Nam với thang âm ngũ cung độc đáo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card Hơi Bắc */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase text-stone-500">
                  Điệu thức thứ nhất
                </span>
                <span className="text-xs font-medium bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded border border-amber-200">
                  Chuẩn mực & Trang nghiêm
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Điệu Bắc (Hơi Bắc)
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                Mang tính chất vui tươi, trong sáng, trang trọng và đĩnh đạc. Gắn liền với các bài bản cổ điển như: 
                <strong> Lưu Thủy, Kim Tiền, Xuân Phong, Long Hổ, Cổ Bản</strong>. Tiết tấu nhịp nhàng, vững chãi, 
                thường được dùng để hòa tấu mở đầu đêm thính phòng.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">Thang âm: Hò, Xự, Xang, Xê, Cống (Bắc)</span>
              <button
                onClick={() => onSelectTab('explorer')}
                className="text-[#4A154B] hover:underline font-semibold"
              >
                Xem các bài điệu Bắc →
              </button>
            </div>
          </div>

          {/* Card Hơi Nam */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase text-stone-500">
                  Điệu thức thứ hai
                </span>
                <span className="text-xs font-medium bg-purple-50 text-purple-900 px-2.5 py-0.5 rounded border border-purple-200">
                  Trầm tư & Hoài niệm
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Điệu Nam (Nam Ai & Nam Bình)
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                Thể hiện chiều sâu nội tâm, nỗi buồn man mác, bi tráng của con người xứ Huế. 
                <strong> Nam Ai</strong> mang sắc thái da diết thương cảm; <strong>Nam Bình</strong> êm dịu, thanh thoát; 
                kết hợp kỹ thuật rung nhấn, vi phân cung đặc trưng của ngón đàn miền Trung.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">Đặc trưng: Kỹ thuật rung mổ hạt, nhấn chùng dây</span>
              <button
                onClick={() => onSelectTab('explorer')}
                className="text-[#4A154B] hover:underline font-semibold"
              >
                Xem các bài điệu Nam →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Heritage Records Quick Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#4A154B] font-semibold">
              Bản ghi tiêu biểu
            </span>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Khám Phá Di Sản Từ Thư Viện
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('library')}
            className="text-xs sm:text-sm font-semibold text-[#4A154B] hover:underline inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Xem toàn bộ {totalRecords} bản ghi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HERITAGE_RECORDS.slice(0, 3).map((record) => (
            <div
              key={record.id}
              onClick={() => onSelectRecordById(record.id)}
              className="bg-white rounded-xl border border-stone-200 hover:border-[#4A154B]/40 hover:shadow-md transition-all overflow-hidden cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {record.image && (
                  <div className="h-44 overflow-hidden bg-stone-100 border-b border-stone-200 relative">
                    <HeritageImage
                      src={record.image}
                      alt={record.name}
                      recordId={record.id}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <div className="text-[#4A154B] font-sans font-medium text-xs">
                    {record.category}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 line-clamp-2 group-hover:text-[#4A154B] transition-colors">
                    {record.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                    {record.shortDescription}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-3.5 border-t border-stone-100 flex items-center justify-between text-xs bg-[#FAF8F5]">
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{record.verificationStatus}</span>
                </div>
                <span className="text-stone-400 font-mono">[{record.sourceReference.sourceId}]</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scientific Principle Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#FAF0E6] rounded-xl border border-amber-300/80 p-5 sm:p-7 space-y-2.5 shadow-xs">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-base">
            <Landmark className="w-5 h-5 text-[#4A154B]" />
            <span>Nguyên tắc Số hóa Di sản Phi vật thể</span>
          </div>
          <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
            Hệ thống tuân thủ nghiêm ngặt tính chân xác của tư liệu. Dữ liệu không chứa các nội dung bịa đặt, 
            không dùng các bản ghi âm hoặc tư liệu nghe nhìn chưa được cấp phép. 
            Mọi bài bản, nhạc cụ hay không gian đều có hồ sơ lưu trữ đối chứng tại Cục Di sản Văn hóa, Viện Âm nhạc Việt Nam 
            và Sở Văn hóa & Thể thao Thừa Thiên Huế.
          </p>
        </div>
      </section>
    </div>
  );
};
