import { useLocation } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const AiHelpButton = () => {
  const { pathname } = useLocation();
  const [isOpen] = useState(false);

  // Show only on Step 2 to Step 7 (Input forms)
  // Step 1 is simple choice, Thanks is completion.
  const targetPaths = [
    '/step2',
    '/step3',
    '/step4',
    '/step5',
    '/step6',
    '/step7'
  ];

  const shouldShow = targetPaths.some(path => pathname.includes(path));

  if (!shouldShow) return null;

  const handleClick = () => {
    // Demo action
    alert("AIチャットボットが起動します（Demo）\n\nここに入力支援AIが立ち上がります。");
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2 pointer-events-none">
      {/* Balloon with bounce animation */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 1 }}
            className="bg-white text-[10px] font-bold py-1.5 px-3 rounded-full shadow-lg border border-primary/10 text-primary whitespace-nowrap pointer-events-auto"
          >
            チャットで相談
            <div className="absolute -bottom-1 right-6 w-2 h-2 bg-white rotate-45 border-b border-r border-primary/10"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="bg-white p-3.5 rounded-full shadow-2xl border border-white/50 relative group pointer-events-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/0 rounded-full" />
        <Bot className="w-7 h-7 text-primary relative z-10" />
      </motion.button>
    </div>
  );
};
