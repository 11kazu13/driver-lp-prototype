import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../hooks/useFormStore';
import { Button } from '../components/ui/Button';

export const Step7_Entry = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormStore();
  const [errors, setErrors] = useState<{ name?: string, phone?: string }>({});

  // 入力チェック（名前と電話番号）
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name) newErrors.name = 'お名前を入力してください';

    // 090-1234-5678のような「ハイフン付き」だけOKにする
    // \d は数字、{2,4} は2〜4桁の意味
    if (!/^\d{2,4}-\d{2,4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = '電話番号をハイフン付きで入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      // 送信処理の代わりにconsoleに出している（本来はAPIに送る）
      console.log('Submitting:', formData);
      setTimeout(() => {
        navigate('/thanks');
      }, 300);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-primary">
          <span className="text-accent text-sm block mb-1">あと一歩！</span>
          該当求人を表示します
        </h2>
        <p className="text-sm text-gray-500">連絡先を入力して求人を確認</p>
      </div>

      <div className="space-y-6">
        {/* Q9: お名前 */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">お名前</label>
          <input
            type="text"
            placeholder="山田 太郎"
            className="w-full p-4 rounded-xl border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData('name', e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        {/* Q10: 電話番号 */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">電話番号</label>
          <input
            type="tel"
            placeholder="090-1234-5678"
            className="w-full p-4 rounded-xl border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
            value={formData.phone}
            onChange={(e) => setFormData('phone', e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>
      </div>

      <div className="pt-4 sticky bottom-4 z-10 pb-4">
        <Button
          variant="primary"
          size="lg"
          onClick={handleSubmit}
          className="shadow-xl bg-orange-500 hover:bg-orange-600 animate-pulse-slow"
        >
          求人を見る（無料）
        </Button>
      </div>
    </div>
  );
};
