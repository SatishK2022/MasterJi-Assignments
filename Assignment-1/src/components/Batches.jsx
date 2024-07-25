import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import data from "../batches-data.json";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function Batches() {
  const [batchData, setBatchData] = useState(data);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const filteredData = data.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
    setBatchData(filteredData);
    setCurrentPage(1); // Reset to first page on search
  }, [search, data]);

  // Calculate total pages
  const totalPages = Math.ceil(batchData.length / rowsPerPage);

  // Get current data
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = batchData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on change
  };

  return (
    <div className="min-h-screen w-full flex items-left justify-center flex-col gap-10 bg-[#e3bae9] p-2 lg:p-10 relative">
      <h1 className="font-bold text-5xl text-[#444B79] drop-shadow text-center">
        Chai aur Code
      </h1>
      <div className="w-4/5 flex items-left flex-col bg-[#f8f6f7] shadow-lg py-5 px-10 rounded-xl">
        <h2 className="text-3xl font-bold text-[#313131]">Batches</h2>
        <p className="text-base text-[#4B4747] mb-5">
          Create learner's batch and share information at the same time.
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 py-2 rounded-md border border-[#BEBEBE] outline-none focus:ring-1 focus:ring-[#6C6BAF] focus:border-[#6C6BAF]"
          />
          <button className="bg-[#6C6BAF] text-white px-5 py-2 rounded-md">
            Search
          </button>
        </div>
        {currentItems && currentItems.length > 0 ? (
          <table className="w-full mt-5 border border-black border-collapse text-[#4B4747]">
            <thead className="bg-[#f3f3f3]">
              <tr className="text-left">
                <th className="py-2 px-4 border-r border-b border-black">Title</th>
                <th className="py-2 px-4 border-r border-b border-black">Start Date</th>
                <th className="py-2 px-4 border-r border-b border-black">End Date</th>
                <th className="py-2 px-4 border-r border-b border-black">Price</th>
                <th className="py-2 px-4 border-r border-b border-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 border-r border-black flex gap-2">
                    <img src={item.img} alt={item.title} className="w-20 rounded-md" />
                    <span>{item.title}</span>
                  </td>
                  <td className="py-3 px-4 border-r border-black">{item.startDate}</td>
                  <td className="py-3 px-4 border-r border-black">{item.endDate}</td>
                  <td className="py-3 px-4 border-r border-black">{item.price}</td>
                  <td className="py-3 px-4 border-r border-black text-sm font-medium">
                    {item.status === "published" ? (
                      <span className="bg-[#DEFFDE] border border-[#4ED04B] rounded px-2 py-1">
                        {item.status}
                      </span>
                    ) : (
                      <span className="bg-[#F3F3F3] border border-[#A4A4A4] rounded px-2 py-1">
                        {item.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-16 text-2xl font-semibold">No data found</p>
        )}
        <div className="w-full flex items-center justify-end text-[#4B4747] py-5">
          <div className="flex items-center gap-4 px-5 select-none">
            <p>Rows per page</p>
            <select
              className="px-2 py-1 rounded-md border border-[#BEBEBE]"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            <FaAngleLeft
              size={25}
              className={`${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black cursor-pointer"}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            />
            <FaAngleRight
              size={25}
              className={`${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-black cursor-pointer"}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            />
            <span>
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>
      </div>
      <a
        href="https://chaicode.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-24 absolute bottom-5 right-5"
      >
        <img src={logo} alt="Logo" className="rounded-md" />
      </a>
    </div>
  );
}

export default Batches;