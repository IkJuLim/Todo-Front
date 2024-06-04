import React, { useState } from 'react';
import 'flowbite';

const TodoList = ({ pageSize, setPageSize, totalSize, sorteBy, setSorteBy, handleSortByChange, items, checkboxEventHandler, handleEditClick, handleDeleteAllClick, handleDeleteItem, Button }) => {
  const pageNumbers = [];
  const pageSizes = [5, 10, 20, 50, 100];
  const sortTypes = ["Decrease : Create At", "Increase : Create At", "Decrease : Title", "Increase : Title", "Decrease : Due Date", "Increase : Due Date"];
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentItems = items.slice(indexOfFirstPost, indexOfLastPost);

  for(let i = 1; i <= Math.ceil(totalSize / pageSize); i++){
    pageNumbers.push(i);
  }


  return (
    <div className="overflow-y-auto">
      <h2 className="text-2xl font-bold mt-8 mb-4 mr-5">Todo List</h2>
      <button
        onClick={handleDeleteAllClick}
        className="bg-red-500 text-white mt-8 mb-4 px-4 py-2 rounded-lg hover:bg-red-700 mr-2"
      > 
        Delete All
      </button>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>

      <button id="dropdownDelayButton" data-dropdown-toggle="pageSize" data-dropdown-delay="500" data-dropdown-trigger="hover" class="text-gray-700 bg-gray-100 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2 ml-2" type="button">
        Page Size
        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <div id="pageSize" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
          {pageSizes.map(toBePageSize => (
              <li key={toBePageSize} className="page-item">
                <a onClick={() => setPageSize(toBePageSize)} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {toBePageSize}개
                </a>
              </li>
            ))}
        </ul>
      </div>

      <button id="dropdownDelayButton" data-dropdown-toggle="sortDropdown" data-dropdown-delay="500" data-dropdown-trigger="hover" class="text-gray-700 bg-gray-100 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2 ml-2" type="button">
        Sort By
        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <div id="sortDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
          {sortTypes.map(sortType => (
              <li key={sortType} className="page-item">
                <a onClick={() => handleSortByChange(sortType)} class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {sortType}
                </a>
              </li>
            ))}
        </ul>
      </div>
      <ul className="space-y-4">
        {currentItems.map((item) => (
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
      <nav aria-label="Page navigation example" className="grid place-items-center mt-5">
        <ul className="pagenation" class="inline-flex -space-x-px text-base h-10"><li>
            <a onClick={() => setCurrentPage(currentPage - 1)} class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
          </li>
          {pageNumbers.map(number => (
            <li key={number} className="page-item">
              <a onClick={() => setCurrentPage(number)} className="page-link" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {number}
              </a>
            </li>
          ))}
          <li>
            <a onClick={() => setCurrentPage(currentPage + 1)} class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TodoList;
