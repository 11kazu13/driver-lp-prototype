import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

// Dummy data - weighted toward typical driver demographics
const DUMMY_ENTRIES = [
  { area: '東京都', attr: '40代男性' },
  { area: '神奈川県', attr: '50代男性' },
  { area: '埼玉県', attr: '40代男性' },
  { area: '千葉県', attr: '30代男性' },
  { area: '大阪府', attr: '40代男性' },
  { area: '愛知県', attr: '50代男性' },
  { area: '福岡県', attr: '30代男性' },
  { area: '北海道', attr: '40代男性' },
  { area: '兵庫県', attr: '50代男性' },
  { area: '静岡県', attr: '40代男性' },
  { area: '茨城県', attr: '30代男性' },
  { area: '広島県', attr: '40代男性' },
  { area: '京都府', attr: '50代男性' },
  { area: '新潟県', attr: '40代男性' },
  { area: '宮城県', attr: '30代男性' },
];

const TIME_LABELS = ['たった今', '1分前', '2分前', '3分前'];

export const SocialProofNotification = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(DUMMY_ENTRIES[0]);
  const [timeLabel, setTimeLabel] = useState(TIME_LABELS[0]);

  // Hide on Thanks page
  if (pathname === '/thanks') return null;

  useEffect(() => {
    // Show first notification after 2 seconds
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 2000);

    // Then show at random intervals (15-30 seconds)
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 15000 + 15000); // 15-30 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const showNotification = () => {
    // Pick random entry and time
    const randomEntry = DUMMY_ENTRIES[Math.floor(Math.random() * DUMMY_ENTRIES.length)];
    const randomTime = TIME_LABELS[Math.floor(Math.random() * TIME_LABELS.length)];

    setCurrentEntry(randomEntry);
    setTimeLabel(randomTime);
    setIsVisible(true);

    // Hide after 4-5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 4500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-24 left-4 z-40 max-w-[280px]"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3 flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-600 leading-relaxed">
                <span className="text-gray-400">{timeLabel}、</span>
                <span className="font-bold text-primary">{currentEntry.area}</span>の
                <span className="font-bold text-primary">{currentEntry.attr}</span>が
                <span className="text-green-600 font-bold">エントリー</span>しました
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
