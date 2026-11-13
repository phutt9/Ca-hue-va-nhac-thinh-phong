import React from 'react';
import { Compass, Volume2, Users, Clock, Music, Target, AlertCircle, Bookmark, CheckCircle2 } from 'lucide-react';
import { SPACE_COMPARISON_DATA, HERITAGE_RECORDS, HeritageRecord } from '../data/cahueData';
import { HeritageImage } from '../components/HeritageImage';

interface SpacesScreenProps {
  onSelectRecord: (record: HeritageRecord) => void;
  onSelectSourceById: (sourceId: string) => void;
}

export const SpacesScreen: React.FC<SpacesScreenProps> = ({
  onSelectRecord,
  onSelectSourceById,
}) => {
  const spaceRecords = HERITAGE_RECORDS.filter((r) => r.category === 'Không gian thưởng thức');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-12 w-full">
      {/* Title */}
      <div className="space-y-3 border-b border-stone-200 pb-4 sm:pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4A154B]">
          <span>Môi trường sinh thái di sản</span>
          <span aria-hidden="true">·</span>
          <span>Không gian diễn xướng</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Không Gian Thưởng Thức Ca Huế: Truyền Thống & Đương Đại
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
          Nghệ thuật Ca Huế gắn liền mật thiết với không gian thưởng thức. 
          Theo nghiên cứu của Viện Âm nhạc và Hội Văn nghệ Dân gian Thừa Thiên Huế (Nguồn [SRC-06], [SRC-07]), 
          sự chuyển dịch từ không gian thính phòng sang sân khấu du lịch thuyền rồng đem lại cơ hội phổ biến di sản 
          nhưng cũng tạo ra những biến đổi căn bản về thẩm mỹ và chuẩn mực diễn tấu.
        </p>
      </div>

      {/* Featured Spaces Presentation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {spaceRecords.map((space) => (
          <div
            key={space.id}
            className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {space.image && (
                <div className="h-48 overflow-hidden bg-stone-100 border-b border-stone-200 relative">
                  <HeritageImage
                    src={space.image}
                    alt={space.name}
                    caption={space.imageCaption}
                    showCaptionOverlay={Boolean(space.imageCaption)}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4 sm:p-6 space-y-3">
                <div className="text-xs font-mono text-stone-500">
                  {space.id} · {space.locationCurrent}
                </div>
                <h3 
                  onClick={() => onSelectRecord(space)}
                  className="font-serif font-bold text-lg text-stone-900 hover:text-[#4A154B] transition-colors cursor-pointer"
                >
                  {space.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {space.shortDescription}
                </p>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-3.5 bg-[#FAF8F5] border-t border-stone-100 flex items-center justify-between text-xs">
              <button
                onClick={() => onSelectSourceById(space.sourceReference.sourceId)}
                className="text-stone-500 hover:text-[#4A154B] font-mono hover:underline truncate max-w-[140px] sm:max-w-none text-left"
              >
                Nguồn: [{space.sourceReference.sourceId}]
              </button>
              <button
                onClick={() => onSelectRecord(space)}
                className="text-[#4A154B] font-semibold hover:underline shrink-0"
              >
                Xem chi tiết →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Analytical Comparison Section */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#4A154B] font-semibold">
            Bảng đối sánh khoa học
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Đối Sánh Ca Huế Thính Phòng Cổ Truyền vs Ca Huế Biểu Diễn Du Lịch
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-3xl">
            So sánh dựa trên kỷ yếu hội thảo khoa học của Hội Văn nghệ Dân gian Thừa Thiên Huế (Nguồn [SRC-07]) 
            và chuyên luận của GS. Tô Vũ (Nguồn [SRC-06]).
          </p>
        </div>

        {/* Desktop Comparison Table */}
        <div className="hidden lg:block bg-white rounded-xl border border-stone-300 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-[#4A154B] text-white text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6 w-1/5 border-r border-[#3d113e]">Tiêu chí đối sánh</th>
                <th className="py-4 px-6 w-2/5 border-r border-[#3d113e] bg-[#3d113e]">
                  Ca Huế Thính Phòng / Tư Gia (Truyền Thống)
                </th>
                <th className="py-4 px-6 w-2/5">
                  Ca Huế Biểu Diễn Du Lịch (Thuyền Rồng / Đương Đại)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {SPACE_COMPARISON_DATA.map((item, index) => (
                <tr key={index} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-stone-900 bg-[#FAF8F5] border-r border-stone-200 text-xs">
                    {item.criterion}
                  </td>
                  <td className="py-4 px-6 text-stone-800 leading-relaxed border-r border-stone-200 text-xs sm:text-sm">
                    {item.chamberTraditional}
                  </td>
                  <td className="py-4 px-6 text-stone-700 leading-relaxed text-xs sm:text-sm">
                    {item.tourismModern}
                    <div className="mt-2 pt-2 border-t border-stone-100 text-[11px] text-stone-500 italic">
                      * Nhận xét: {item.notes}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card-Based Comparison */}
        <div className="lg:hidden space-y-4">
          {SPACE_COMPARISON_DATA.map((item, index) => (
            <div key={index} className="bg-white rounded-xl border border-stone-200 p-5 space-y-4 shadow-xs">
              <h3 className="font-serif font-bold text-base text-stone-900 border-b border-stone-100 pb-2">
                {item.criterion}
              </h3>

              <div className="space-y-1.5 p-3.5 bg-[#FAF8F5] rounded-lg border border-stone-200">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4A154B] block">
                  Thính phòng / Tư gia truyền thống
                </span>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  {item.chamberTraditional}
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 bg-stone-50 rounded-lg border border-stone-200">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                  Biểu diễn du lịch (Thuyền rồng)
                </span>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {item.tourismModern}
                </p>
              </div>

              <div className="text-[11px] text-stone-500 italic">
                * {item.notes}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curatorial & Conservation Note */}
      <div className="bg-[#FAF5ED] rounded-xl border border-[#D4AF37]/50 p-6 sm:p-8 space-y-4">
        <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-[#4A154B]" />
          Khuyến Nghị Bảo Tồn Tính Nguyên Gốc Của Ca Huế
        </h3>
        <div className="text-xs sm:text-sm text-stone-700 leading-relaxed space-y-3">
          <p>
            Các nhà nghiên cứu văn hóa không phủ nhận giá trị kinh tế - xã hội của Ca Huế phục vụ du lịch trên sông Hương, 
            bởi đây là kênh đưa nét đẹp âm nhạc Cố đô đến với hàng trăm ngàn lượt du khách mỗi năm.
          </p>
          <p>
            Tuy nhiên, <strong>không thể đánh đồng Ca Huế du lịch với Ca Huế thính phòng mẫu mực</strong>. 
            Để di sản không bị biến dạng và thương mại hóa thái quá, tỉnh Thừa Thiên Huế và các nhà khoa học khuyến nghị:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-stone-800 pl-2">
            <li>Quy hoạch và phục dựng các không gian thính phòng mộc (nhà rường cổ, cung điện, phủ đệ) dành riêng cho các chương trình bác học chuyên sâu.</li>
            <li>Kiểm soát chất lượng âm thanh, hạn chế dùng loa công suất lớn trên sông Hương để tránh làm méo mó âm sắc nhạc cụ dân tộc.</li>
            <li>Khuyến khích nghệ nhân gìn giữ trọn vẹn lời cổ của các đại khúc (Nam Ai, Nam Bình, Tứ Đại Cảnh) thay vì chỉ hát các đoạn ca trích lược.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
