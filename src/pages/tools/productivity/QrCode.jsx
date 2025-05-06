import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faDownload,
  faCopy,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { toast, Toaster } from "react-hot-toast";

const QRCodePage = () => {
  const [qrValue, setQrValue] = useState("");
  const [qrSize, setQrSize] = useState(200);
  const [qrColor, setQrColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [margin, setMargin] = useState(0);
  const [format, setFormat] = useState("png");
  const qrImageRef = useRef(null);

  const generateQRCode = () => {
    if (!qrValue.trim()) {
      toast.error("Please enter text or URL");
      return null;
    }
    return `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
      qrValue
    )}&color=${qrColor.substring(1)}&bgcolor=${bgColor.substring(
      1
    )}&margin=${margin}&format=${format}`;
  };

  const downloadQRCode = async () => {
    if (!qrValue.trim()) {
      toast.error("Please generate QR code first");
      return;
    }

    try {
      const qrUrl = generateQRCode();
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `bitlearningqrcode.${format}`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      toast.success("QR Code downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download QR Code");
      console.error("Download error:", error);
    }
  };

  const copyQRCode = async () => {
    if (!qrValue.trim()) {
      toast.error("Please generate QR code first");
      return;
    }
    try {
      const response = await fetch(generateQRCode());
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      toast.success("QR Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy QR Code");
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-50 overflow-hidden min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a
                href="/"
                className="text-gray-500 hover:text-indigo-600 transition-colors duration-300 cursor-pointer"
              >
                <FontAwesomeIcon icon={faHome} className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </a>
            </li>
            <li className="flex items-center">
              <span className="text-gray-400 mx-2">/</span>
              <a
                href="/qr-generator"
                className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300 cursor-pointer"
                aria-current="page"
              >
                QR Generator
              </a>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <FontAwesomeIcon icon={faQrcode} className="mr-3 text-indigo-600" />
            QR Code Generator
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div>
              <div className="mb-6">
                <label
                  htmlFor="qrText"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Text or URL to encode
                </label>
                <textarea
                  id="qrText"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter text or URL..."
                  value={qrValue}
                  onChange={(e) => setQrValue(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="qrSize"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Size (px)
                  </label>
                  <input
                    type="range"
                    id="qrSize"
                    min="100"
                    max="500"
                    step="10"
                    value={qrSize}
                    onChange={(e) => setQrSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600">{qrSize}px</span>
                </div>

                <div>
                  <label
                    htmlFor="qrMargin"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Margin
                  </label>
                  <input
                    type="range"
                    id="qrMargin"
                    min="0"
                    max="20"
                    value={margin}
                    onChange={(e) => setMargin(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600">{margin}px</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="qrColor"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    QR Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="qrColor"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="h-10 w-10 cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {qrColor}
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bgColor"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Background Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="bgColor"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-10 w-10 cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {bgColor}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="qrFormat"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Format
                </label>
                <select
                  id="qrFormat"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="svg">SVG</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={downloadQRCode}
                  disabled={!qrValue.trim()}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    qrValue.trim()
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-indigo-300 cursor-not-allowed"
                  } text-white transition-colors duration-300`}
                >
                  <FontAwesomeIcon icon={faDownload} className="mr-2" />
                  Download
                </button>
                <button
                  onClick={copyQRCode}
                  disabled={!qrValue.trim()}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    qrValue.trim()
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-indigo-300 cursor-not-allowed"
                  } text-white transition-colors duration-300`}
                >
                  <FontAwesomeIcon icon={faCopy} className="mr-2" />
                  Copy
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div className="flex flex-col items-center justify-center">
              {qrValue.trim() ? (
                <>
                  <img
                    ref={qrImageRef}
                    src={generateQRCode()}
                    alt="Generated QR Code"
                    className="border border-gray-200 rounded-lg mb-4"
                  />
                  <p className="text-sm text-gray-500 text-center">
                    Scan this QR code with your device's camera or QR scanner
                    app
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faQrcode}
                      className="text-gray-300 text-5xl"
                    />
                  </div>
                  <p className="mt-4 text-gray-500">
                    Your QR code will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default QRCodePage;
