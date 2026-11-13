import React from 'react';
import { Search, Filter, ShieldCheck, AlertTriangle, ExternalLink, BookOpen, Music, Compass, Users, MapPin, ChevronRight, X } from 'lucide-react';
import { HERITAGE_RECORDS, HeritageRecord } from '../data/cahueData';
import { HeritageImage } from '../components/HeritageImage';

interface LibraryScreenProps {
  onSelectRecord: (record: HeritageRecord) => void;
  onOpenVerificationModal: (record: HeritageRecord) => void;
  onSelectSourceById: (sourceId: string) => void;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({
  onSelectRecord,
  onOpenVerificationModal,
  onSelectSourceById,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('Tất cả');
  const [selectedStatus, setSelectedStatus] = React.useState<string>('Tất cả');
  const [selectedLocation, setSelectedLocation] = React.useState<string>('Tất cả');

  const categories = [
    'Tất cả',
    'Bài bản & Điệu thức',
    'Nhạc cụ',
    'Quy ước biểu diễn',
    'Không gian thưởng thức',
    'Nghệ nhân & Cộng đồng',
  ];

  const locations = [
    'Tất cả',
    'Thành phố Huế',
    'Sông Hương',
  ];

  // Filtering logic
  const filteredRecords = HERITAGE_RECORDS.filter((record) => {
    // Search filter
    const matchesSearch =
      searchTerm === '' ||
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.culturalValue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.musicalMode && record.musicalMode.toLowerCase().includes(searchTerm.toLowerCase()));

    // Category filter
    const matchesCategory =
      selectedCategory === 'Tất cả' || record.category === selectedCategory;

    // Status filter
    const matchesStatus =
      selectedStatus === 'Tất cả' || record.verificationStatus === selectedStatus;

    // Location filter
    const matchesLocation =
      selectedLocation === 'Tất cả' ||
      record.locationCurrent.includes(selectedLocation);

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Tất cả');
    setSelectedStatus('Tất cả');
    setSelectedLocation('Tất cả');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 w-full">
      {/* Title & Introduction */}
      <div className="space-y-2 border-b border-stone-200 pb-4 sm:pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4A154B]">
          <span>Kho lưu trữ di sản</span>
          <span aria-hidden="true">·</span>
          <span>Bắc Trung Bộ</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Thư Viện Di Sản Ca Huế & Ca Nhạc Thính Phòng
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
          Tra cứu toàn bộ hệ thống bản ghi đã được số hóa với mã định danh độc bản. 
          Mỗi bản ghi đều công khai đơn vị xuất bản, tác giả và tài liệu đối chiếu. 
          Các bản ghi đang nghiên cứu được gắn nhãn minh bạch "Cần xác minh nguồn".
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 space-y-4 shadow-xs">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo tên bài bản, nhạc cụ, mã bản ghi (CH-BB-001...), hoặc từ khóa..."
            className="w-full pl-11 pr-4 py-2.5 bg-[#FAF8F5] border border-stone-300 rounded-lg text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#4A154B] focus:bg-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-medium no-scrollbar">
          <span className="text-stone-500 font-semibold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Nhóm:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#4A154B] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status and Location dropdown filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-stone-100 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-stone-500 font-semibold">Trạng thái:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-2.5 py-1.5 bg-[#FAF8F5] border border-stone-300 rounded text-stone-800 text-xs focus:outline-none"
              >
                <option value="Tất cả">Tất cả trạng thái</option>
                <option value="Đã xác minh">Đã xác minh (Hợp lệ)</option>
                <option value="Cần xác minh nguồn">Cần xác minh nguồn</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-stone-500 font-semibold">Địa phương:</span>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-2.5 py-1.5 bg-[#FAF8F5] border border-stone-300 rounded text-stone-800 text-xs focus:outline-none"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === 'Tất cả' ? 'Tất cả địa bàn' : loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-stone-500 tabular-nums">
              Hiển thị <strong>{filteredRecords.length}</strong> / {HERITAGE_RECORDS.length} bản ghi
            </span>
            {(searchTerm || selectedCategory !== 'Tất cả' || selectedStatus !== 'Tất cả' || selectedLocation !== 'Tất cả') && (
              <button
                onClick={resetFilters}
                className="text-[#4A154B] hover:underline font-semibold"
              >
                Đặt lại bộ lọc
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Records Grid */}
      {filteredRecords.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-stone-200 space-y-3">
          <BookOpen className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="text-lg font-serif font-bold text-stone-800">
            Không tìm thấy bản ghi phù hợp
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Không có bản ghi di sản nào khớp với điều kiện tìm kiếm và bộ lọc hiện tại. Quý vị vui lòng thử lại bằng từ khóa khác hoặc đặt lại bộ lọc.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#4A154B] text-white rounded-md text-xs font-semibold hover:bg-[#3d123e]"
          >
            Xóa toàn bộ bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredRecords.map((record) => {
            const isVerified = record.verificationStatus === 'Đã xác minh';
            return (
              <div
                key={record.id}
                className="bg-white rounded-xl border border-stone-200 hover:border-[#4A154B]/40 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Optional Record Thumbnail */}
                {record.image && (
                  <div className="h-44 overflow-hidden bg-stone-100 border-b border-stone-100 relative">
                    <HeritageImage
                      src={record.image}
                      alt={record.name}
                      recordId={record.id}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6 space-y-4 flex-1">
                  {/* Card Header with Unboxed Metadata */}
                  <div className="space-y-1">
                    {!record.image && (
                      <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                        <span>{record.id}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-sans font-medium text-[#4A154B]">{record.category}</span>
                      </div>
                    )}
                    {record.image && (
                      <div className="text-xs font-medium text-[#4A154B]">
                        {record.category}
                      </div>
                    )}

                    <h3 
                      onClick={() => onSelectRecord(record)}
                      className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#4A154B] transition-colors cursor-pointer line-clamp-2"
                    >
                      {record.name}
                    </h3>
                  </div>

                  {/* Clean unboxed musical mode / location */}
                  <div className="flex items-center gap-2 text-xs text-stone-500 flex-wrap">
                    {record.musicalMode && (
                      <>
                        <span className="font-medium text-amber-800">{record.musicalMode}</span>
                        <span aria-hidden="true">·</span>
                      </>
                    )}
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {record.locationCurrent}
                    </span>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                    {record.shortDescription}
                  </p>

                  {/* Source Reference Tag */}
                  <div className="pt-2 text-xs text-stone-500 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-stone-700">Tài liệu kiểm chứng:</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSourceById(record.sourceReference.sourceId);
                        }}
                        className="font-mono text-[#4A154B] hover:underline font-semibold"
                      >
                        [{record.sourceReference.sourceId}]
                      </button>
                    </div>
                    <p className="line-clamp-1 italic text-stone-600">
                      {record.sourceReference.sourceTitle}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Status & Action */}
                <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-medium">
                    {isVerified ? (
                      <div className="flex items-center gap-1 text-emerald-700">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Đã xác minh</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onOpenVerificationModal(record)}
                        className="flex items-center gap-1 text-amber-700 hover:text-amber-800 underline"
                        title="Bấm để đóng góp tư liệu đối chiếu"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Cần xác minh nguồn</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectRecord(record)}
                    className="inline-flex items-center gap-1 text-[#4A154B] font-semibold hover:underline"
                  >
                    <span>Xem chi tiết</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
