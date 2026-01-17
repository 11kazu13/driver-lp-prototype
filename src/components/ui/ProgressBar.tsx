import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ProgressBar = () => {
  const location = useLocation();
  const path = location.pathname;

  // Define steps
  const steps = [
    '/',        // Step 1
    '/step2',   // Step 2
    '/step3',   // Step 3
    '/step4',   // Step 4
    '/step5',   // Step 5
    '/step6',   // Step 6
    '/step7',   // Step 7
  ];

  const currentIndex = steps.indexOf(path);
  const totalSteps = steps.length;

  // If undefined path (e.g. thanks), don't render or render full
  if (path === '/thanks') return null;
  if (currentIndex === -1) return null;

  const currentStep = currentIndex + 1;
  const progress = (currentStep / totalSteps) * 100;

  // Optimized microcopy logic
  const getStepMessage = (step: number) => {
    switch (step) {
      case 1: return "カンタン30秒で入力完了！";
      case 2: return "サクサク進んでいます✨";
      case 3: return "その調子！折り返し地点です";
      case 4: return "ご希望の条件が見えてきました";
      case 5: return "あと少し！ラストスパート🏃‍♂️";
      case 6: return "次が最後の項目です！";
      case 7: return "入力情報の最終確認";
      default: return "残りわずか！";
    }
  };

  return (
    <div className="w-full">
      {/* Label Row */}
      <div className="flex justify-between items-end px-4 py-1">
        <span className="text-[10px] font-bold text-white/90 tracking-wider shadow-sm">
          STEP {currentStep} <span className="text-white/60">/ {totalSteps}</span>
        </span>
        <span className="text-[10px] font-bold text-accent tracking-wider drop-shadow-sm whitespace-nowrap">
          {getStepMessage(currentStep)}
        </span>
      </div>

      {/* Bar Track */}
      <div className="h-1.5 bg-gray-200/20 w-full backdrop-blur-sm">
        {/* Bar Indicator */}
        <motion.div
          className="h-full bg-accent shadow-[0_0_10px_rgba(249,115,22,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};
