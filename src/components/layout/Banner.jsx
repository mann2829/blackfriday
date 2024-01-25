import React from "react";
import TransactionPerHourChart from "../TransactionPerHourChart";
import { CONTENT } from "../../common/util";

export default function Banner({ transactionPerHour, eventType }) {
  console.log("eventType", eventType);
  return (
    <section className="dashboard-banner-sec">
      <div className="custom-container">
        {eventType && (
          <>
            <h2 className="text-center">{CONTENT[eventType].dashboardTitle}</h2>
            <p className="text-center">
              {CONTENT[eventType].dashboardDescription}
            </p>
          </>
        )}
        <div className="transaction-graph">
          <TransactionPerHourChart
            type={"column"}
            transactionPerHour={transactionPerHour}
          />
        </div>
      </div>
    </section>
  );
}
