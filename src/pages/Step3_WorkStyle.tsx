import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../hooks/useFormStore';
import { CheckboxCard } from '../components/ui/CheckboxCard';

const WORK_STYLES = ['正社員', '業務委託', '派遣', 'バイト'];
const TIMINGS = ['なるべく早く', '1ヶ月以内', '2ヶ月以内', '3ヶ月以内', '良い求人があれば'];

export const Step3_WorkStyle = () => {
  const navigate = useNavigate();
  const { formData, setFormData, setJobCount } = useFormStore();
  const [step, setStep] = useState<'style' | 'timing'>('style');

  // Refs for scrolling if needed, or simple view switching
  const timingRef = useRef<HTMLDivElement>(null);

  const handleStyleSelect = (value: string) => {
    setFormData('workStyle', value);
    // Auto advance to Timing
    setStep('timing');
    setTimeout(() => {
      timingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleTimingSelect = (value: string) => {
    setFormData('timing', value);
    // Auto advance to next page
    setJobCount(4890);
    navigate('/step4');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Question 2: Work Style */}
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

      {/* Question 3: Timing - Shown after Q2 is answered */}
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
