import { motion as m } from "motion/react";

const HowToSection = () => {
  return (
    <m.section
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 , scale: 0.8 }}
      transition={{ duration: 0.5,  }}
      className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 w-full max-w-2xl"
    >
      <h2 className="text-2xl font-semibold text-blue-300 mb-4">How To Use</h2>
      <ol className="list-decimal text-left list-inside text-gray-300 space-y-2">
        <li className="text-start">
          Go to{" "}
          <a
            href="https://cms.flotix.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            CMS Flotix
          </a>{" "}
          and grab the order data.
        </li>
        <li>Paste the JSON data into the text area below.</li>
        <li>
          Click the "Analyze Data" button to validate and view the analysis.
        </li>
      </ol>
    </m.section>
  );
};

export default HowToSection;
