import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faDownload, faClipboardList } from "@fortawesome/free-solid-svg-icons"; // Import specific icons

const RecentlyAdded = () => {
  const recentPapers = [
    {
      name: "GATE CSE 2024",
      subject: "Computer Science",
      date: "2024-02-10",
      downloads: 8420,
    },
    {
      name: "NEET 2023",
      subject: "Biology, Chemistry, Physics",
      date: "2023-05-07",
      downloads: 45290,
    },
    {
      name: "CBSE Class 10 Mathematics",
      subject: "Mathematics",
      date: "2024-03-11",
      downloads: 32145,
    },
    {
      name: "JEE Advanced 2023",
      subject: "Physics, Chemistry, Mathematics",
      date: "2023-06-04",
      downloads: 28760,
    },
    {
      name: "UPSC Prelims 2023",
      subject: "General Studies",
      date: "2023-05-28",
      downloads: 19850,
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div>

            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium mb-4">
                <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
                Added Paper
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Recently Added
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Latest question papers added to our collection
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <a
              href="#"
              className="inline-flex items-center text-base font-medium text-indigo-600 hover:text-indigo-800"
            >
              See all recent papers{" "}
              <FontAwesomeIcon icon={faDownload} className="ml-1 text-xs" />
            </a>
          </div>
        </div>

        <div className="mt-8 overflow-hidden">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Paper Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Subject
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date Added
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Downloads
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Download</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentPapers.map((paper, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {paper.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {paper.subject}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(paper.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            {paper.downloads.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <FontAwesomeIcon icon={faDownload} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentlyAdded;