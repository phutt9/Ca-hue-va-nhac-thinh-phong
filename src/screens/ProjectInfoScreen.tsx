import React from 'react';
import { Info, User, Hash, Users, ShieldAlert, BookOpen, Check, Edit3, RotateCcw } from 'lucide-react';

export const ProjectInfoScreen: React.FC = () => {
  // Student info state with localStorage persistence
  const [studentName, setStudentName] = React.useState(() => {
    const saved = localStorage.getItem('cahue_student_name');
    if (!saved || saved === 'Nguyễn Văn An' || saved.includes('[') || saved.includes('SV2026')) return 'Trần Thiên Phú';
    return saved;
  });
  const [studentId, setStudentId] = React.useState(() => {
    const saved = localStorage.getItem('cahue_student_id');
    if (!saved || saved === 'SV2026-CH04840' || saved.includes('[') || saved.includes('SV2026')) return 'TH04840';
    return saved;
  });
  const [studentGroup, setStudentGroup] = React.useState(() => {
    const saved = localStorage.getItem('cahue_student_group');
    if (!saved || saved === 'Nhóm Nghiên Cứu Di Sản Bắc Trung Bộ' || saved.includes('[')) return 'Nhóm 2';
    return saved;
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [savedNotice, setSavedNotice] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('cahue_student_name', studentName);
    localStorage.setItem('cahue_student_id', studentId);
    localStorage.setItem('cahue_student_group', studentGroup);
    setIsEditing(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleResetDefault = () => {
    setStudentName('Trần Thiên Phú');
    setStudentId('TH04840');
    setStudentGroup('Nhóm 2');
    localStorage.setItem('cahue_student_name', 'Trần Thiên Phú');
    localStorage.setItem('cahue_student_id', 'TH04840');
    localStorage.setItem('cahue_student_group', 'Nhóm 2');
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 w-full">
      {/* Page Title */}
      <div className="space-y-3 border-b border-stone-200 pb-4 sm:pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4A154B]">
          <span>Hồ sơ học phần</span>
          <span aria-hidden="true">·</span>
          <span>Số hóa di sản văn hóa phi vật thể</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
          Thông Tin Dự Án & Hồ Sơ Sinh Viên
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
          Ứng dụng được thiết kế phục vụ đề án số hóa di sản văn hóa phi vật thể vùng Bắc Trung Bộ, 
          tuân thủ chuẩn mực học thuật, tính xác thực dữ liệu và tôn trọng cộng đồng thực hành di sản.
        </p>
      </div>

      {/* Student & Project Details Card */}
      <div className="bg-white rounded-xl border border-stone-300 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-[#4A154B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif font-bold text-base text-[#F9F1DC]">
              Thông Tin Định Danh Đề Án
            </h2>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded transition-colors text-white"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isEditing ? 'Đóng chỉnh sửa' : 'Cập nhật thông tin sinh viên'}</span>
          </button>
        </div>

        {savedNotice && (
          <div className="px-6 py-2.5 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Thông tin sinh viên đã được lưu thành công trên trình duyệt.</span>
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleSave} className="p-6 space-y-4 bg-[#FAF8F5]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                  Họ tên sinh viên
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#4A154B]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                  Mã sinh viên
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#4A154B]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-600 mb-1">
                  Nhóm thực hiện
                </label>
                <input
                  type="text"
                  value={studentGroup}
                  onChange={(e) => setStudentGroup(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#4A154B]"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={handleResetDefault}
                className="px-3 py-1.5 border border-stone-300 rounded text-xs text-stone-700 hover:bg-stone-100 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Mặc định</span>
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#4A154B] text-white rounded text-xs font-semibold hover:bg-[#381039]"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        ) : null}

        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1 border-b sm:border-b-0 sm:border-r border-stone-200 pb-4 sm:pb-0 pr-4">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
                Tên ứng dụng
              </span>
              <p className="font-serif font-bold text-lg text-stone-900">
                Ca Huế và ca nhạc thính phòng
              </p>
            </div>

            <div className="space-y-1 border-b sm:border-b-0 lg:border-r border-stone-200 pb-4 sm:pb-0 pr-4">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
                Vùng văn hóa
              </span>
              <p className="font-serif font-bold text-lg text-[#4A154B]">
                Bắc Trung Bộ
              </p>
              <p className="text-xs text-stone-500">
                Trọng tâm: Cố đô Huế (Thừa Thiên Huế)
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold block">
                Phạm vi dữ liệu
              </span>
              <p className="font-serif font-bold text-base text-stone-900">
                Ca Huế và ca nhạc thính phòng
              </p>
              <p className="text-xs text-stone-500">
                Bài bản, điệu thức, nhạc khí, quy ước, không gian & nghệ nhân
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-stone-200 space-y-1">
              <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold uppercase">
                <User className="w-4 h-4 text-[#4A154B]" />
                <span>Họ tên sinh viên</span>
              </div>
              <p className="text-base font-bold text-stone-900">
                {studentName}
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-stone-200 space-y-1">
              <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold uppercase">
                <Hash className="w-4 h-4 text-[#4A154B]" />
                <span>Mã sinh viên</span>
              </div>
              <p className="text-base font-mono font-bold text-stone-900">
                {studentId}
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-stone-200 space-y-1">
              <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold uppercase">
                <Users className="w-4 h-4 text-[#4A154B]" />
                <span>Nhóm thực hiện</span>
              </div>
              <p className="text-base font-bold text-stone-900">
                {studentGroup}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Data Limitations & Ethics Notice */}
      <div className="bg-[#FAF0E6] rounded-xl border border-amber-300 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-[#4A154B] font-serif font-bold text-lg">
          <ShieldAlert className="w-5 h-5 text-amber-700" />
          <span>Giới Hạn Dữ Liệu & Nguyên Tắc Bảo Tồn Di Sản</span>
        </div>

        <div className="text-xs sm:text-sm text-stone-800 leading-relaxed space-y-3">
          <p>
            <strong>1. Giới hạn dữ liệu:</strong> Chỉ sử dụng thông tin có nguồn dẫn kiểm chứng được từ các cơ quan nhà nước, 
            bảo tàng hoặc công trình nghiên cứu đã xuất bản. Dữ liệu chưa xác minh phải được đánh dấu minh bạch 
            nhãn <em>"Cần xác minh nguồn"</em> và không được trình bày như sự thật tuyệt đối.
          </p>
          <p>
            <strong>2. Không thay thế tiếng nói của cộng đồng:</strong> Ứng dụng là sản phẩm học thuật hỗ trợ lưu trữ, 
            học tập và tra cứu. Ứng dụng <em>không thay thế tư liệu nghiên cứu chuyên sâu, không thay thế thực hành diễn xướng sống động 
            và tiếng nói của cộng đồng nghệ nhân</em> đang trực tiếp gìn giữ di sản tại Thừa Thiên Huế.
          </p>
          <p>
            <strong>3. Bản quyền & Quyền sở hữu tư liệu:</strong> Đối với dữ liệu liên quan đến nghệ nhân, bản ghi âm, 
            ghi hình, ứng dụng dẫn nguồn từ các đơn vị quản lý di sản công lập. Ứng dụng không tự tạo bản ghi âm giả lập 
            hay tự gán quyền sử dụng khi chưa có sự cho phép chính thức.
          </p>
        </div>
      </div>

      {/* Technical Architecture */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 space-y-4">
        <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#4A154B]" />
          Kiến Trúc Kỹ Thuật & Tích Hợp Gemini AI
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-stone-700">
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-900">1. Full-Stack & Bảo mật</h4>
            <p className="leading-relaxed">
              Xây dựng trên nền tảng React 19 + TypeScript + Express full-stack. 
              Mọi lệnh gọi mô hình Gemini AI đều được thực thi tại máy chủ nội bộ (server-side proxy route), 
              hoàn toàn không để lộ khóa bí mật (API key) ra trình duyệt người dùng.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-900">2. Cơ chế Grounded Gemini Assistant</h4>
            <p className="leading-relaxed">
              Trợ lý Gemini 3.8 Flash được trang bị System Instruction nghiêm ngặt. 
              Khi người dùng truy vấn, mô hình chỉ khai thác kho tri thức 18 bản ghi và 7 nguồn kiểm chứng. 
              Nếu dữ liệu không có sẵn, trợ lý chủ động thông báo "Dữ liệu hiện có chưa đủ để xác minh câu trả lời".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
