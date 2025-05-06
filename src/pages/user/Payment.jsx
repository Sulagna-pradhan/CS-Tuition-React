import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faQrcode,
  faCalendarAlt,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../../firebase/Config";

const PaymentStatus = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("Online");
  const [payments, setPayments] = useState([]);
  const [userId, setUserId] = useState(null);

  // Months up to current month (e.g., May 2025 → Jan-May)
  const currentMonth = new Date().getMonth(); // 0-based (May = 4)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].slice(0, currentMonth + 1);

  // Generate dates for selected month
  const getDaysInMonth = (monthName) => {
    const year = new Date().getFullYear();
    const monthIndex = months.indexOf(monthName);
    const days = new Date(year, monthIndex + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => {
      const day = i + 1;
      return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
    });
  };

  // Fetch payment records
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User authenticated:", user.uid);
        setUserId(user.uid);
        try {
          const q = query(
            collection(db, "payment"),
            where("uid", "==", user.uid),
            orderBy("timestamp", "desc")
          );
          const querySnapshot = await getDocs(q);
          const paymentList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPayments(paymentList);
          console.log("Payment records fetched:", paymentList);
        } catch (error) {
          console.error("Error fetching payments:", {
            code: error.code,
            message: error.message,
          });
        }
      } else {
        console.log("No user authenticated, redirecting to login");
        window.location.href = "/auth/login";
      }
    });

    return () => unsubscribe();
  }, []);

  // Auto-fill for "Want to Pay"
  useEffect(() => {
    if (selectedOption === "want-to-pay") {
      const today = new Date();
      setMonth(months[today.getMonth()]);
      setDate(today.toISOString().split("T")[0]);
      setMode("Online");
    }
  }, [selectedOption]);

  const handleSubmit = async () => {
    if (!month || !date || !mode) {
      alert("Please fill all fields before submitting.");
      return;
    }

    try {
      const paymentData = {
        uid: userId,
        month,
        date,
        mode,
        timestamp: new Date().toISOString(),
      };
      const docRef = await addDoc(collection(db, "payment"), paymentData);
      console.log("Payment recorded:", { id: docRef.id, ...paymentData });
      setPayments([{ id: docRef.id, ...paymentData }, ...payments]);
      alert("Payment status recorded successfully!");
      setSelectedOption(null);
      setMonth("");
      setDate("");
      setMode("Online");
    } catch (error) {
      console.error("Error recording payment:", {
        code: error.code,
        message: error.message,
      });
      alert("Failed to record payment. Please try again.");
    }
  };

  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800 p-6">
      {/* Page Header */}
      <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <h2 className="text-2xl font-bold flex items-center">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="mr-2 text-indigo-600"
          />
          Payment Status
        </h2>
        <p className="text-gray-500">
          Manage and view your payment status and history.
        </p>
      </div>

      {/* Payment Options */}
      {!selectedOption && (
        <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
          <h3 className="text-xl font-bold mb-4">Select Payment Option</h3>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <button
              onClick={() => setSelectedOption("already-paid")}
              className="px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full md:w-auto"
            >
              Already Paid
            </button>
            <button
              onClick={() => setSelectedOption("want-to-pay")}
              className="px-6 py-3 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full md:w-auto"
            >
              Want to Pay
            </button>
          </div>
        </div>
      )}

      {/* Already Paid Form */}
      {selectedOption === "already-paid" && (
        <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
          <h3 className="text-xl font-bold mb-4">Record Payment</h3>
          <div className="space-y-4">
            {/* Month Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-2">Month</label>
              <select
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  setDate(""); // Reset date when month changes
                }}
                className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
              >
                <option value="">Select Month</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Payment Date
              </label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                disabled={!month}
              >
                <option value="">Select Date</option>
                {month &&
                  getDaysInMonth(month).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
              </select>
            </div>

            {/* Mode of Payment */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Mode of Payment
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setSelectedOption(null)}
              className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Want to Pay Section */}
      {selectedOption === "want-to-pay" && (
        <div className="rounded-xl shadow-lg p-6 mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <FontAwesomeIcon icon={faQrcode} className="mr-2 text-indigo-600" />
            Pay Now
          </h3>
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="mb-4 md:mb-0">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                alt="QR Code"
                className="w-48 h-48 object-contain mx-auto"
              />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <label className="block text-sm font-medium mb-2">Month</label>
                <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                  {month}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Date
                </label>
                <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                  {date}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Mode of Payment
                </label>
                <p className="p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600">
                  {mode}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setSelectedOption(null)}
              className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Payment History */}
      <div className="rounded-xl shadow-lg p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <FontAwesomeIcon icon={faList} className="mr-2 text-indigo-600" />
          Payment History
        </h3>
        {payments.length === 0 ? (
          <p className="text-gray-500">No payment records found.</p>
        ) : (
          <ul className="space-y-4">
            {payments.map((payment) => (
              <li
                key={payment.id}
                className="p-4 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <p className="font-medium">Month: {payment.month}</p>
                    <p className="text-gray-500">Date: {payment.date}</p>
                    <p className="text-gray-500">Mode: {payment.mode}</p>
                  </div>
                  <p className="text-gray-500 mt-2 md:mt-0">
                    Recorded: {new Date(payment.timestamp).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default PaymentStatus;
