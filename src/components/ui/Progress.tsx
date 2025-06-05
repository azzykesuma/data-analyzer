import {motion as m} from "motion/react";

const TARGET_PROGRESS = 35000;

export const Progress = ({ progress }: { progress: number }) => {
  return (
    <m.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 , scale: 0.8 }}
    className="w-full max-w-2xl p-6 rounded-xl shadow-lg my-6">
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div
          id="progressBarFill"
          className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(progress / TARGET_PROGRESS) * 100}%` }}
        ></div>
      </div>

      <div className="flex justify-between text-gray-700 text-sm font-medium mb-2">
        <span className="text-white">Ticket Purchase:</span>
        <span className="text-white" id="progressPercentage">{(progress / TARGET_PROGRESS) * 100}%</span>
      </div>

      <p>Target Purchase: {new Intl.NumberFormat("id-ID").format(TARGET_PROGRESS)} Tickets</p>
    </m.div>
  );
};
