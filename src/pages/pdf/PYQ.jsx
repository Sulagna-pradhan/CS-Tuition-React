'use client'

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faCopy,
  faDownload,
  faEye,
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'

const data = {
  'DSA': [
    { name: 'DSA PYQ 2020', url: '/pdfs/dsa/2020.pdf' },
    { name: 'DSA PYQ 2021', url: '/pdfs/dsa/2021.pdf' },
    { name: 'DSA PYQ 2022', url: '/pdfs/dsa/2022.pdf' },
    { name: 'DSA PYQ 2023', url: '/pdfs/dsa/2023.pdf' },
  ],
  'Digital Logic': [
    { name: 'Digital Logic PYQ 2020', url: '/pdfs/dl/2020.pdf' },
    { name: 'Digital Logic PYQ 2021', url: '/pdfs/dl/2021.pdf' },
    { name: 'Digital Logic PYQ 2022', url: '/pdfs/dl/2022.pdf' },
    { name: 'Digital Logic PYQ 2023', url: '/pdfs/dl/2023.pdf' },
  ],
  'Architecture': [
    { name: 'Architecture PYQ 2020', url: '/pdfs/arch/2020.pdf' },
    { name: 'Architecture PYQ 2021', url: '/pdfs/arch/2021.pdf' },
    { name: 'Architecture PYQ 2022', url: '/pdfs/arch/2022.pdf' },
    { name: 'Architecture PYQ 2023', url: '/pdfs/arch/2023.pdf' },
  ],
  'Operating System': [
    { name: 'OS PYQ 2021', url: '/pdfs/os/2021.pdf' },
    { name: 'OS PYQ 2022', url: '/pdfs/os/2022.pdf' },
  ],
  'Computer Networks': [
    { name: 'CN PYQ 2021', url: '/pdfs/cn/2021.pdf' },
    { name: 'CN PYQ 2022', url: '/pdfs/cn/2022.pdf' },
  ],
  'DBMS': [
    { name: 'DBMS PYQ 2021', url: '/pdfs/dbms/2021.pdf' },
    { name: 'DBMS PYQ 2022', url: '/pdfs/dbms/2022.pdf' },
  ],
  'Software Engineering': [
    { name: 'SE PYQ 2021', url: '/pdfs/se/2021.pdf' },
    { name: 'SE PYQ 2022', url: '/pdfs/se/2022.pdf' },
  ]
}

export default function CUPreviousYearPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleView = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    toast.success('PDF opened in new tab!')
  }

  const handleCopy = (url) => {
    navigator.clipboard.writeText(window.location.origin + url)
    toast.success('Link copied to clipboard!')
  }

  const handleDownload = (url) => {
    const a = document.createElement('a')
    a.href = url
    a.download = url.split('/').pop()
    a.click()
    toast.success('Download started!')
  }

  const filteredSubjects = Object.entries(data).filter(([subject]) =>
    subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-[#f0f4f8] via-[#e2e8f0] to-[#cbd5e1] text-gray-900">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-200 text-blue-800 font-medium shadow mb-6">
            <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
            CU Previous Year Question Papers
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Subject-wise Previous Year Questions</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Year-wise PDFs for each subject with quick actions.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-full py-2 px-5 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Tables for Filtered Subjects */}
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map(([subject, pdfs]) => (
            <div key={subject} className="mb-12">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">{subject}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden text-left">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-3">PDF Name</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pdfs.map((pdf, index) => (
                      <tr key={index} className="border-b hover:bg-gray-100 transition-all">
                        <td className="px-6 py-4 font-medium">{pdf.name}</td>
                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => handleView(pdf.url)}
                            className="px-3 py-1.5 text-sm bg-green-600 hover:bg-green-500 text-white rounded-lg"
                          >
                            <FontAwesomeIcon icon={faEye} className="mr-1" />
                            View
                          </button>
                          <button
                            onClick={() => handleCopy(pdf.url)}
                            className="px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg"
                          >
                            <FontAwesomeIcon icon={faCopy} className="mr-1" />
                            Copy Link
                          </button>
                          <button
                            onClick={() => handleDownload(pdf.url)}
                            className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
                          >
                            <FontAwesomeIcon icon={faDownload} className="mr-1" />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg mt-16">
            No subjects found matching your search.
          </p>
        )}
      </div>
    </main>
  )
}
