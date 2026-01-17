import { Outlet } from 'react-router-dom';
import { JobCounter } from '../components/features/JobCounter';
import { Header } from '../components/layouts/Header';

export const MobileLayout = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center font-sans text-slate-800">
      <div className="w-full max-w-[480px] bg-white min-h-screen shadow-xl flex flex-col relative">
        {/* Header */}
        <Header />

        {/* Sticky Job Counter */}
        <JobCounter />

        {/* Main Content */}
        <main className="flex-1 p-4 pb-24">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white py-8 text-center text-[10px] text-gray-400 border-t border-gray-100 space-y-2">
          <p>厚生労働大臣 許可番号 13-ユ-309652</p>
          <p>Copyright 2026 © PLEX Inc.</p>
        </footer>
      </div>
    </div>
  );
};
