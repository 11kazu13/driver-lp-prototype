import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useFormStore } from '../../hooks/useFormStore';

export const JobCounter = () => {
  const { jobCount } = useFormStore();


  const spring = useSpring(jobCount || 0, {
    stiffness: 50,
    damping: 15,
  });

  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (jobCount !== null) {
      spring.set(jobCount);
    }
  }, [jobCount, spring]);

  return (
    <div className="flex flex-col items-center justify-center py-2 bg-white/90 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <span className="text-xs text-gray-500 font-medium">該当求人数</span>
      <div className="flex items-baseline gap-1">
        {jobCount === null ? (
          <span className="text-2xl font-bold text-primary animate-pulse tracking-wider">
            約 ???
          </span>
        ) : (
          <motion.span className="text-2xl font-bold text-primary tabular-nums tracking-tight">
            {display}
          </motion.span>
        )}
        <span className="text-sm font-bold text-primary">件</span>
      </div>
    </div>
  );
};
