import type { CombinedAnalysisResult } from "../types";
import NikResult from "./NikResult";
import OrderDataResult from "./OrderDataResult";

interface IResultProps {
  analysisResult: CombinedAnalysisResult;
  clear: () => void;
}

const Result = ({ analysisResult, clear }: IResultProps) => {
  return (
    <div className="mt-6 p-6 bg-gray-700 rounded-xl shadow-lg animate-fade-in">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-green-300 mb-4">
          Analysis Results
        </h3>
      </div>

      <NikResult analysisResult={analysisResult} />
      <OrderDataResult analysisResult={analysisResult} />

      <div className="mt-6 text-center">
        <button
          onClick={clear}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
        >
          Clear All Data
        </button>
      </div>
    </div>
  );
};

export default Result;
