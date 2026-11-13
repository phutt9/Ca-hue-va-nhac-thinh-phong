import React from 'react';
import { ShieldCheck, BookOpen, ExternalLink } from 'lucide-react';
import { HERITAGE_RECORDS, OFFICIAL_SOURCES } from '../data/cahueData';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-stone-200 bg-[#F2ECE1] text-stone-700 text-sm py-10 sm:py-12 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-royal text-lg font-bold text-[#4A154B]">
                Ca Huế & Ca Nhạc Thính Phòng
              </span>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-lg">
              Dự án học thuật số hóa di sản văn hóa phi vật thể vùng Bắc Trung Bộ (Thừa Thiên Huế). 
              Tập trung lưu trữ hệ thống bài bản, điệu thức, nhạc cụ, không gian thưởng thức và quy ước biểu diễn 
              với nguồn tư liệu kiểm chứng minh bạch từ cơ quan chuyên môn.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Quyết định số 1877/QĐ-BVHTTDL ngày 08/6/2015 - Di sản phi vật thể quốc gia</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 text-xs tracking-wider uppercase mb-3">
              Điều hướng chính
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onSelectTab('home')} className="hover:text-[#4A154B] transition-colors">
                  Trang chủ
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('library')} className="hover:text-[#4A154B] transition-colors">
                  Thư viện di sản ({HERITAGE_RECORDS.length} bản ghi)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('explorer')} className="hover:text-[#4A154B] transition-colors">
                  Bài bản & Nhạc cụ Cố đô
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('spaces')} className="hover:text-[#4A154B] transition-colors">
                  Không gian thưởng thức Ca Huế
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 text-xs tracking-wider uppercase mb-3">
              Tư liệu & Học thuật
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onSelectTab('sources')} className="hover:text-[#4A154B] transition-colors">
                  Danh mục {OFFICIAL_SOURCES.length} nguồn tham khảo
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('about')} className="hover:text-[#4A154B] transition-colors">
                  Giới thiệu & Giới hạn dữ liệu
                </button>
              </li>
              <li>
                <a 
                  href="http://dsvh.gov.vn" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-[#4A154B] transition-colors"
                >
                  <span>Cục Di sản Văn hóa</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://hueworldheritage.org.vn" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-[#4A154B] transition-colors"
                >
                  <span>Bảo tàng Cổ vật Cung đình</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-300/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © 2026 Số hóa Di sản Ca Huế - Vùng Văn hóa Bắc Trung Bộ. Tôn trọng cộng đồng thực hành di sản.
          </p>
          <div className="flex items-center gap-4 text-stone-500">
            <span>Nguyên tắc: Trung thực học thuật</span>
            <span aria-hidden="true">·</span>
            <span>Không bịa đặt tư liệu</span>
            <span aria-hidden="true">·</span>
            <span>Minh bạch nguồn dẫn</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
