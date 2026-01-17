import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../hooks/useFormStore';
import { motion } from 'framer-motion';
import { Search, Zap } from 'lucide-react';

export const Step1_Motivation = () => {
  const navigate = useNavigate();
  const { setFormData, setJobCount } = useFormStore();

  const handleSelect = (status: 'passive' | 'active') => {
    setFormData('seekingStatus', status);

    // Slight decrement and auto-advance
    setJobCount(5390);

    // Smooth transition
    setTimeout(() => {
      navigate('/step2');
    }, 300);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-4">
      <div className="text-center space-y-3">
        <h2 className="text-lg font-bold text-primary leading-relaxed">
          今すぐの転職でなくても大丈夫です。<br />
          現在のお考えに近いのは？
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Passive Option */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('passive')}
          className="relative overflow-hidden bg-gradient-to-b from-emerald-500 to-emerald-700 p-6 rounded-xl shadow-lg border-t border-white/30 hover:shadow-xl transition-all group text-left flex items-center gap-4"
        >
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="bg-white/20 p-3 rounded-full text-white backdrop-blur-sm">
            <Search size={24} strokeWidth={2.5} />
          </div>
          <div className="relative z-10">
            <span className="block text-lg font-bold text-white text-shadow-sm">良い求人があれば<br />検討したい</span>
          </div>
        </motion.button>

        {/* Active Option */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('active')}
          className="relative overflow-hidden bg-gradient-to-b from-orange-400 to-orange-600 p-6 rounded-xl shadow-lg border-t border-white/30 hover:shadow-xl transition-all group text-left flex items-center gap-4"
        >
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="bg-white/20 p-3 rounded-full text-white backdrop-blur-sm">
            <Zap size={24} strokeWidth={2.5} />
          </div>
          <div className="relative z-10">
            <span className="block text-lg font-bold text-white text-shadow-sm">なるべく早く<br />働きたい</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};
