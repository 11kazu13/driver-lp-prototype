import { Outlet, useLocation } from 'react-router-dom';
import { JobCounter } from '../components/features/JobCounter';
import { Header } from '../components/layouts/Header';
import { ProgressBar } from '../components/ui/ProgressBar';

import bgImage from '../assets/bg-driver.png';

export const MobileLayout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-slate-900 flex justify-center font-sans text-slate-800 relative">
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 z-0">
        <img src={bgImage} alt="background" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="w-full max-w-[480px] min-h-screen shadow-2xl flex flex-col relative text-left z-10 bg-white/5 backdrop-blur-[1px]">
        {/* Header */}
        <Header />

        {/* Sticky Header Group (Progress + JobCounter) */}
        <div className="sticky top-0 z-40 bg-slate-900/20 backdrop-blur-[2px] pb-1">
          <ProgressBar />
          {/* Conditional Job Counter */}
          {location.pathname !== '/thanks' && <JobCounter />}
        </div>

        {/* Main Content */}
        <main className="flex-1 px-4 pb-24 pt-4">
          <div className="bg-white rounded-xl shadow-xl p-6 relative z-10">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white py-8 text-center text-[10px] text-gray-400 border-t border-gray-100 space-y-2 relative z-10 shadow-t-xl">
          <p>厚生労働大臣許可 13-ユ-309652</p>
          <p>Copyright 2026 © PLEX Inc.</p>
        </footer>
      </div>
    </div>
  );
};
