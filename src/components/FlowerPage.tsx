import React from 'react';
import '../styles/flower.css'; // Import flower specific styles
import '../styles/lastpage.css'; // Import last page styles

// Functional component for the Flower page
const FlowerPage: React.FC = () => {
  return (
    <div className="flower-page-container">
      {/* Thank you message */}
      <div id="thankyou"><b>Thank you for being my wife</b></div>
      {/* Container for the flower animation */}
      <div className="flower">
        {/* First flower wrapper */}
        <div className="f-wrapper">
          <div className="flower__line"></div>
          <div className="f">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__leaf flower__leaf--5"></div>
            <div className="flower__leaf flower__leaf--6"></div>
            <div className="flower__leaf flower__leaf--7"></div>
            {/* Yellow falling leaf */}
            <div
              className="flower__leaf flower__leaf--8 flower__fall-down--yellow"
            ></div>
          </div>
        </div>

        {/* Second flower wrapper */}
        <div className="f-wrapper f-wrapper--2">
          <div className="flower__line"></div>
          <div className="f">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__leaf flower__leaf--5"></div>
            <div className="flower__leaf flower__leaf--6"></div>
            <div className="flower__leaf flower__leaf--7"></div>
            {/* Pink falling leaf */}
            <div
              className="flower__leaf flower__leaf--8 flower__fall-down--pink"
            ></div>
          </div>
        </div>

        {/* Third flower wrapper */}
        <div className="f-wrapper f-wrapper--3">
          <div className="flower__line"></div>
          <div className="f">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__leaf flower__leaf--5"></div>
            <div className="flower__leaf flower__leaf--6"></div>
            <div className="flower__leaf flower__leaf--7"></div>
            {/* Purple falling leaf */}
            <div
              className="flower__leaf flower__leaf--8 flower__fall-down--purple"
            ></div>
          </div>
        </div>
        {/* Glass vase */}
        <div className="flower__glass"></div>
      </div>
    </div>
  );
};

export default FlowerPage;

