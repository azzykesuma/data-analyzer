import type { CombinedAnalysisResult } from "../types";

const NikResult = ({ analysisResult }: { analysisResult: CombinedAnalysisResult }) => {
  const top5Ages = Object.entries(analysisResult.nikAnalysis.ageCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5)
    .sort(([ageA], [ageB]) => parseInt(ageA) - parseInt(ageB));

  return (
    <div className="mb-8">
      <h4 className="text-lg font-medium text-blue-300 mb-2">NIK Data Insights</h4>
      <div className="mb-6">
        <h5 className="text-md font-medium text-gray-300 mb-2">Gender Distribution</h5>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-400">Male:</p>
            <p className="text-xl font-bold text-blue-400">{analysisResult.nikAnalysis.genderCounts.male}</p>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-400">Female:</p>
            <p className="text-xl font-bold text-pink-400">{analysisResult.nikAnalysis.genderCounts.female}</p>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-400">Unknown:</p>
            <p className="text-xl font-bold text-gray-400">{analysisResult.nikAnalysis.genderCounts.unknown}</p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h5 className="text-md font-medium text-gray-300 mb-2">Top 5 Age Distribution</h5>
        <div className="max-h-60 overflow-y-auto pr-2">
          {top5Ages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {top5Ages.map(([age, count]) => (
                <div key={age} className="p-2 bg-gray-800 rounded-lg shadow-md text-center">
                  <p className="text-gray-400 text-sm">Age {age}:</p>
                  <p className="text-lg font-bold text-yellow-400">{count}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No age data available for analysis.</p>
          )}
        </div>
      </div>
      <div>
        <h4 className="text-lg font-medium text-blue-300 mb-2">Province Distribution</h4>
        <div className="max-h-60 overflow-y-auto pr-2">
          {Object.keys(analysisResult.nikAnalysis.provinceCounts).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(analysisResult.nikAnalysis.provinceCounts)
                .sort(([, countA], [, countB]) => countB - countA)
                .map(([province, count]) => (
                  <div key={province} className="p-2 bg-gray-800 rounded-lg shadow-md">
                    <p className="text-gray-400 text-sm">{province}:</p>
                    <p className="text-lg font-bold text-purple-400">{count}</p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-400">No province data available for analysis.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NikResult;

