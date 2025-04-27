import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const totalDigits = 16;
  const [values, setValues] = useState(Array(totalDigits).fill(""));
  const [visibleCount, setVisibleCount] = useState(4);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = Array(totalDigits)
      .fill(null)
      .map((_, i) => inputRefs.current[i] || React.createRef());
  }, []);

  const handleChange = (i, e) => {
    const digit = e.target.value.replace(/\D/g, "").slice(0, 1);
    const updatedValues = [...values];
    updatedValues[i] = digit;
    setValues(updatedValues);

    
    const isBlockEnd = (i + 1) % 4 === 0;
    const blockStart = i - (i % 4);
    const isBlockFilled = updatedValues.slice(blockStart, blockStart + 4).every(v => v);

    if (isBlockEnd && isBlockFilled && visibleCount < totalDigits) {
      setVisibleCount(Math.min(totalDigits, visibleCount + 4));
    }

  
    if (digit && i < totalDigits - 1) {
      setTimeout(() => inputRefs.current[i + 1]?.current?.focus(), 0);
    }
  };

  const handleBackspace = (i, e) => {
    if (e.key === "Backspace" && !values[i] && i > 0) {
      const updatedValues = [...values];
      updatedValues[i - 1] = "";
      setValues(updatedValues);
      inputRefs.current[i - 1]?.current?.focus();
    }
  };

  return (
    <div className="card-input-container">
      {values.map((val, i) =>
        i < visibleCount ? (
          <React.Fragment key={i}>
            <input
              ref={inputRefs.current[i]}
              type="text"
              value={val}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleBackspace(i, e)}
              maxLength={1}
              className="card-digit-input"
            />
            {(i + 1) % 4 === 0 && i < totalDigits - 1 && <span className="dash">-</span>}
          </React.Fragment>
        ) : null
      )}
    </div>
  );
}

export default App;
