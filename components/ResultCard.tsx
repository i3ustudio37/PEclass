import React from 'react';
import { StudentRecord } from '../types';
import { Trophy, Activity, AlertCircle, Calculator, Footprints, CalendarX } from 'lucide-react';

interface ResultCardProps {
  student: StudentRecord;
}

export const ResultCard: React.FC<ResultCardProps> = ({ student }) => {
  const isAbsent = parseInt(student['缺席'] || '0') > 0;
  const totalScore = parseFloat(student['總分'] || '0');
  const isPassing = totalScore >= 60;

  // Logic for failing students (< 60)
  const pointsNeeded = 60 - totalScore;
  const stepsNeeded = pointsNeeded * 3000;

  // Logic for passing students (>= 60)
  // 1 absence = -4 points
  const scoreBuffer = totalScore - 60;
  const absencesAllowed = Math.floor(scoreBuffer / 4);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-fade-in-up">
      {/* Combined Info & Stats Block */}
      <div className="p-5 flex items-stretch gap-4 border-b border-gray-100">
        {/* Left Side: Student Info */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight mb-1 truncate">
            {student['姓名']}
          </h2>
          <p className="text-base font-bold text-gray-900 mb-2 truncate">
            {student['學生系所年級']}
          </p>
          <div className="inline-flex">
             <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
               {student['學號']}
             </span>
          </div>
        </div>

        {/* Right Side: Stats Stack */}
        <div className="w-32 flex flex-col gap-2 shrink-0">
          {/* Total Score */}
          <div className="bg-gray-50 rounded-lg p-2 flex flex-col items-center justify-center relative h-20 border border-gray-200">
            <div className="text-[10px] text-gray-500 font-bold absolute top-1 left-2">總分</div>
            <div className="text-3xl font-black text-gray-900 leading-none mt-3">{student['總分'] || '0'}</div>
            <div className="text-[9px] text-gray-500 mt-0.5 scale-90 whitespace-nowrap">70-缺席*4+加分</div>
          </div>
          
          {/* Absence */}
          <div className={`rounded-lg p-2 flex flex-col items-center justify-center relative h-20 border ${
            isAbsent ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className={`text-[10px] font-bold absolute top-1 left-2 ${
              isAbsent ? 'text-red-500' : 'text-gray-400'
            }`}>缺席節數</div>
            <div className={`text-3xl font-bold leading-none mt-3 ${
              isAbsent ? 'text-red-600' : 'text-gray-300'
            }`}>
              {student['缺席'] || '0'}
            </div>
            <div className={`text-[9px] mt-0.5 scale-90 whitespace-nowrap ${
              isAbsent ? 'text-red-400' : 'text-gray-400'
            }`}>缺一節課扣4分</div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6">
        {/* Analysis Section */}
        <div className="mb-6">
          {!isPassing ? (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2 text-orange-700 font-bold">
                <Calculator size={18} />
                <h3>補救計算</h3>
              </div>
              <p className="text-sm text-orange-800 mb-3">
                目前距離及格還差 <span className="font-bold text-lg">{pointsNeeded.toFixed(1)}</span> 分
              </p>
              <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-full shrink-0">
                  <Footprints size={20} />
                </div>
                <div>
                  <p className="text-xs text-orange-600 font-semibold uppercase tracking-wider">建議補救方式</p>
                  <p className="text-orange-900 font-medium leading-snug mt-1">
                    需要跑步 <span className="font-bold text-lg">{stepsNeeded.toLocaleString()}</span> 步<br/>
                    <span className="text-xs opacity-75">(以 3000 步換算 1 分計算)</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2 text-teal-700 font-bold">
                <Calculator size={18} />
                <h3>及格分析</h3>
              </div>
              <p className="text-sm text-teal-800 mb-3">
                目前已超過及格線 <span className="font-bold text-lg">{scoreBuffer.toFixed(1)}</span> 分
              </p>
              <div className="bg-white/60 rounded-lg p-3 flex items-start gap-3">
                <div className="p-2 bg-teal-100 text-teal-600 rounded-full shrink-0">
                  <CalendarX size={20} />
                </div>
                <div>
                  <p className="text-xs text-teal-600 font-semibold uppercase tracking-wider">缺席額度試算</p>
                  <p className="text-teal-900 font-medium leading-snug mt-1">
                    在不影響及格的情況下，還能缺席 <span className="font-bold text-lg">{absencesAllowed}</span> 節課<br/>
                    <span className="text-xs opacity-75">(每節缺席扣 4 分)</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">加分成績項目</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                <Activity size={18} />
              </div>
              <span className="font-bold text-secondary">平時表現</span>
            </div>
            <span className="font-bold text-primary text-lg">{student['平時分'] || '0'}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
             <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                <Trophy size={18} />
              </div>
              <span className="font-bold text-secondary">球類測驗</span>
            </div>
            <span className="font-bold text-primary text-lg">{student['球類'] || '0'}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
             <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                <Activity size={18} />
              </div>
              <span className="font-bold text-secondary">游泳測驗</span>
            </div>
            <span className="font-bold text-primary text-lg">{student['游泳'] || '0'}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
             <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                <Activity size={18} />
              </div>
              <span className="font-bold text-secondary">跑步加分</span>
            </div>
            <span className="font-bold text-primary text-lg">{student['跑步'] || '0'}</span>
          </div>
        </div>

        {isAbsent && (
          <div className="mt-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start gap-2 border border-red-100">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>請注意您的缺席紀錄，過多的缺席可能會影響您的期末總成績。</span>
          </div>
        )}
      </div>
    </div>
  );
};
