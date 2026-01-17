import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../hooks/useFormStore';
import { Button } from '../components/ui/Button';
import { CheckboxCard } from '../components/ui/CheckboxCard';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const CONDITIONS = [
  '持病持ちOK',
  '日払い・前払いOK',
  '入れ墨OK',
  '事故歴不問',
  '前科不問',
  '寮・社宅あり',
  '手積みなし',
  '夜勤なし'
];

export const Step5_Conditions = () => {
  const navigate = useNavigate();
  const { formData, setFormData, setJobCount } = useFormStore();
  const [showToast, setShowToast] = useState(false);

  const toggleCondition = (value: string) => {
    const current = formData.conditions;
    const isSelected = current.includes(value);

    const next = isSelected
      ? current.filter(l => l !== value)
      : [...current, value];

    setFormData('conditions', next);

    if (!isSelected) {
      // Show positive feedback
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const handleNext = () => {
    // Set Job Count to "???" (null)
    setJobCount(null);
    navigate('/step6');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-primary">
          <span className="text-accent text-sm block mb-1">Q6</span>
          こだわり条件は？
        </h2>
        <p className="text-sm text-gray-500">当てはまるものを全て選択（複数可）</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {CONDITIONS.map((item) => (
          <CheckboxCard
            key={item}
            selected={formData.conditions.includes(item)}
            onClick={() => toggleCondition(item)}
            className="text-sm p-3 h-full flex items-center"
          >
            {item}
          </CheckboxCard>
        ))}
      </div>

      <div className="pt-4 sticky bottom-4 z-10 pb-4">
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          className="shadow-xl"
        >
          次へ進む
        </Button>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="absolute bottom-24 left-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl z-50 whitespace-nowrap text-sm font-bold flex items-center gap-2 w-max"
          >
            <span>✨</span> その条件で歓迎の企業があります！
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
