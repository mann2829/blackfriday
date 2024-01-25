import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DashboardDataService from "../services/DashboardService";

const growthComparisionJSON = {
  previousLabel: "",
  currentLabel: "",
  data: [
    {
      label: "",
      growth: 0,
      previousValue: 10,
      currentValue: 20,
    },
    {
      label: "",
      growth: 0,
      previousValue: 30,
      currentValue: 10,
    },
  ],
  totals: [
    {
      label: "",
      value: 0,
    },
    {
      label: "",
      value: 0,
    },
  ],
  totalGrowth: 0,
};

const initialState = {
  transactionPerHour: [],
  transactionSummary: {
    volume: 0,
    value: 0,
    maximumValue: 0,
    averageValue: 0,
    quickestTimeInMs: 0,
    averageVolumePerMinute: 0,
    maximumVolumePerSecond: 0,
  },
  paymentSchemes: [],
  transactionVolume:growthComparisionJSON,
  transactionValue:growthComparisionJSON,
  isLoading: false,
  error: null,
};

export const fetchTransactionBarChart = createAsyncThunk(
  "dashboard/transactionPerHour",
  async () => {
    const res = await DashboardDataService.getTransactionPerHourChart();
    return res.data;
  }
);

export const fetchTransactionSummary = createAsyncThunk(
  "dashboard/transactionSummary",
  async () => {
    const res = await DashboardDataService.getTransactionSummary();
    return res.data;
  }
);

export const fetchPaymentSchemes = createAsyncThunk(
  "dashboard/paymentSchemes",
  async () => {
    const res = await DashboardDataService.getPaymentSchemes();
    return res.data;
  }
);

export const fetchTransactionVolumeChart = createAsyncThunk(
  "dashboard/transactionVolumeData",
  async () => {
    const res = await DashboardDataService.getTransactionsGrowthComparison(
      "Volume"
    );
    return res.data;
  }
);

export const fetchTransactionValueChart = createAsyncThunk(
  "dashboard/transactionValueData",
  async () => {
    const res = await DashboardDataService.getTransactionsGrowthComparison(
      "Value"
    );
    return res.data;
  }
);

const dashboardSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionBarChart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactionBarChart.fulfilled, (state, action) => {
        state.isLoading = false;
        let valuesArr = [];
        let labelsArr = [];
        valuesArr = action.payload.map((x) => x.value);
        labelsArr = action.payload.map((x) => x.label);
        state.transactionPerHour = {
          label: labelsArr,
          value: valuesArr,
        };
      })
      .addCase(fetchTransactionBarChart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(fetchTransactionSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactionSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactionSummary = action.payload;
      })
      .addCase(fetchTransactionSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(fetchPaymentSchemes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPaymentSchemes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentSchemes = action.payload;
      })
      .addCase(fetchPaymentSchemes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(fetchTransactionVolumeChart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactionVolumeChart.fulfilled, (state, action) => {
        state.isLoading = false;

        let label = [],
          growth = [],
          previousValue = [],
          currentValue = [];

        let { data, totals } = action.payload;

        data.map((data) => {
          currentValue.push(data.currentValue);
          previousValue.push(data.previousValue);
          label.push(data.label);
          growth.push(data.growth);
        });

        state.transactionVolume = {
          previousLabel: action.payload.previousLabel,
          currentLabel: action.payload.currentLabel,
          currentValue: currentValue,
          previousValue: previousValue,
          growth: growth,
          label: label,
          totals: totals,
          totalGrowth: action.payload.totalGrowth,
        };
      })
      .addCase(fetchTransactionVolumeChart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTransactionValueChart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactionValueChart.fulfilled, (state, action) => {
        state.isLoading = false;

        let label = [],
          growth = [],
          previousValue = [],
          currentValue = [];

        let { data, totals } = action.payload;

        data.map((data) => {
          currentValue.push(data.currentValue);
          previousValue.push(data.previousValue);
          label.push(data.label);
          growth.push(data.growth);
        });

        state.transactionValue = {
          previousLabel: action.payload.previousLabel,
          currentLabel: action.payload.currentLabel,
          currentValue: currentValue,
          previousValue: previousValue,
          growth: growth,
          label: label,
          totals: totals,
          totalGrowth: action.payload.totalGrowth,
        };
      })
      .addCase(fetchTransactionValueChart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

const { reducer } = dashboardSlice;
export default reducer;
