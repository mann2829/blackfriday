import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactionBarChart,
  fetchTransactionSummary,
  fetchPaymentSchemes,
  fetchTransactionVolumeChart,
  fetchTransactionValueChart,
} from "../slices/dashboard";
import TransactionValueChart from "./TransactionValueChart";
import TransactionVolumeChart from "./TransactionVolumeChart";
import TransactionStatistics from "./TransactionStatistics";
import TopPaymentMethods from "./TopPaymentMethods";
import Banner from "./layout/Banner";
import SaleCounter from "./SaleCounter";
import moment from "moment/moment";
import { EVENTS, EVENT_TYPES } from "../common/util";

const Dashboard = ({ handleFooter, handleEventType }) => {
  const dispatch = useDispatch();
  const [isTimer, setIsTimer] = useState(false);
  const [timestamp, setTimestamp] = useState(0);
  const [eventType, setEventType] = useState("");
  const REFRESH_INTERVAL = process.env.REACT_APP_REFRESH_INTERVAL * 1000;
  const DEBUG_MODE = process.env.REACT_APP_DEBUG;
  const {
    transactionPerHour,
    transactionSummary,
    paymentSchemes,
    transactionVolume,
    transactionValue,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (DEBUG_MODE === "true") {
      getTimerDate();
      handleFooter(true);
      initializeChart();
      const interval = setInterval(() => {
        initializeChart();
      }, REFRESH_INTERVAL);

      return () => clearInterval(interval);
    } else {
      const {timerDate, todayTimestamp} = getTimerDate();
      if (todayTimestamp > timerDate) {
        setIsTimer(true);
        setTimestamp(timerDate);
        handleFooter(false);
      } else if (timerDate === todayTimestamp) {
        setIsTimer(false);
        setTimestamp(0);
        initializeChart();
        handleFooter(true);
      } else if (timerDate > todayTimestamp) {
        setIsTimer(true);
        setTimestamp(timerDate);
        handleFooter(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isTimer) return;
    initializeChart();
    const interval = setInterval(() => {
      initializeChart();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [isTimer]);

  const initializeChart = () => {
    if (DEBUG_MODE === false && isTimer) return;
    dispatch(fetchTransactionBarChart());
    dispatch(fetchTransactionSummary());
    dispatch(fetchPaymentSchemes());
    dispatch(fetchTransactionVolumeChart());
    dispatch(fetchTransactionValueChart());
  };

  const getTimerDate = () => {
    const blackFriday = moment(
      process.env.REACT_APP_BLACK_FRIDAY_DATE
    ).valueOf();
    const cyberMonday = moment(
      process.env.REACT_APP_CYBER_MONDAY_DATE
    ).valueOf();

    let todayDate = moment().format("YYYY-MM-DD");

    let todayTimestamp = moment(todayDate).valueOf();

    const diff1 = blackFriday - todayTimestamp;
    const diff2 = cyberMonday - todayTimestamp;

    let timerDate = null;

    if (diff1 < 0 && diff2 < 0) {
      setEventType(null);
      handleEventType(null);
      //
    } else if (diff1 >= 0 && diff2 < 0) {
      timerDate = blackFriday;
      setEventType(EVENT_TYPES.BLACK_FRIDAY);
      handleEventType(EVENTS.BLACK_FRIDAY);
    } else if (diff2 >= 0 && diff1 < 0) {
      timerDate = cyberMonday;
      setEventType(EVENT_TYPES.CYBER_MONDAY);
      handleEventType(EVENTS.CYBER_MONDAY);
    } else if (diff1 < diff2) {
      timerDate = blackFriday;
      setEventType(EVENT_TYPES.BLACK_FRIDAY);
      handleEventType(EVENTS.BLACK_FRIDAY);
    } else {
      timerDate = cyberMonday;
      setEventType(EVENT_TYPES.CYBER_MONDAY);
      handleEventType(EVENTS.CYBER_MONDAY);
    }

    return {timerDate, todayTimestamp}
  };

  const onCompleted = () => {
    window.location.reload();
  };

  return (
    <>
      {isTimer ? (
        <SaleCounter
          timestamp={timestamp}
          onCompleted={onCompleted}
          eventType={eventType}
        />
      ) : (
        <>
          <Banner
            transactionPerHour={transactionPerHour}
            eventType={eventType}
          />
          <TransactionStatistics transactionSummary={transactionSummary} />
          <TransactionValueChart
            type={"spline"}
            valueTrans={transactionValue}
          />
          <TransactionVolumeChart
            type={"spline"}
            transactionVolume={transactionVolume}
          />
          <TopPaymentMethods paymentSchemes={paymentSchemes} />
        </>
      )}
    </>
  );
};
export default Dashboard;
