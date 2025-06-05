import { useState } from "react";
import type { CombinedAnalysisResult } from "../types";
import NikResult from "./NikResult";
import OrderDataResult from "./OrderDataResult";
import { Progress } from "./ui/progress";
import { AnimatePresence } from "motion/react";

interface IResultProps {
  analysisResult: CombinedAnalysisResult;
  clear: () => void;
}

const Result = ({ analysisResult, clear }: IResultProps) => {
  const [displayProgress, setDisplayProgress] = useState(false);
  const sumOfAllTicketPurcase = Object.values(
    analysisResult.orderAnalysis.purchaserTicketCounts
  ).reduce((total, count) => total + count, 0);
  return (
    <div className="mt-6 p-6 bg-gray-700 rounded-xl shadow-lg animate-fade-in">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-green-300 mb-4">
          Analysis Results
        </h3>
      </div>

      <NikResult analysisResult={analysisResult} />
      <OrderDataResult
        analysisResult={analysisResult}
        sum={sumOfAllTicketPurcase}
      />

      <AnimatePresence>
        {displayProgress && (
          <Progress progress={sumOfAllTicketPurcase} />
        )}
      </AnimatePresence>

      <div className="mt-6 text-center flex gap-2 justify-center">
        <button
          onClick={clear}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
        >
          Clear All Data
        </button>
        <button
          onClick={() => setDisplayProgress(!displayProgress)}
          className="px-6 py-3 bg-destructive text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
        >
          I want to be depressed
        </button>
      </div>
    </div>
  );
};

export default Result;
