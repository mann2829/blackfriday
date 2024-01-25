import React from "react";
import TotalTransactionIcon from "../assets/images/total-transaction.svg";
import AvgTransactionIcon from "../assets/images/avg-transaction.svg";
import QuickTransactionIcon from "../assets/images/quick-transaction.svg";
import MinuteTransactionIcon from "../assets/images/minute-transaction.svg";
import MaxTransactionIcon from "../assets/images/max-transaction.svg";
import { formatNumber } from "../common/util";

const TransactionStatistics = ({ transactionSummary }) => {
  const getFontClass = (value) => {
    return value.toString().length > 9 ? "small" : "";
  };

  return (
    <section className="total-transaction-sec">
      <div className="custom-container">
        <div className="total-transaction-content">
          <div className="transaction-content-left">
            <div className="transaction-content-left-inner">
              <div>
                <img src={TotalTransactionIcon} alt="img" />
              </div>
              <ul>
                <li className={getFontClass(transactionSummary.volume)}>
                  <p>Total Transaction Volume</p>
                  {formatNumber(transactionSummary.volume)}
                </li>
                <li className={getFontClass(transactionSummary.value)}>
                  <p>Total Transaction Value</p>R{" "}
                  {formatNumber(transactionSummary.value)}
                </li>
                <li className={getFontClass(transactionSummary.maximumValue)}>
                  <p>Largest Transaction Value</p>R{" "}
                  {formatNumber(transactionSummary.maximumValue)}
                </li>
              </ul>
            </div>
          </div>
          <div className="transaction-content-right">
            <div className="box">
              <img src={AvgTransactionIcon} alt="icon" />
              <p>Average Transaction Value</p>
              <h5>R {formatNumber(transactionSummary.averageValue)}</h5>
            </div>
            <div className="box">
              <img src={QuickTransactionIcon} alt="icon" />
              <p>Quickest Transaction</p>
              <h5>
                {transactionSummary.quickestTimeInMs}
                <span>miliseconds</span>
              </h5>
            </div>
            <div className="box">
              <img src={MinuteTransactionIcon} alt="icon" />
              <p>Avg Transactions per minute</p>
              <h5>{transactionSummary.averageVolumePerMinute}</h5>
            </div>
            <div className="box">
              <img src={MaxTransactionIcon} alt="icon" />
              <p>Max Transactions per Second</p>
              <h5>{transactionSummary.maximumVolumePerSecond}</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TransactionStatistics;
