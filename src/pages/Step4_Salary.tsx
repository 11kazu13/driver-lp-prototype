import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../hooks/useFormStore';
import { CheckboxCard } from '../components/ui/CheckboxCard';

const SALARIES = ['300万円', '400万円', '500万円', '600万円'];
const STATUSES = ['離職済／退職確定済', 'できるだけ早く辞めたい', '半年以上は辞められない', '良い転職先なら検討する'];

export const Step4_Salary = () => {
  const navigate = useNavigate();
  const { formData, setFormData, setJobCount } = useFormStore();
  const [step, setStep] = useState<'salary' | 'status'>('salary');

  const statusRef = useRef<HTMLDivElement>(null);

  const handleSalarySelect = (value: string) => {
    setFormData('salary', value);
    setStep('status');
    setTimeout(() => {
      statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleStatusSelect = (value: string) => {
    setFormData('status', value);
    setJobCount(4200);
    navigate('/step5');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-primary">
            <span className="text-accent text-sm block mb-1">Q4</span>
            希望年収は？
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {SALARIES.map((item) => (
            <CheckboxCard
              key={item}
              selected={formData.salary === item}
              onClick={() => handleSalarySelect(item)}
              className={step === 'status' && formData.salary !== item ? 'opacity-50' : ''}
            >
              {item}
            </CheckboxCard>
          ))}
        </div>
      </div>

      {step === 'status' && (
        <div ref={statusRef} className="space-y-4 pt-8 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-primary">
              <span className="text-accent text-sm block mb-1">Q5</span>
              お仕事の状況は？
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {STATUSES.map((item) => (
              <CheckboxCard
                key={item}
                selected={formData.status === item}
                onClick={() => handleStatusSelect(item)}
              >
                {item}
              </CheckboxCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
