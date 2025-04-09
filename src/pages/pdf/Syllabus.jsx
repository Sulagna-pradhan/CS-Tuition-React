'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faExternalLinkAlt, faCopy, faTimes } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast'

export default function CUExamSyllabusPage() {
  const [selectedPdf, setSelectedPdf] = useState(null)

  const syllabusData = [
    {
      name: 'Semester 1',
      url: 'https://bitlearning.vercel.app/assets/pdf/syllabus/sem%201%20&%202%20syllabus.pdf'
    },
    {
      name: 'Semester 2',
      url: '/pdf/math-sem2.pdf'
    },
    {
      name: 'Semester 3',
      url: '/pdf/phy-hons.pdf'
    },
    {
      name: 'Semester 4',
      url: '/pdf/stats-general.pdf'
    }
  ]

  const handleView = (url) => {
    setSelectedPdf(url)
    toast.success('PDF opened inside viewer.')
  }

  const handleCopy = (url) => {
    navigator.clipboard.writeText(window.location.origin + url)
    toast.success('PDF link copied to clipboard!')
  }

  const handleClose = () => {
    setSelectedPdf(null)
    toast('Closed PDF viewer.')
  }

  return (
    <main className="min-h-screen pt-28 pb-20 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 font-medium shadow mb-6">
            <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
            CU Exam Syllabus
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Download Semester-Wise Syllabus PDFs
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            View and manage all available Semester syllabus PDFs in one place.
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
            <thead className="bg-indigo-100 text-indigo-800">
              <tr>
                <th className="text-left px-6 py-4 text-sm md:text-base font-semibold">PDF Name</th>
                <th className="text-right px-6 py-4 text-sm md:text-base font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {syllabusData.map((pdf, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm md:text-base">{pdf.name}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3 flex-col sm:flex-row sm:items-center">
                      <button
                        onClick={() => handleView(pdf.url)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition shadow-md"
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                        View
                      </button>
                      <button
                        onClick={() => handleCopy(pdf.url)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm px-4 py-2 rounded-lg transition shadow-md"
                      >
                        <FontAwesomeIcon icon={faCopy} className="mr-2" />
                        Copy Link
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PDF Viewer */}
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 md:mt-16"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
              <h3 className="text-xl md:text-2xl font-semibold text-center md:text-left">
                Viewing: {selectedPdf.split('/').pop()}
              </h3>
              <button
                onClick={handleClose}
                className="self-center md:self-auto text-gray-700 hover:text-red-600 bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm transition w-fit"
              >
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                Close
              </button>
            </div>

            <div className="w-full h-[60vh] md:h-[75vh] rounded-xl overflow-hidden shadow-xl border border-gray-300 bg-white">
              <iframe
                src={selectedPdf}
                className="w-full h-full"
                frameBorder="0"
                title="PDF Viewer"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
