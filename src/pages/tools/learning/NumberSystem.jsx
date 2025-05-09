import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faExchangeAlt,
  faCalculator,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const NumberSystemConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [toBase, setToBase] = useState("2");
  const [customFromBase, setCustomFromBase] = useState("");
  const [customToBase, setCustomToBase] = useState("");
  const [error, setError] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const baseOptions = [
    { value: "2", label: "Binary (2)" },
    { value: "8", label: "Octal (8)" },
    { value: "10", label: "Decimal (10)" },
    { value: "16", label: "Hexadecimal (16)" },
    { value: "custom", label: "Custom Base" },
  ];

  const handleConvert = () => {
    setError("");
    try {
      let actualFromBase =
        fromBase === "custom" ? parseInt(customFromBase) : parseInt(fromBase);
      let actualToBase =
        toBase === "custom" ? parseInt(customToBase) : parseInt(toBase);

      if (isNaN(actualFromBase))
        throw new Error("Please enter a valid 'from' base");
      if (isNaN(actualToBase))
        throw new Error("Please enter a valid 'to' base");
      if (actualFromBase < 2 || actualToBase < 2)
        throw new Error("Base must be ≥ 2");
      if (!inputValue) throw new Error("Please enter a number to convert");

      // Validate input based on the fromBase
      const validChars = getValidChars(actualFromBase);
      const regex = new RegExp(`^[${validChars}]+$`, "i");
      if (!regex.test(inputValue))
        throw new Error(`Invalid characters for base ${actualFromBase}`);

      // Convert input to decimal first
      const decimalValue = parseInt(inputValue, actualFromBase);
      if (isNaN(decimalValue))
        throw new Error(`Invalid number for base ${actualFromBase}`);

      // Convert decimal to target base
      const result = decimalValue.toString(actualToBase).toUpperCase();
      setOutputValue(result);
    } catch (err) {
      setError(err.message);
      setOutputValue("");
    }
  };

  const getValidChars = (base) => {
    const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return digits.slice(0, base);
  };

  const swapBases = () => {
    const temp = fromBase;
    setFromBase(toBase);
    setToBase(temp);

    const tempCustom = customFromBase;
    setCustomFromBase(customToBase);
    setCustomToBase(tempCustom);

    if (outputValue) {
      setInputValue(outputValue);
      setOutputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleConvert();
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-18">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a
                href="/tools/learning"
                className="text-gray-500 hover:text-indigo-600 transition-colors duration-300 cursor-pointer"
              >
                <FontAwesomeIcon icon={faBackward} className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </a>
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mx-2">/</span>
              <a
                href="/number-converter"
                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300 cursor-pointer"
                aria-current="page"
              >
                Number System Converter
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FontAwesomeIcon
                icon={faCalculator}
                className="mr-3 text-indigo-600"
              />
              Number System Converter
            </h1>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
              Help
            </button>
          </div>

          {showHelp && (
            <div className="mb-6 p-4 bg-blue-50 rounded-md">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                How to use:
              </h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                <li>Select the number system you're converting from and to</li>
                <li>For custom bases, enter the base value (must be ≥ 2)</li>
                <li>Enter your number in the input field</li>
                <li>Press Convert or hit Enter to see the result</li>
                <li>Click the swap button (↔) to reverse the conversion</li>
                <li>Valid characters depend on the selected base (0-9, A-Z)</li>
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {/* Conversion Controls - Now with perfect alignment */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-4">
              <div className="flex-1 w-full">
                <label
                  htmlFor="fromBase"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  From Base
                </label>
                <div className="flex gap-2">
                  <select
                    id="fromBase"
                    value={fromBase}
                    onChange={(e) => setFromBase(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {baseOptions.map((option) => (
                      <option key={`from-${option.value}`} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {fromBase === "custom" && (
                    <input
                      type="number"
                      min="2"
                      value={customFromBase}
                      onChange={(e) => setCustomFromBase(e.target.value)}
                      placeholder="Base"
                      className="w-20 p-2 border border-gray-300 rounded-md"
                    />
                  )}
                </div>
              </div>

              <button
                onClick={swapBases}
                className="p-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors duration-300 h-10"
                title="Swap conversion direction"
              >
                <FontAwesomeIcon icon={faExchangeAlt} />
              </button>

              <div className="flex-1 w-full">
                <label
                  htmlFor="toBase"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  To Base
                </label>
                <div className="flex gap-2">
                  <select
                    id="toBase"
                    value={toBase}
                    onChange={(e) => setToBase(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {baseOptions.map((option) => (
                      <option key={`to-${option.value}`} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {toBase === "custom" && (
                    <input
                      type="number"
                      min="2"
                      value={customToBase}
                      onChange={(e) => setCustomToBase(e.target.value)}
                      placeholder="Base"
                      className="w-20 p-2 border border-gray-300 rounded-md"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Input/Output Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="inputValue"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Input Number
                </label>
                <input
                  type="text"
                  id="inputValue"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Enter ${
                    fromBase === "custom" ? customFromBase : fromBase
                  }-based number`}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Valid characters:{" "}
                  {fromBase === "custom" && customFromBase
                    ? getValidChars(parseInt(customFromBase))
                    : getValidChars(parseInt(fromBase))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="outputValue"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Result
                </label>
                <input
                  type="text"
                  id="outputValue"
                  value={outputValue}
                  readOnly
                  placeholder={`${
                    toBase === "custom" && customToBase ? customToBase : toBase
                  }-based result`}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Base {toBase === "custom" ? customToBase || "?" : toBase}
                </div>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <div className="flex gap-4">
              <button
                onClick={handleConvert}
                className="flex-1 md:flex-none px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-300"
              >
                Convert
              </button>
              <button
                onClick={() => {
                  setInputValue("");
                  setOutputValue("");
                  setError("");
                }}
                className="flex-1 md:flex-none px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors duration-300"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberSystemConverter;
