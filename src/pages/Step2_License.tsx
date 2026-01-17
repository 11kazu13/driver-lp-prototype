import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../hooks/useFormStore';
import { Button } from '../components/ui/Button';
import { CheckboxCard } from '../components/ui/CheckboxCard';

const LICENSES = [
  'AT（5t・8t限定含む）',
  'MT普通',
  'MT準中型',
  '準中型',
  'MT中型',
  '中型',
  '大型',
  'けん引'
];

export const Step2_License = () => {
  const navigate = useNavigate();
  const { formData, setFormData, setJobCount } = useFormStore();

  const toggleLicense = (license: string) => {
    const current = formData.licenses;
    const isSelected = current.includes(license);

    // Toggle logic
    const nextLicenses = isSelected
      ? current.filter(l => l !== license)
      : [...current, license];

    setFormData('licenses', nextLicenses);
  };

  const handleNext = () => {
    // Decrease Job Count for next step
    setJobCount(5120);
    navigate('/step3');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-primary">
          どんな免許を<br />お持ちですか？
        </h2>
        <p className="text-sm text-gray-500 font-medium">複数選択が可能です</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {LICENSES.map((license) => (
          <CheckboxCard
            key={license}
            selected={formData.licenses.includes(license)}
            onClick={() => toggleLicense(license)}
          >
            {license}
          </CheckboxCard>
        ))}
      </div>

      <div className="pt-4 sticky bottom-4 z-10 pb-4">
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          disabled={formData.licenses.length === 0}
          className="shadow-xl"
        >
          次へ進む
        </Button>
      </div>
    </div>
  );
};
