import React from 'react';
import { Sparkles, Menu, X, BookOpen, Music, Compass, Landmark, FileText, Info } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAiAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onSelectTab, onOpenAiAssistant }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Landmark },
    { id: 'library', label: 'Thư viện di sản', icon: BookOpen },
    { id: 'explorer', label: 'Bài bản & Nhạc cụ', icon: Music },
    { id: 'spaces', label: 'Không gian Ca Huế', icon: Compass },
    { id: 'sources', label: 'Nguồn tư liệu', icon: FileText },
    { id: 'about', label: 'Giới thiệu dự án', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between gap-3 lg:gap-4 h-16 sm:h-20">
          {/* Zone 1: Brand title, auto-fit */}
          <button 
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#4A154B] text-[#D4AF37] flex items-center justify-center font-royal font-bold text-sm sm:text-base border border-[#C59B27]/40 shadow-sm group-hover:scale-105 transition-transform shrink-0">
              CH
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-royal text-sm sm:text-base lg:text-lg font-bold tracking-tight text-[#4A154B] whitespace-nowrap">
                Ca Huế & Thính Phòng
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-500 font-medium truncate">
                Di sản văn hóa phi vật thể Cố đô
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation links, fluid responsive gaps */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-5 text-xs xl:text-sm font-medium text-stone-700">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`relative py-1.5 px-1.5 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#4A154B] font-semibold'
                      : 'hover:text-[#4A154B] text-stone-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A154B] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary action button */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenAiAssistant}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-white bg-[#4A154B] hover:bg-[#381039] active:bg-[#2F0D30] rounded-md shadow-sm border border-[#C59B27]/30 transition-all hover:shadow whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden xl:inline">Trợ lý tìm hiểu Ca Huế</span>
              <span className="xl:hidden">Trợ lý AI</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
            <button
              onClick={onOpenAiAssistant}
              className="p-1.5 sm:p-2 text-[#4A154B] hover:bg-stone-100 rounded-md sm:hidden"
              title="Trợ lý AI"
            >
              <Sparkles className="w-5 h-5 text-[#4A154B]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-md focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#4A154B]/10 text-[#4A154B] font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-4 h-4 text-stone-500" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-stone-200">
            <button
              onClick={() => {
                onOpenAiAssistant();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#4A154B] rounded-md shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Hỏi Trợ lý tìm hiểu Ca Huế</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
