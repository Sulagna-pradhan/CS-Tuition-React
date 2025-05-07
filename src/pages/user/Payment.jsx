import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faQrcode,
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
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [payments, setPayments] = useState([]);
  const [userId, setUserId] = useState(null);

  // Months up to current month
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-based (May = 4)
  const currentYear = currentDate.getFullYear();
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
    const year = currentYear;
    const monthIndex = months.indexOf(monthName);
    const days = new Date(year, monthIndex + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => {
      const day = i + 1;
      return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
    });
  };

  // Generate table rows for all months up to current
  const getTableRows = () => {
    return months.map((month) => {
      const payment = payments.find((p) => p.month === month);
      return {
        month,
        amount: payment ? payment.amount || "" : "",
        date: payment ? payment.date || "" : "",
        status: payment ? "Done" : "Due",
      };
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
          console.log("Executing query for payments with uid:", user.uid);
          const querySnapshot = await getDocs(q);
          const paymentList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Payment records fetched:", paymentList);
          setPayments(paymentList);
        } catch (error) {
          console.error("Error fetching payments:", {
            code: error.code,
            message: error.message,
            uid: user.uid,
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
      setAmount("");
      setTransactionId("");
    }
  }, [selectedOption]);

  const handleSubmit = async () => {
    if (!month || !date || !mode || !amount) {
      alert("Please fill all required fields before submitting.");
      return;
    }
    if (selectedOption === "want-to-pay" && !transactionId) {
      alert("Please enter the transaction ID.");
      return;
    }

    try {
      const paymentData = {
        uid: userId,
        month,
        date,
        mode,
        amount: Number(amount),
        transactionId: transactionId || null,
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
      setAmount("");
      setTransactionId("");
    } catch (error) {
      console.error("Error recording payment:", {
        code: error.code,
        message: error.message,
      });
      alert("Failed to record payment. Please try again.");
    }
  };

  return (
    <main className="flex-1 ml-0 md:ml-6 transition-all duration-300 dark:text-white text-gray-800 p-2 sm:p-4 md:p-6">
      {/* Page Header */}
      <div className="rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <h2 className="text-xl sm:text-2xl font-bold flex items-center">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="mr-2 text-indigo-600"
          />
          Payment Status
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          Manage and view your payment status and history.
        </p>
      </div>

      {/* Payment Options */}
      {!selectedOption && (
        <div className="rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            Select Payment Option
          </h3>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
            <button
              onClick={() => setSelectedOption("already-paid")}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full"
            >
              Already Paid
            </button>
            <button
              onClick={() => setSelectedOption("want-to-pay")}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full"
            >
              Want to Pay
            </button>
          </div>
        </div>
      )}

      {/* Already Paid Form */}
      {selectedOption === "already-paid" && (
        <div className="rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Record Payment</h3>
          <div className="space-y-3 sm:space-y-4">
            {/* Month Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1 sm:mb-2">
                Month
              </label>
              <select
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  setDate("");
                }}
                className="w-full p-2 sm:p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm sm:text-base"
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
              <label className="block text-sm font-medium mb-1 sm:mb-2">
                Payment Date
              </label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 sm:p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm sm:text-base"
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
              <label className="block text-sm font-medium mb-1 sm:mb-2">
                Mode of Payment
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full p-2 sm:p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm sm:text-base"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-1 sm:mb-2">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 sm:p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm sm:text-base"
                placeholder="Enter Amount"
                min="0"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6">
            <button
              onClick={() => setSelectedOption(null)}
              className="order-2 sm:order-1 px-4 sm:px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="order-1 sm:order-2 px-4 sm:px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full sm:w-auto"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Want to Pay Section */}
      {selectedOption === "want-to-pay" && (
        <div className="rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
            <FontAwesomeIcon icon={faQrcode} className="mr-2 text-indigo-600" />
            Pay Now
          </h3>
          <p className="text-yellow-500 text-sm sm:text-xl mb-3 sm:mb-4">
            First{" "}
            <span className="text-green-500 font-semibold">
              scan this QR code
            </span>{" "}
            and make payment. Then type amount &amp;
            <span className="text-blue-500 font-semibold"> transaction ID</span>
            .
          </p>

          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="mb-4 md:mb-0 flex justify-center">
              <img
                src="https://static.vecteezy.com/ti/gratis-vektor/t2/2258271-vorlage-von-qr-code-bereit-zum-scannen-mit-smartphone-illustration-vektor.jpg"
                alt="QR Code"
                className="w-36 h-36 sm:w-48 sm:h-48 object-contain"
              />
            </div>
            <div className="space-y-3 sm:space-y-4 flex-1">
              <div>
                <label className="block text-sm font-medium mb-1 sm:mb-2">
                  Month
                </label>
                <p className="p-2 sm:p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 text-sm sm:text-base">
                  {month}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 sm:mb-2">
                  Payment Date
                </label>
                <p className="p-2 sm:p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 text-sm sm:text-base">
                  {date}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 sm:mb-2">
                  Mode of Payment
                </label>
                <p className="p-2 sm:p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 text-sm sm:text-base">
                  {mode}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 sm:mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 sm:p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm sm:text-base"
                  placeholder="Enter Amount"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 sm:mb-2">
                  Transaction ID
                </label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full p-2 sm:p-3 rounded-lg dark:bg-gray-700 bg-gray-100 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white text-sm sm:text-base"
                  placeholder="Enter Transaction ID"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6">
            <button
              onClick={() => setSelectedOption(null)}
              className="order-2 sm:order-1 px-4 sm:px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="order-1 sm:order-2 px-4 sm:px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full sm:w-auto"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Payment History */}
      <div className="rounded-xl shadow-lg p-4 sm:p-6 dark:bg-gray-800 border dark:border-gray-700 bg-white transition-colors duration-300">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
          <FontAwesomeIcon icon={faList} className="mr-2 text-indigo-600" />
          Payment History
        </h3>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="dark:bg-gray-700 bg-gray-100">
                  <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium">
                    Month
                  </th>
                  <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium">
                    Amount
                  </th>
                  <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium">
                    Status
                  </th>
                  <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-600">
                {getTableRows().map((row) => (
                  <tr key={row.month}>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
                      {row.month}
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
                      {row.amount || "-"}
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          row.status === "Done"
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 animate-pulse"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 text-xs sm:text-sm">
                      {row.date || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentStatus;
