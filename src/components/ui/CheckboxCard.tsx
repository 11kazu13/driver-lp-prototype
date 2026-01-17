import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Check } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CheckboxCardProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export const CheckboxCard = ({ selected, onClick, children, className }: CheckboxCardProps) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full text-left p-4 rounded-xl border-2 transition-all relative overflow-hidden",
        selected
          ? "border-accent bg-orange-50 text-accent font-bold shadow-md"
          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span>{children}</span>
        {selected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-accent text-white p-1 rounded-full"
          >
            <Check size={16} strokeWidth={3} />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
};
