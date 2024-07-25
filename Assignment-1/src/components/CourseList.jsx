import React, { useRef, useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import data from "../course-data.json";

function CourseList() {
  const [items, setItems] = useState(data);
  const [popupIndex, setPopupIndex] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const popupRef = useRef();

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (index) => {
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default to allow drop
  };

  const handleDrop = () => {
    const copiedItems = [...items];
    const draggedItemContent = copiedItems.splice(draggedIndex, 1)[0];

    // Insert the dragged item into the new position
    copiedItems.splice(dragOverIndex, 0, draggedItemContent);

    setItems(copiedItems);
    handleDragEnd();
  };

  const moveItem = (index, direction) => {
    const copiedItems = [...items];
    const itemToMove = copiedItems.splice(index, 1)[0];

    if (direction === "up" && index > 0) {
      copiedItems.splice(index - 1, 0, itemToMove); // Move up
    } else if (direction === "down" && index < copiedItems.length - 1) {
      copiedItems.splice(index + 1, 0, itemToMove); // Move down
    } else {
      return; // No move possible, return early
    }

    setItems(copiedItems);
  };

  const deleteItem = (index) => {
    const copiedItems = [...items];
    copiedItems.splice(index, 1); // Remove the item
    setItems(copiedItems);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupIndex(null); // Close the popup
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex items-left justify-center flex-col gap-10 bg-[#d3e2c8] p-2 lg:p-10 relative">
      <h1 className="font-bold text-5xl text-[#4F6F52] drop-shadow text-center">
        Chai aur Code
      </h1>
      <div className="w-4/5 flex items-left flex-col bg-[#f8f6f7] shadow-lg py-5 px-10 rounded-xl">
        <h2 className="text-3xl font-bold text-[#313131]">Manage Bundle</h2>
        <p className="text-base text-[#4B4747] mb-5">
          Change orders of the products based on priority
        </p>
        {items &&
          items.map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
              className={`draggable-item w-full flex flex-row items-left justify-between 
                bg-[#f8f6f7] shadow-md py-3 px-5 rounded-xl my-1 border transition-colors duration-300 
                ${draggedIndex === index ? "opacity-50 bg-gray-100" : ""}
                ${dragOverIndex === index ? "bg-gray-200" : ""}
                hover:shadow-md hover:bg-gray-200`}
            >
              <div className="flex items-center gap-5">
                <PiDotsSixVerticalBold
                  size={30}
                  className="text-[#7F7F7F] cursor-move"
                />
                <img
                  src={item.img}
                  alt="Course Image"
                  className="h-12 rounded-md"
                />
                <h2 className="text-lg font-medium text-[#313131]">
                  {item.title}
                </h2>
              </div>
              <div className="flex items-center justify-center gap-5 relative">
                <p className="text-base">{item.price}</p>
                <p className="text-xs bg-[#DBFFCE] p-1 border border-[#7E7E7E] rounded font-semibold">
                  {item.category}
                </p>
                <BsThreeDotsVertical
                  className="cursor-pointer"
                  onClick={() => {
                    setPopupIndex(index === popupIndex ? null : index);
                  }}
                />
                {popupIndex === index && (
                  <div
                    ref={popupRef}
                    className="popup z-10 absolute top-10 -right-28 bg-[#F7F7F7] border text-sm rounded-md p-2 shadow-lg"
                  >
                    <p
                      className={`flex items-center gap-2 text-xs p-1 hover:bg-gray-200 rounded ${
                        index === 0 ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"
                      }`}
                      onClick={() => moveItem(index, "up")}
                    >
                      <FaArrowUp /> Move Up
                    </p>
                    <p
                      className={`flex items-center gap-2 text-xs p-1 hover:bg-gray-200 rounded ${
                        index === items.length - 1 ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"
                      }`}
                      onClick={() => moveItem(index, "down")}
                    >
                      <FaArrowDown /> Move Down
                    </p>
                    <p
                      className={`flex items-center gap-2 text-xs p-1 hover:bg-gray-200 rounded text-[#FA2D2D] cursor-pointer`}
                      onClick={() => deleteItem(index)}
                    >
                      <RiDeleteBinLine /> Delete
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
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

export default CourseList;