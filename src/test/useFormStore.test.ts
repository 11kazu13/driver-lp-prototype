/**
 * ===================================================================
 * useFormStore.test.ts
 * ===================================================================
 * 
 * 【このテストファイルの役割】
 * Zustandで作成した状態管理ストア（useFormStore）が正しく動作するかをテスト。
 * ユニットテストなのでUIは関係なく、ロジックのみを検証。
 * 
 * 【学習ポイント】
 * - describe: テストをグループ化
 * - it/test: 個別のテストケース
 * - expect: 期待する結果をアサート
 * - beforeEach: 各テスト前に実行される処理
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useFormStore } from '../hooks/useFormStore';

describe('useFormStore', () => {
  // -------------------------------------------------------------------
  // 各テストの前にストアをリセット
  // -------------------------------------------------------------------
  beforeEach(() => {
    // Zustandストアの状態をリセット
    const store = useFormStore.getState();
    store.setFormData('licenses', []);
    store.setFormData('seekingStatus', '');
    store.setFormData('workStyle', '');
    store.setFormData('conditions', []);
    store.setFormData('zipCode', '');
    store.setFormData('birthYear', '');
    store.setFormData('name', '');
    store.setFormData('phone', '');
    store.setJobCount(5482);
  });

  // -------------------------------------------------------------------
  // 初期値のテスト
  // -------------------------------------------------------------------
  describe('初期状態', () => {
    it('初期の求人数は5482件であること', () => {
      const { jobCount } = useFormStore.getState();
      expect(jobCount).toBe(5482);
    });

    it('初期のフォームデータは空であること', () => {
      const { formData } = useFormStore.getState();
      expect(formData.licenses).toEqual([]);
      expect(formData.seekingStatus).toBe('');
      expect(formData.workStyle).toBe('');
    });
  });

  // -------------------------------------------------------------------
  // setFormData のテスト
  // -------------------------------------------------------------------
  describe('setFormData', () => {
    it('免許を追加できること', () => {
      const store = useFormStore.getState();
      store.setFormData('licenses', ['普通自動車免許', '大型免許']);

      const { formData } = useFormStore.getState();
      expect(formData.licenses).toContain('普通自動車免許');
      expect(formData.licenses).toContain('大型免許');
      expect(formData.licenses).toHaveLength(2);
    });

    it('求職状況を設定できること', () => {
      const store = useFormStore.getState();
      store.setFormData('seekingStatus', 'active');

      const { formData } = useFormStore.getState();
      expect(formData.seekingStatus).toBe('active');
    });

    it('こだわり条件を追加・削除できること', () => {
      const store = useFormStore.getState();

      // 追加
      store.setFormData('conditions', ['日払い・前払いOK', '寮・社宅あり']);
      expect(useFormStore.getState().formData.conditions).toHaveLength(2);

      // 削除（新しい配列で上書き）
      store.setFormData('conditions', ['日払い・前払いOK']);
      expect(useFormStore.getState().formData.conditions).toHaveLength(1);
    });

    it('郵便番号を設定できること', () => {
      const store = useFormStore.getState();
      store.setFormData('zipCode', '1600023');

      const { formData } = useFormStore.getState();
      expect(formData.zipCode).toBe('1600023');
    });
  });

  // -------------------------------------------------------------------
  // setJobCount のテスト
  // -------------------------------------------------------------------
  describe('setJobCount', () => {
    it('求人数を更新できること', () => {
      const store = useFormStore.getState();
      store.setJobCount(3500);

      const { jobCount } = useFormStore.getState();
      expect(jobCount).toBe(3500);
    });

    it('求人数をnullに設定できること（???表示用）', () => {
      const store = useFormStore.getState();
      store.setJobCount(null);

      const { jobCount } = useFormStore.getState();
      expect(jobCount).toBeNull();
    });
  });
});
