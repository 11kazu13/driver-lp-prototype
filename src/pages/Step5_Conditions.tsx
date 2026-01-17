import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../hooks/useFormStore';
import { Button } from '../components/ui/Button';
import { CheckboxCard } from '../components/ui/CheckboxCard';
import { useState, useEffect } from 'react';
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

  // Step5に入った時点の「基準求人数」を仮で置いている（実際は前のステップの結果）
  useEffect(() => {
    // 求人数は選択した数だけ減らすイメージ
    const BASE_COUNT = 4200;
    const REDUCTION_PER_ITEM = 185; // 1つ選ぶごとに減る数
    const MIN_COUNT = 1560; // これ以下にはしない

    const reduction = formData.conditions.length * REDUCTION_PER_ITEM;
    const nextCount = Math.max(MIN_COUNT, BASE_COUNT - reduction);

    setJobCount(nextCount);
  }, [formData.conditions, setJobCount]);

  const toggleCondition = (value: string) => {
    const current = formData.conditions;
    const isSelected = current.includes(value);

    // すでに選ばれていれば外す、なければ追加する
    const next = isSelected
      ? current.filter(l => l !== value)
      : [...current, value];

    setFormData('conditions', next);

    if (!isSelected) {
      // 選んだときだけ応援メッセージを一時表示する
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const handleNext = () => {
    // 遷移中は「???」表示にするため、求人数を一旦nullにする
    setJobCount(null);
    setTimeout(() => {
      navigate('/step6');
    }, 300);
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

      {/* 条件を選んだときの「安心させる」通知 */}
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
