import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../hooks/useFormStore';
import { Button } from '../components/ui/Button';

// Generate birth years (18 to 70 years old)
const currentYear = new Date().getFullYear();
const BIRTH_YEARS = Array.from({ length: 53 }, (_, i) => currentYear - 18 - i);

export const Step6_Location = () => {
  const navigate = useNavigate();
  const { formData, setFormData, setJobCount } = useFormStore();
  const [address, setAddress] = useState('');

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData('zipCode', val);

    if (val.length === 7) {
      setAddress('東京都新宿区西新宿'); // Mock response
    } else {
      setAddress('');
    }
  };

  const handleNext = () => {
    // Final count for conversion
    setJobCount(3216);
    navigate('/step7');
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Q7 Zip Code */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-primary">
            <span className="text-accent text-sm block mb-1">Q7</span>
            お住まいの郵便番号
          </h2>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <input
            type="text"
            pattern="\d*"
            maxLength={7}
            placeholder="1234567 (ハイフンなし)"
            className="w-full text-center text-2xl font-bold tracking-widest p-3 border-b-2 border-gray-300 focus:border-accent outline-none transition-colors rounded-none placeholder:text-gray-300 placeholder:text-lg"
            value={formData.zipCode}
            onChange={handleZipChange}
          />
          {address && (
            <div className="text-center text-primary font-bold bg-blue-50 py-2 rounded-lg animate-in fade-in zoom-in duration-300">
              {address}
            </div>
          )}
        </div>
      </div>

      {/* Q8 Birth Year */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-primary">
            <span className="text-accent text-sm block mb-1">Q8</span>
            生まれ年
          </h2>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <select
            className="w-full p-3 text-lg bg-transparent outline-none text-center font-medium"
            value={formData.birthYear}
            onChange={(e) => setFormData('birthYear', e.target.value)}
          >
            <option value="">選択してください</option>
            {BIRTH_YEARS.map(year => (
              <option key={year} value={year}>{year}年</option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-4 sticky bottom-4 z-10 pb-4">
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          disabled={!formData.zipCode || !formData.birthYear}
          className="shadow-xl"
        >
          次へ進む
        </Button>
      </div>
    </div>
  );
};
