import type { INikAnalysisResult } from "../types";


interface IResultProps {
    analysisResult: INikAnalysisResult
    clear : () => void
}

const Result = ({ analysisResult, clear }: IResultProps) => {
  // Get top 5 ages by count, then sort them numerically for display
  const top5Ages: [string, number][] = Object.entries(analysisResult.ageCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 5) // Take top 5
    .sort(([ageA], [ageB]) => parseInt(ageA, 10) - parseInt(ageB, 10));

  return (
    <div className="mt-6 p-6 bg-gray-700 rounded-xl shadow-lg animate-fade-in">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-xl font-semibold text-green-300 mb-4">
          NIK Analysis Results
        </h3>
        <button
          onClick={clear}
          className="bg-gray-600 hover:bg-red-500 transition duration-300 text-white font-bold py-2 px-4 rounded-full"
        >
          Clear result
        </button>
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-medium text-blue-300 mb-2">
          Gender Distribution
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-400">Male:</p>
            <p className="text-xl font-bold text-blue-400">
              {analysisResult.genderCounts.male}
            </p>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-400">Female:</p>
            <p className="text-xl font-bold text-pink-400">
              {analysisResult.genderCounts.female}
            </p>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-400">Unknown:</p>
            <p className="text-xl font-bold text-gray-400">
              {analysisResult.genderCounts.unknown}
            </p>
          </div>
        </div>
      </div>

      {/* Age Counts - Now displays only top 5 */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-blue-300 mb-2">
          Top 5 Age Distribution
        </h4>
        <div className="max-h-60 overflow-y-auto pr-2">
          {top5Ages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {top5Ages.map(([age, count]) => (
                <div
                  key={age}
                  className="p-2 bg-gray-800 rounded-lg shadow-md text-center"
                >
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
        <h4 className="text-lg font-medium text-blue-300 mb-2">
          Province Distribution
        </h4>
        <div className="max-h-60 overflow-y-auto pr-2">
          {Object.keys(analysisResult.provinceCounts).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(analysisResult.provinceCounts)
                .sort(([, countA], [, countB]) => countB - countA)
                .map(([province, count]) => (
                  <div
                    key={province}
                    className="p-2 bg-gray-800 rounded-lg shadow-md"
                  >
                    <p className="text-gray-400 text-sm">{province}:</p>
                    <p className="text-lg font-bold text-purple-400">{count}</p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-400">
              No province data available for analysis.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};


export default Result;
