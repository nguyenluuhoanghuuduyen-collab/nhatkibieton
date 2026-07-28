import React, { useState } from 'react';
import { MoodType, JournalEntry, UserProfile } from '../types';
import { MoodSelector } from './MoodSelector';
import { STEP_PROMPT_SUGGESTIONS } from '../data/neuroscienceInfo';
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Compass,
  Plus,
  Trash2,
  Send,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Bot
} from 'lucide-react';

interface JournalWizardProps {
  profile: UserProfile;
  onSaveEntry: (entry: JournalEntry) => void;
  onRequestAIReflection?: (entryData: Partial<JournalEntry>) => void;
}

export const JournalWizard: React.FC<JournalWizardProps> = ({
  profile,
  onSaveEntry,
  onRequestAIReflection
}) => {
  const [mood, setMood] = useState<MoodType>('joy');
  const [moodNote, setMoodNote] = useState('');

  // Step 1: Small Wins (Dopamine) - at least 3
  const [smallWin1, setSmallWin1] = useState('');
  const [smallWin2, setSmallWin2] = useState('');
  const [smallWin3, setSmallWin3] = useState('');
  const [additionalWins, setAdditionalWins] = useState<string[]>([]);

  // Step 2: Gratitude (Oxytocin)
  const [gratitudeTarget, setGratitudeTarget] = useState('');
  const [gratitudeReason, setGratitudeReason] = useState('');

  // Step 3: Self Esteem (Resilience)
  const [selfEsteem, setSelfEsteem] = useState('');

  // Step 4: Future Self (Optimism)
  const [futureSelfMessage, setFutureSelfMessage] = useState('');

  // Step 5: Private Notes
  const [privateNotes, setPrivateNotes] = useState('');

  // UI state
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showPromptChips, setShowPromptChips] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick insertion helpers
  const handleInsertSmallWinPrompt = (promptText: string) => {
    if (!smallWin1) setSmallWin1(promptText);
    else if (!smallWin2) setSmallWin2(promptText);
    else if (!smallWin3) setSmallWin3(promptText);
    else setAdditionalWins([...additionalWins, promptText]);
  };

  const handleAddExtraWin = () => {
    setAdditionalWins([...additionalWins, '']);
  };

  const handleUpdateExtraWin = (index: number, val: string) => {
    const next = [...additionalWins];
    next[index] = val;
    setAdditionalWins(next);
  };

  const handleRemoveExtraWin = (index: number) => {
    setAdditionalWins(additionalWins.filter((_, i) => i !== index));
  };

  const isStepValid = (step: number) => {
    if (step === 0) return true; // Mood selector
    if (step === 1) return smallWin1.trim() !== '' && smallWin2.trim() !== '' && smallWin3.trim() !== '';
    if (step === 2) return gratitudeTarget.trim() !== '' && gratitudeReason.trim() !== '';
    if (step === 3) return selfEsteem.trim() !== '';
    if (step === 4) return futureSelfMessage.trim() !== '';
    return true;
  };

  const handleSubmit = async (withAI: boolean = false) => {
    setIsSubmitting(true);

    const allWins = [
      smallWin1.trim(),
      smallWin2.trim(),
      smallWin3.trim(),
      ...additionalWins.map(w => w.trim()).filter(w => w !== '')
    ].filter(w => w !== '');

    const now = new Date();
    const dateFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    const newEntry: JournalEntry = {
      id: `entry-${Date.now()}`,
      createdAt: now.toISOString(),
      dateFormatted,
      mood,
      moodNote: moodNote.trim() || undefined,
      smallWins: allWins.length >= 3 ? allWins : [...allWins, 'Hoàn thành ghi chép nhật ký biết ơn ngày hôm nay'],
      gratitude: {
        target: gratitudeTarget.trim() || 'Một người bạn/người thân xung quanh',
        reason: gratitudeReason.trim() || 'đã mang lại năng lượng tích cực cho mình.'
      },
      selfEsteem: selfEsteem.trim() || 'Hôm nay mình đã kiên trì rèn luyện sức khỏe tinh thần.',
      futureSelfMessage: futureSelfMessage.trim() || 'Cố gắng lên nhé! Bạn đang làm rất tốt.',
      privateNotes: privateNotes.trim() || undefined,
      tags: ['Nhật ký biết ơn', `Tuần ${profile.currentWeek}`]
    };

    onSaveEntry(newEntry);

    if (withAI && onRequestAIReflection) {
      onRequestAIReflection(newEntry);
    }

    // Reset fields after successful submit
    setMood('joy');
    setMoodNote('');
    setSmallWin1('');
    setSmallWin2('');
    setSmallWin3('');
    setAdditionalWins([]);
    setGratitudeTarget('');
    setGratitudeReason('');
    setSelfEsteem('');
    setFutureSelfMessage('');
    setPrivateNotes('');
    setCurrentStep(0);

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
          <span>Quy trình Thực hành Chuyên sâu 5 Bước</span>
          <span className="text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            Bước {currentStep + 1} / 6
          </span>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-6 gap-1.5 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          {[0, 1, 2, 3, 4, 5].map((stepIdx) => (
            <button
              key={stepIdx}
              onClick={() => setCurrentStep(stepIdx)}
              className={`h-full rounded-full transition-all ${
                currentStep === stepIdx
                  ? 'bg-teal-600'
                  : currentStep > stepIdx
                  ? 'bg-emerald-400'
                  : 'bg-slate-200 hover:bg-slate-300'
              }`}
              title={`Bước ${stepIdx + 1}`}
            />
          ))}
        </div>

        {/* Step Titles */}
        <div className="flex justify-between items-center text-[10px] sm:text-xs font-medium text-slate-500 mt-2">
          <span className={currentStep === 0 ? 'text-teal-700 font-bold' : ''}>0. Mood</span>
          <span className={currentStep === 1 ? 'text-teal-700 font-bold' : ''}>1. Dopamine</span>
          <span className={currentStep === 2 ? 'text-teal-700 font-bold' : ''}>2. Oxytocin</span>
          <span className={currentStep === 3 ? 'text-teal-700 font-bold' : ''}>3. Resilience</span>
          <span className={currentStep === 4 ? 'text-teal-700 font-bold' : ''}>4. Optimism</span>
          <span className={currentStep === 5 ? 'text-teal-700 font-bold' : ''}>5. Private</span>
        </div>
      </div>

      {/* STEP 0: MOOD SELECTOR */}
      {currentStep === 0 && (
        <div className="space-y-4">
          <MoodSelector
            selectedMood={mood}
            onSelectMood={setMood}
            moodNote={moodNote}
            onMoodNoteChange={setMoodNote}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <span>Tiếp tục (Bước 1: Dopamine)</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 1: DOPAMINE - 3 SMALL WINS */}
      {currentStep === 1 && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                  <Sparkles className="w-4 h-4 fill-amber-500 text-amber-600" />
                </div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Bước 1: Giải phóng Dopamine (Small Wins)
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-800 mt-1">
                Ghi nhận ít nhất 3 niềm vui / chiến thắng nhỏ hôm nay
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Khoa học thần kinh: Tập cho bộ não quét và tìm kiếm những tín hiệu tích cực thường ngày.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowPromptChips(!showPromptChips)}
              className="text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-100 transition-colors flex items-center gap-1 shrink-0"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Gợi ý mẫu</span>
            </button>
          </div>

          {/* Prompt Chips */}
          {showPromptChips && (
            <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 space-y-2">
              <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> Chạm vào một gợi ý bên dưới để thêm nhanh:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {STEP_PROMPT_SUGGESTIONS.smallWins.map((promptText, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleInsertSmallWinPrompt(promptText)}
                    className="text-xs bg-white text-slate-700 hover:text-amber-900 hover:bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-200/80 transition-all text-left"
                  >
                    + {promptText}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Fields */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                1. Niềm vui nhỏ số 1 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={smallWin1}
                onChange={(e) => setSmallWin1(e.target.value)}
                placeholder="Ví dụ: Ăn bữa sáng đúng giờ và ngon miệng..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                2. Niềm vui nhỏ số 2 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={smallWin2}
                onChange={(e) => setSmallWin2(e.target.value)}
                placeholder="Ví dụ: Giải xong bài toán hình học hái não..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                3. Niềm vui nhỏ số 3 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={smallWin3}
                onChange={(e) => setSmallWin3(e.target.value)}
                placeholder="Ví dụ: Bạn cùng bàn cười vui vẻ khi mình chia sẻ bánh..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50/50"
              />
            </div>

            {/* Additional Wins */}
            {additionalWins.map((winVal, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={winVal}
                  onChange={(e) => handleUpdateExtraWin(idx, e.target.value)}
                  placeholder={`Niềm vui thêm ${idx + 4}...`}
                  className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExtraWin(idx)}
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddExtraWin}
              className="text-xs font-semibold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1.5 pt-1"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm niềm vui thứ {additionalWins.length + 4}</span>
            </button>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(0)}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-4 py-2"
            >
              ← Quay lại
            </button>
            <button
              type="button"
              disabled={!isStepValid(1)}
              onClick={() => setCurrentStep(2)}
              className={`text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 ${
                isStepValid(1)
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Tiếp tục (Bước 2: Oxytocin)</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: OXYTOCIN - SOCIAL GRATITUDE */}
      {currentStep === 2 && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-100 text-sky-800">
                  <Heart className="w-4 h-4 fill-sky-500 text-sky-600" />
                </div>
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
                  Bước 2: Kích hoạt Oxytocin (Social Connection)
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-800 mt-1">
                Tri ân một đối tượng cụ thể + Lý do cụ thể
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Khoa học thần kinh: Hormone oxytocin gia tăng sự kết nối xã hội, giảm nỗi sợ cô lập.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hôm nay bạn muốn tri ân Ai hoặc Điều gì? <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {STEP_PROMPT_SUGGESTIONS.gratitudeTargets.map((tgt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setGratitudeTarget(tgt)}
                    className="text-xs bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 px-2.5 py-1 rounded-lg"
                  >
                    + {tgt}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={gratitudeTarget}
                onChange={(e) => setGratitudeTarget(e.target.value)}
                placeholder="Ví dụ: Mẹ, Thầy giáo chủ nhiệm, Bạn Minh, hoặc Chú bảo vệ..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lý do cụ thể vì sao bạn trân trọng điều đó ngày hôm nay? <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-1 mb-2">
                {STEP_PROMPT_SUGGESTIONS.gratitudeReasons.slice(0, 3).map((rs, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setGratitudeReason(rs)}
                    className="text-xs text-left block w-full bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-900 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    + ...{rs}
                  </button>
                ))}
              </div>
              <textarea
                rows={3}
                value={gratitudeReason}
                onChange={(e) => setGratitudeReason(e.target.value)}
                placeholder="Ví dụ: Vì đã kiên nhẫn giảng lại đoạn công thức khó hiểu cho mình mà không hề tỏ ra gắt gỏng..."
                className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 bg-slate-50/50"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-4 py-2"
            >
              ← Quay lại
            </button>
            <button
              type="button"
              disabled={!isStepValid(2)}
              onClick={() => setCurrentStep(3)}
              className={`text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 ${
                isStepValid(2)
                  ? 'bg-sky-600 hover:bg-sky-700 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Tiếp tục (Bước 3: Resilience)</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SELF-ESTEEM / RESILIENCE */}
      {currentStep === 3 && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Bước 3: Công nhận Bản thân (Resilience Building)
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-800 mt-1">
                Công nhận 1 điểm mạnh hoặc thành tựu nỗ lực của chính bạn
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Khoa học thần kinh: Giảm bớt thói quen tự phán xét và làm dịu phản ứng căng thẳng tại vỏ não trán trước.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {STEP_PROMPT_SUGGESTIONS.selfEsteemPrompts.map((st, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelfEsteem(st)}
                  className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 px-2.5 py-1.5 rounded-lg text-left"
                >
                  + {st}
                </button>
              ))}
            </div>
            <textarea
              rows={3}
              value={selfEsteem}
              onChange={(e) => setSelfEsteem(e.target.value)}
              placeholder="Hôm nay bạn đã dũng cảm, kiên nhẫn hay nỗ lực ở điểm nào? Hãy tự hào về điều đó..."
              className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-4 py-2"
            >
              ← Quay lại
            </button>
            <button
              type="button"
              disabled={!isStepValid(3)}
              onClick={() => setCurrentStep(4)}
              className={`text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 ${
                isStepValid(3)
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Tiếp tục (Bước 4: Optimism)</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: OPTIMISM - FUTURE SELF */}
      {currentStep === 4 && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800">
                  <Compass className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                  Bước 4: Thông điệp gửi Tương lai (Future Self Continuity)
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-800 mt-1">
                Gửi một lời khích lệ hoặc kỳ vọng ấm áp cho bản thân ngày mai
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Khoa học thần kinh: Tăng cường tính liên tục tâm trí (Future Self), củng cố động lực sống tích cực.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1 mb-2">
              {STEP_PROMPT_SUGGESTIONS.futureSelfPrompts.map((fs, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFutureSelfMessage(fs)}
                  className="text-xs text-left block w-full bg-indigo-50/60 hover:bg-indigo-100 text-indigo-900 border border-indigo-200/80 px-3 py-1.5 rounded-lg transition-colors"
                >
                  + {fs}
                </button>
              ))}
            </div>
            <textarea
              rows={3}
              value={futureSelfMessage}
              onChange={(e) => setFutureSelfMessage(e.target.value)}
              placeholder="Bạn muốn nhắn nhủ điều gì cho chính mình ngày mai hay tuần tới..."
              className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-4 py-2"
            >
              ← Quay lại
            </button>
            <button
              type="button"
              disabled={!isStepValid(4)}
              onClick={() => setCurrentStep(5)}
              className={`text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 ${
                isStepValid(4)
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Tiếp tục (Bước 5: Nhật ký riêng tư)</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: PRIVATE DIARY NOTES (Nhật ký riêng tư) */}
      {currentStep === 5 && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-pink-100 text-pink-800">
                  <Heart className="w-4 h-4 text-pink-600 fill-pink-500" />
                </div>
                <span className="text-xs font-bold text-pink-800 uppercase tracking-wider">
                  Bước 5: Nhật ký riêng tư (Viết tự do)
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-800 mt-1">
                Tâm sự tự do & Trải lòng cá nhân
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Nơi bạn có thể tự do viết bất cứ điều gì thầm kín mà không lo bị phán xét.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-pink-50/70 p-3.5 rounded-xl border border-pink-200/80 text-xs text-pink-950 leading-relaxed flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-pink-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Cam kết Bảo mật Tuyệt đối:</span> Nội dung trong phần viết tự do này sẽ **CHỈ được lưu cục bộ trên thiết bị của bạn**. Ứng dụng sẽ tự động loại bỏ nội dung này trước khi gửi dữ liệu lên AI của Google để phân tích phản hồi, đảm bảo các bí mật cá nhân của học sinh không bao giờ bị truyền tải lên mạng.
              </div>
            </div>

            <textarea
              rows={5}
              value={privateNotes}
              onChange={(e) => setPrivateNotes(e.target.value)}
              placeholder="Hôm nay của bạn thế nào? Có tâm sự hay bí mật gì muốn viết ra không? Viết tự do tại đây nhé..."
              className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 bg-slate-50/50"
            />
          </div>

          {/* Submission Options */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-4 py-2 self-start sm:self-auto"
            >
              ← Quay lại Bước 4
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSubmit(false)}
                className="w-full sm:w-auto text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-5 py-2.5 rounded-xl transition-all inline-flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Lưu nhật ký đơn thuần</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleSubmit(true)}
                className="w-full sm:w-auto text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 px-6 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all inline-flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span>Lưu & Nhận Phản hồi AI Coach</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
