import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { SearchBar } from './components/SearchBar';
import { ResultCard } from './components/ResultCard';
import { CSV_DATA } from './constants';
import { StudentRecord, ParseResult } from './types';
import { GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<StudentRecord[]>([]);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState<StudentRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Parse CSV data from URL on component mount
    Papa.parse(CSV_DATA, {
      download: true, // Enable fetching from URL
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult) => {
        // Filter out bad rows (e.g., repeated headers or empty ID rows)
        const cleanData = results.data.filter(row => {
            return row['學號'] && row['學號'] !== '學號' && row['姓名'];
        });
        setData(cleanData);
        setLoading(false);
      },
      error: (err: any) => {
        console.error('CSV Parsing Error:', err);
        setError('無法讀取成績資料，請稍後再試。若問題持續發生，請確認 Google 試算表已正確發布。');
        setLoading(false);
      }
    });
  }, []);

  const handleSearch = () => {
    if (!searchId.trim()) return;
    
    setHasSearched(true);
    // Case-insensitive search, trim whitespace
    const result = data.find(
      (student) => student['學號']?.trim().toUpperCase() === searchId.trim().toUpperCase()
    );
    setSearchResult(result || null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-center gap-2">
          <GraduationCap className="text-primary" size={28} />
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">體育成績查詢系統</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 w-full max-w-md mx-auto flex flex-col items-center">
        
        {loading ? (
           <div className="flex flex-col items-center justify-center py-20 text-gray-500">
             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
             <p>成績資料同步中...</p>
           </div>
        ) : error ? (
           <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100 text-red-600">
             <p>{error}</p>
           </div>
        ) : (
          <>
            <div className="w-full mb-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">歡迎使用</h2>
                <p className="text-center text-gray-500 mb-8">輸入學號即可快速查看本學期體育成績</p>
                <SearchBar 
                  value={searchId} 
                  onChange={setSearchId} 
                  onSearch={handleSearch} 
                />
            </div>

            <div className="w-full transition-all duration-300 ease-in-out">
              {hasSearched && !searchResult && (
                <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 animate-fade-in-up">
                  <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                     <span className="text-3xl">🤔</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">查無資料</h3>
                  <p className="text-gray-500">
                    找不到學號 <span className="font-mono font-bold text-gray-700">{searchId}</span> 的資料。<br/>
                    請確認學號是否正確，或聯繫授課老師。
                  </p>
                </div>
              )}

              {hasSearched && searchResult && (
                <ResultCard student={searchResult} />
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-400 bg-white border-t mt-auto">
        <p>© 114-1 體育成績查詢系統</p>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
