import http from "../common/http-common";

const getTransactionPerHourChart = () => {
  return http.get("/reporting/transactionsperhour");
};
const getTransactionSummary = () => {
  return http.get("/reporting/totaltransactionsummaryforaday");
};
const getPaymentSchemes = () => {
  return http.get("/reporting/paymentschemes");
};
const getTransactionsGrowthComparison = (value) => {
  return http.get("/reporting/transactionsgrowthcomparison", {params: {ValueBy:value}});
};

const DashboardService = {
  getTransactionPerHourChart,
  getTransactionSummary,
  getPaymentSchemes,
  getTransactionsGrowthComparison,
};

export default DashboardService;
