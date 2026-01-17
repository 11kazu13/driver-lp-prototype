// 質問二つを一画面で順に回答させる

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../hooks/useFormStore';
import { CheckboxCard } from '../components/ui/CheckboxCard';

const WORK_STYLES = ['正社員', '業務委託', '派遣', 'バイト']; // 表示する選択肢を配列で管理すると後から追加しやすい
const TIMINGS = ['なるべく早く', '1ヶ月以内', '2ヶ月以内', '3ヶ月以内', '良い求人があれば'];

export const Step3_WorkStyle = () => {
  const navigate = useNavigate();
  const { formData, setFormData, setJobCount } = useFormStore();
  const [step, setStep] = useState<'style' | 'timing'>('style');

  // 質問2の回答後に、質問3の位置へスクロールするための参照
  const timingRef = useRef<HTMLDivElement>(null);

  const handleStyleSelect = (value: string) => {
    setFormData('workStyle', value);
    // 質問2の回答が終わったら、質問3を表示する
    setStep('timing');
    setTimeout(() => {
      timingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleTimingSelect = (value: string) => {
    setFormData('timing', value);
    // 回答が終わったら次のページへ
    setJobCount(4890);
    setTimeout(() => {
      navigate('/step4');
    }, 300);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Q2: 希望の働き方を選ぶ */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-primary">
            <span className="text-accent text-sm block mb-1">Q2</span>
            希望の働き方は？
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {WORK_STYLES.map((style) => (
            <CheckboxCard
              key={style}
              selected={formData.workStyle === style}
              onClick={() => handleStyleSelect(style)}
              className={step === 'timing' && formData.workStyle !== style ? 'opacity-50' : ''}
            >
              {style}
            </CheckboxCard>
          ))}
        </div>
      </div>

      {/* Q2に答えたら、Q3（希望の時期）を表示する */}
      {step === 'timing' && (
        <div ref={timingRef} className="space-y-4 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-primary">
              <span className="text-accent text-sm block mb-1">Q3</span>
              いつ頃の求人を<br />探していますか？
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {TIMINGS.map((time) => (
              <CheckboxCard
                key={time}
                selected={formData.timing === time}
                onClick={() => handleTimingSelect(time)}
              >
                {time}
              </CheckboxCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
