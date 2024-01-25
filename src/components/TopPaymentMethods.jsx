import React from "react";
import VisaIcon from "../assets/images/visa.svg";
import EFTIcon from "../assets/images/Instant-EFT.svg";
import SnapScanIcon from "../assets/images/snapscan.svg";

const TopPaymentMethods = ({ paymentSchemes }) => {
  const PAYMENT_METHODS = [VisaIcon, EFTIcon, SnapScanIcon];

  const getPaymentPhotoURL = (needle) => {
    let index = paymentSchemes.findIndex((item) =>
      needle.includes(item.toLowerCase())
    );
    return PAYMENT_METHODS[index];
  };
  return (
    <section className="visible-card-section">
      <div className="custom-container">
        <h3>Top Payment Methods</h3>
        <div className="visible-card-inner">
          <div className="left-box">
            <div>
              <p>1</p>
              <img src={getPaymentPhotoURL("visacardnotpresentcardnotfound")} />
            </div>
          </div>
          <div className="right-box">
            <div>
              <p>2</p>
              <img src={getPaymentPhotoURL("instanteft")} />
            </div>
            <div>
              <p>3</p>
              <img src={getPaymentPhotoURL("snapscanprivatelabel")} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TopPaymentMethods;
