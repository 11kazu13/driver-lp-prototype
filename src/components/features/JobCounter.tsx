import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useFormStore } from '../../hooks/useFormStore';
import { Sparkles, Search, CheckCircle2 } from 'lucide-react';

export const JobCounter = () => {
  const { jobCount, formData } = useFormStore();

  // Logic to determine if user has started answering
  // We check if Step 1 (Motivation) or any subsequent data is present.
  const hasStarted = formData.seekingStatus !== '' || formData.licenses.length > 0;

  const spring = useSpring(0, {
    stiffness: 40,
    damping: 20,
    duration: 2
  });

  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (jobCount !== null) {
      spring.set(jobCount);
    }
  }, [jobCount, spring]);

  return (
    <div className="px-4 pt-3 pb-1">
      <div className="bg-white rounded-xl shadow-xl p-1 relative z-20">
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative overflow-hidden bg-white border border-orange-200 border-dashed rounded-lg p-3 flex flex-col items-center justify-center transition-colors duration-500"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-white/40 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-1">
            {/* Dynamic Label / Badge */}
            {!hasStarted ? (
              <div className="flex items-center gap-1.5 bg-orange-100/80 px-3 py-0.5 rounded-full border border-orange-200">
                <CheckCircle2 size={12} className="text-orange-600" />
                <span className="text-[10px] font-bold text-orange-700 tracking-wide">
                  非公開・好条件求人を含む
                </span>
              </div>
            ) : (
              <div className="h-[22px]" /> // Spacer
            )}

            {/* Main Text & Number */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-gray-500 mb-0.5">
                {hasStarted ? 'あなたの条件にマッチする求人' : '現在ご紹介可能な求人'}
              </span>

              <div className="flex items-baseline gap-2">
                {/* Start Icon */}
                {hasStarted && <Search className="text-orange-400 w-4 h-4" />}

                <div className="flex items-baseline">
                  {jobCount === null ? (
                    <span className="text-3xl font-extrabold text-orange-500 tracking-wider animate-pulse">
                      ???
                    </span>
                  ) : (
                    <motion.span className="text-4xl font-extrabold text-orange-600 tracking-tight tabular-nums drop-shadow-sm">
                      {display}
                    </motion.span>
                  )}
                  <span className="text-sm font-bold text-orange-500 ml-1">件</span>
                </div>

                {/* End Icon */}
                {!hasStarted && <Sparkles className="text-orange-400 w-4 h-4 animate-pulse" />}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
