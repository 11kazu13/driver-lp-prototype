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
          className="bg-white border-2 border-slate-100 p-6 rounded-xl shadow-sm hover:border-slate-300 hover:shadow-md transition-all group text-left flex items-center gap-4"
        >
          <div className="bg-slate-100 p-3 rounded-full text-slate-500 group-hover:bg-slate-200 transition-colors">
            <Search size={24} strokeWidth={2.5} />
          </div>
          <div>
            <span className="block text-lg font-bold text-slate-700">良い求人があれば<br />検討したい</span>
          </div>
        </motion.button>

        {/* Active Option */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('active')}
          className="bg-white border-2 border-brand/10 p-6 rounded-xl shadow-sm hover:border-brand/30 hover:shadow-md transition-all group text-left flex items-center gap-4"
        >
          <div className="bg-brand/10 p-3 rounded-full text-brand group-hover:bg-brand/20 transition-colors">
            <Zap size={24} strokeWidth={2.5} />
          </div>
          <div>
            <span className="block text-lg font-bold text-brand">なるべく早く<br />働きたい</span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};
