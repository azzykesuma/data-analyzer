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
        <button
          onClick={clear}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Clear Data
        </button>
      </div>

      <NikResult analysisResult={analysisResult} />
      <OrderDataResult analysisResult={analysisResult} />
    </div>
  );
};

export default Result;
