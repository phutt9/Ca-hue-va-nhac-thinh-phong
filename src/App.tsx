/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RecordDetailModal } from './components/RecordDetailModal';
import { VerificationModal } from './components/VerificationModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { HomeScreen } from './screens/HomeScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { ExplorerScreen } from './screens/ExplorerScreen';
import { SpacesScreen } from './screens/SpacesScreen';
import { SourcesScreen } from './screens/SourcesScreen';
import { ProjectInfoScreen } from './screens/ProjectInfoScreen';
import { HERITAGE_RECORDS, HeritageRecord } from './data/cahueData';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedRecord, setSelectedRecord] = useState<HeritageRecord | null>(null);
  const [verificationRecord, setVerificationRecord] = useState<HeritageRecord | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [highlightedSourceId, setHighlightedSourceId] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSelectRecordById = (id: string) => {
    const found = HERITAGE_RECORDS.find((r) => r.id === id);
    if (found) {
      setSelectedRecord(found);
    }
  };

  const handleSelectSourceById = (sourceId: string) => {
    setHighlightedSourceId(sourceId);
    setCurrentTab('sources');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const el = document.getElementById(`source-${sourceId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setHighlightedSourceId(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#4A154B] selection:text-[#FAF8F5]">
      {/* Top Bar Contract Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
      />

      {/* Main Screen Content */}
      <main className="flex-1 w-full">
        {currentTab === 'home' && (
          <HomeScreen
            onSelectTab={handleTabChange}
            onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
            onSelectRecordById={handleSelectRecordById}
          />
        )}

        {currentTab === 'library' && (
          <LibraryScreen
            onSelectRecord={(rec) => setSelectedRecord(rec)}
            onOpenVerificationModal={(rec) => setVerificationRecord(rec)}
            onSelectSourceById={handleSelectSourceById}
          />
        )}

        {currentTab === 'explorer' && (
          <ExplorerScreen
            onSelectRecord={(rec) => setSelectedRecord(rec)}
            onSelectSourceById={handleSelectSourceById}
          />
        )}

        {currentTab === 'spaces' && (
          <SpacesScreen
            onSelectRecord={(rec) => setSelectedRecord(rec)}
            onSelectSourceById={handleSelectSourceById}
          />
        )}

        {currentTab === 'sources' && (
          <SourcesScreen
            onSelectRecord={(rec) => setSelectedRecord(rec)}
            highlightedSourceId={highlightedSourceId}
          />
        )}

        {currentTab === 'about' && (
          <ProjectInfoScreen />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleTabChange} />

      {/* Floating AI Assistant Trigger Button (Bottom Right) */}
      <button
        onClick={() => setIsAiAssistantOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 inline-flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#4A154B] hover:bg-[#381039] active:bg-[#2F0D30] text-[#F9F1DC] rounded-full shadow-lg border border-[#C59B27]/40 hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm font-semibold cursor-pointer group"
        aria-label="Mở Trợ lý tìm hiểu Ca Huế"
      >
        <Sparkles className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Trợ lý Ca Huế</span>
      </button>

      {/* Record Detail Modal */}
      <RecordDetailModal
        record={selectedRecord}
        onClose={() => setSelectedRecord(null)}
        onOpenVerificationModal={(rec) => {
          setSelectedRecord(null);
          setVerificationRecord(rec);
        }}
        onSelectSource={handleSelectSourceById}
      />

      {/* Source Verification Modal */}
      <VerificationModal
        record={verificationRecord}
        onClose={() => setVerificationRecord(null)}
        onSuccess={(info) => {
          showToast(`Đã tiếp nhận yêu cầu thẩm định (${info.id}): ${info.message}`);
        }}
      />

      {/* Gemini AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onNavigateToRecord={(recId) => {
          setIsAiAssistantOpen(false);
          handleSelectRecordById(recId);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-5 py-3 rounded-lg shadow-xl text-xs sm:text-sm flex items-center gap-2 border border-stone-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
