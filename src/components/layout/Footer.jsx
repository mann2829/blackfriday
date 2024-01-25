import React, { useEffect, useState } from "react";
import ScrollTopIcon from "../../assets/images/scroll-top.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const handleScroll = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <footer>
        <div className="custom-container">
          <div className="footer-inner">
            <p>
              <Link
                target="_blank"
                to={"https://www.ecentric.co.za/privacy-terms/"}
              >
                Terms of Use &nbsp;| &nbsp; Privacy Policy
              </Link>
            </p>
            <p>2023 Ecentric Payment Systems</p>
          </div>
        </div>
      </footer>
      {showTopBtn && (
        <Link to={""} className="top-scroll-btn show" onClick={handleScroll}>
          <img src={ScrollTopIcon} alt="scrollTop" />
        </Link>
      )}
    </>
  );
};

export default Footer;
