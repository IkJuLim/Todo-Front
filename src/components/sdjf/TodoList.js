import React from 'react';

const TodoList = ({ items, checkboxEventHandler, handleEditClick, handleDeleteAllClick, handleDeleteItem }) => {
  return (
    <div className="overflow-y-auto max-h-96">
      <div className="flex">
        <h2 className="text-2xl font-bold mt-8 mb-4 mr-5">Todo List</h2>
        <button
          onClick={handleDeleteAllClick}
          className="bg-red-500 text-white mt-8 mb-4 px-4 py-2 rounded-lg hover:bg-red-700"
        > 
          Delete All
        </button>
      </div>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={item.status}
                onChange={() => checkboxEventHandler(item.id)}
                className="mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-500 text-sm">Date: {item.dueDate}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditClick(item)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteItem(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
