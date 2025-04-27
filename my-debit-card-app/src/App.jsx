import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [values, setValues] = useState(Array(16).fill(""));
  const [visibleInputs, setVisibleInputs] = useState(4);

 
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current = Array(16)
      .fill()
      .map((_, i) => inputsRef.current[i] || React.createRef());
  }, []);

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 1); 
    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);
  
    const nextIndex = index + 1;
  
  
    const shouldRevealNext =
      (index % 4 === 3 || index === visibleInputs - 1) &&
      newValues.slice(index - (index % 4), index + 1).every((v) => v !== "");
  
    if (shouldRevealNext && visibleInputs < nextIndex + 4) {
      setVisibleInputs(Math.min(16, nextIndex + 4));
    }
  
    
    if (val && nextIndex < 16) {
      setTimeout(() => {
        if (inputsRef.current[nextIndex]?.current) {
          inputsRef.current[nextIndex].current.focus();
        }
      }, 0);
    }
  };
  
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      const newValues = [...values];
      newValues[index - 1] = "";
      setValues(newValues);
      inputsRef.current[index - 1].current.focus();
    }
  };

  return (
    <div className="card-input-container">
      {values.map((val, i) => {
        return (
          i < visibleInputs && (
            <React.Fragment key={i}>
              <input
                type="text"
                value={val}
                onChange={(e) => handleChange(i, e)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                ref={inputsRef.current[i]}
                maxLength={1}
                className="card-digit-input"
              />
              {(i + 1) % 4 === 0 && i !== 15 ? (
                <span className="dash">-</span>
              ) : null}
            </React.Fragment>
          )
        );
      })}
    </div>
  );
}

export default App;
