import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import HowToSection from "./components/HowToSection";
import Result from "./components/Result";
import { analyzeNiks, analyzeOrderData } from "./lib/util";
import type { CombinedAnalysisResult, IDataArr } from "./types";

const expectedOrderSchema = {
  order_number: "string",
  id_type: "string",
  id_number: "string",
  first_name: "string",
  last_name: "string",
  phone_number: "string",
  email: "string",
  ticket_code: "string",
  ticket_name: "string",
  quantity: "number",
  gateway_trx_id: "string",
  payment_type: "string",
  sub_total_amount: "number",
  payment_fee: "number",
  platform_fee: "number",
  tax_amount: "number",
  total_amount: "number",
};

function App() {
  const [jsonData, setJsonData] = useState("");
  const [dataArr, setDataArr] = useState<IDataArr[]>([]);
  const [analysisResult, setAnalysisResult] =
    useState<CombinedAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showHowTo, setShowHowTo] = useState(false);

  const handleJsonDataChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setJsonData(event.target.value);
    setAnalysisResult(null);
    setErrorMessage("");
  };

  const clear = () => {
    setDataArr([]);
    setJsonData("");
    setAnalysisResult(null);
    setErrorMessage("");
  };

  const handleAddData = () => {
    let parsedInput: IDataArr[] | IDataArr | null = null;
    try {
      parsedInput = JSON.parse(jsonData);
    } catch (error) {
      setErrorMessage("Invalid JSON format. Please check your data.");
      console.error("JSON parsing error:", error);
      return;
    }

    let newItems: IDataArr[] = [];
    if (Array.isArray(parsedInput)) {
      newItems = parsedInput;
    } else if (typeof parsedInput === "object" && parsedInput !== null) {
      newItems = [parsedInput];
    } else {
      setErrorMessage(
        "Input must be a JSON object or an array of JSON objects."
      );
      return;
    }

    // Validate each new item before adding to dataArr
    for (const item of newItems) {
      if (!validateOrderData(item)) {
        return;
      }
    }

    setDataArr([...dataArr, ...newItems]);
    setJsonData("");
    setErrorMessage("");
    setAnalysisResult(null);
  };

  const handleAnalyzeData = () => {
    if (dataArr.length === 0) {
      setErrorMessage('Please add some data to analyze.');
      setAnalysisResult(null);
      return;
    }
    const niksToAnalyze: string[] = [];
    for (const item of dataArr) {
      // Iterate over dataArr directly
      if (
        item.id_type === "KTP" &&
        typeof item.id_number === "string" &&
        item.id_number.length >= 12
      ) {
        niksToAnalyze.push(item.id_number);
      }
    }

    // Perform NIK analysis
    const nikAnalysis = analyzeNiks(niksToAnalyze);
    const orderAnalysis = analyzeOrderData(dataArr);

    setAnalysisResult({ nikAnalysis, orderAnalysis });
    setErrorMessage("");
  };

  useEffect(() => {
    console.log('analysisResult', analysisResult)
  }, [analysisResult])

  const validateOrderData = (data: IDataArr): boolean => {
    for (const key in expectedOrderSchema) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) {
        setErrorMessage(`Missing field: '${key}' in order data.`);
        return false;
      }
      if (
        typeof data[key as keyof IDataArr] !==
        expectedOrderSchema[key as keyof typeof expectedOrderSchema]
      ) {
        setErrorMessage(
          `Invalid type for field '${key}' in order data. Expected '${
            expectedOrderSchema[key as keyof typeof expectedOrderSchema]
          }', got '${typeof data[key as keyof IDataArr]}'`
        );
        return false;
      }
    }
    return true;
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gray-900 text-gray-100 font-inter flex flex-col">
      <header className="bg-gray-800 shadow-lg p-4 md:p-6 rounded-b-xl">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-400">
            Data Analyzer
          </h1>
          <nav>
            <button
              onClick={() => setShowHowTo(!showHowTo)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
              {showHowTo ? "Hide How To" : "How To Use"}
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        {showHowTo && (
          <AnimatePresence>
            <HowToSection />
          </AnimatePresence>
        )}

        <section className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">
            Paste Your Data Here
          </h2>
          <textarea
            className="w-full h-48 p-4 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            placeholder='Paste your JSON data here, e.g., {"order_number": "FT-...", "first_name": "...", ...}'
            value={jsonData}
            onChange={handleJsonDataChange}
          ></textarea>
          {dataArr.length > 0 && (
            <div className="mt-4 p-3 bg-gray-700 text-gray-100 rounded-lg shadow-inner animate-fade-in">
              <p>current data : {dataArr.length}</p>
            </div>
          )}
          <button
            onClick={handleAddData}
            disabled={!jsonData}
            className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Data
          </button>
          <button
            onClick={handleAnalyzeData}
            disabled={dataArr.length === 0}
            className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analyze Data
          </button>

          {errorMessage && (
            <div className="mt-4 p-3 bg-red-800 text-red-100 rounded-lg shadow-inner animate-fade-in">
              <p className="font-medium">Error:</p>
              <p>{errorMessage}</p>
            </div>
          )}

          {analysisResult && (
            <Result analysisResult={analysisResult} clear={clear} />
          )}
        </section>
      </main>

      <footer className="bg-gray-800 p-4 md:p-6 rounded-t-xl mt-8">
        <div className="container mx-auto text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Data Analyzer. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
