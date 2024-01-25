import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import { CONTENT } from "../common/util";

const SaleCounter = ({ timestamp, onCompleted, eventType }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      onCompleted();
    } else {
      // Render a countdown
      return (
        <ul>
          <li>
            <h4> {zeroPad(days)}</h4>
            <span>DAYS</span>
          </li>
          <li>
            <h4>{zeroPad(hours)}</h4>
            <span>HOURS</span>
          </li>
          <li>
            <h4>{zeroPad(minutes)}</h4>
            <span>MINUTES</span>
          </li>
          <li>
            <h4>{zeroPad(seconds)}</h4>
            <span>SECONDS</span>
          </li>
        </ul>
      );
    }
  };
  return (
    <section className="countdown-page-banner">
      <div className="countdown-inner">
        <div className="countdown-text">
          {eventType ? (
            <>
              <h2>{CONTENT[eventType].counterTitle}</h2>
              <p>{CONTENT[eventType].counterDescription}</p>
            </>
          ) : (
            <p>
              Thank you for making Black Friday and Cyber Monday unforgettable!
              We hope you enjoyed the shopping frenzy, bagging incredible deals,
              and exploring real-time payment insights with Ecentric. Your
              enthusiasm and support mean the world to us. Please visit our
              website for more information on what we have to offer.
            </p>
          )}
          <Countdown
            date={timestamp}
            intervalDelay={0}
            precision={3}
            renderer={renderer}
          />
        </div>
      </div>
    </section>
  );
};
export default SaleCounter;
