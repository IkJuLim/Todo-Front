import React from 'react';

const Modal = ({
  isModalOpen,
  handleModalClose,
  selectedDate,
  newItem,
  handleInputChange,
  handleAddItem,
  handleUpdateItem
}) => {
  if (!isModalOpen) return null;

  return (
    <div id="myModal" className="modal fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Todo</p>
            <button onClick={handleModalClose} className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring">✕</button>
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newItem.title}
              onChange={handleInputChange}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="date"
              name="dueDate"
              placeholder="Due Date"
              value={newItem.dueDate}
              onChange={handleInputChange}
              className="border p-2 mb-2 w-full"
            />
          </div>
          {newItem.id ? (
            <button
              onClick={handleUpdateItem}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAddItem}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
