export const Header = () => {
  return (
    <header className="bg-primary pt-3 pb-3 px-4 shadow-md z-50 relative">
      <div className="flex flex-col items-center justify-center space-y-1">
        {/* Logo */}
        <h1 className="font-bold text-2xl tracking-tighter text-white leading-none">
          PLEX JOB
        </h1>

        {/* Subtext */}
        <p className="text-[10px] text-white/90 font-medium">
          ドライバー専門の求人サイト
        </p>
      </div>
    </header>
  );
};
