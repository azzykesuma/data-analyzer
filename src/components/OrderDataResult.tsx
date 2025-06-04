import type { CombinedAnalysisResult } from "../types";

const OrderDataResult = ({
  analysisResult,
}: {
  analysisResult: CombinedAnalysisResult;
}) => {
  const sortedTicketPopularity = Object.entries(
    analysisResult.orderAnalysis.ticketPopularity
  ).sort(([, countA], [, countB]) => countB - countA);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      <h4 className="text-lg font-medium text-blue-300 mb-2">
        Order Data Insights
      </h4>

      {/* Payment Type Analysis */}
      <div className="mb-6">
        <h5 className="text-md font-medium text-gray-300 mb-2">
          Payment Type Distribution
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(analysisResult.orderAnalysis.paymentTypeCounts).length >
          0 ? (
            Object.entries(analysisResult.orderAnalysis.paymentTypeCounts)
              .sort(([, countA], [, countB]) => countB - countA) // Sort by count descending
              .map(([type, count]) => (
                <div
                  key={type}
                  className="p-3 bg-gray-800 rounded-lg shadow-md"
                >
                  <p className="text-gray-400">
                    {type
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                    :
                  </p>
                  <p className="text-xl font-bold text-green-400">{count}</p>
                </div>
              ))
          ) : (
            <p className="text-gray-400">No payment type data available.</p>
          )}
        </div>
      </div>

      {/* Ticket Popularity */}
      <div className="mb-6">
        <h5 className="text-md font-medium text-gray-300 mb-2">
          Ticket Popularity (Total Quantity)
        </h5>
        <div className="max-h-60 overflow-y-auto pr-2">
          {sortedTicketPopularity.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sortedTicketPopularity.map(([ticketName, quantity]) => (
                <div
                  key={ticketName}
                  className="p-2 bg-gray-800 rounded-lg shadow-md"
                >
                  <p className="text-gray-400 text-sm">{ticketName}:</p>
                  <p className="text-lg font-bold text-indigo-400">
                    {quantity} tickets
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No ticket data available.</p>
          )}
        </div>
      </div>

      {/* Financial Summary */}
      <div>
        <h5 className="text-md font-medium text-gray-300 mb-2">
          Financial Summary
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-400">Total Sub-Total:</p>
            <p className="text-xl font-bold text-yellow-400">
              {formatCurrency(
                analysisResult.orderAnalysis.financialSummary.totalSubAmount
              )}
            </p>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-400">Total Payment Fee:</p>
            <p className="text-xl font-bold text-red-400">
              {formatCurrency(
                analysisResult.orderAnalysis.financialSummary.totalPaymentFee
              )}
            </p>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-400">Total Platform Fee:</p>
            <p className="text-xl font-bold text-red-400">
              {formatCurrency(
                analysisResult.orderAnalysis.financialSummary.totalPlatformFee
              )}
            </p>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-400">Total Tax Amount:</p>
            <p className="text-xl font-bold text-orange-400">
              {formatCurrency(
                analysisResult.orderAnalysis.financialSummary.totalTaxAmount
              )}
            </p>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-400">Total Overall Amount:</p>
            <p className="text-xl font-bold text-green-400">
              {formatCurrency(
                analysisResult.orderAnalysis.financialSummary.totalOverallAmount
              )}
            </p>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-400">Average Order Value:</p>
            <p className="text-xl font-bold text-blue-400">
              {formatCurrency(
                analysisResult.orderAnalysis.financialSummary.averageOrderValue
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDataResult;
