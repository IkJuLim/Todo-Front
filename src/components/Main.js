import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import Calendar from './Calendar';
import Modal from './Modal';
import ProfileModal from './ProfileModal';
import TodoList from './TodoList';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const [items, setItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newItem, setNewItem] = useState({ title: '', dueDate: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
      fetchTodos(token);
      fetchProfile(token);
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate]);

  const fetchTodos = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/api/todo/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.isSuccess) {
        setItems(data.result.todoList);
      } else {
        alert('Todo 조회 실패');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/api/member', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.isSuccess) {
        setProfile(data.result);
      } else {
        alert('회원 정보 조회 실패');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDateClick = (date) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    setSelectedDate(localDate);
    setNewItem({ title: '', dueDate: localDate });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = async () => {
    const token = localStorage.getItem('accessToken');
    const newItemWithDate = { ...newItem, status: false };
    try {
      const response = await fetch('http://localhost:8080/api/todo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItemWithDate),
      });
      const data = await response.json();
      if (data.isSuccess) {
        setItems([...items, data.result]);
        setNewItem({ title: '', dueDate: '' });
        setIsModalOpen(false);
      } else {
        alert('Todo 추가 실패');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateItem = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:8080/api/todo/${newItem.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      const data = await response.json();
      if (data.isSuccess) {
        const updatedItems = items.map((item) =>
          item.id === newItem.id ? data.result : item
        );
        setItems(updatedItems);
        setNewItem({ title: '', dueDate: '' });
        setIsModalOpen(false);
        window.location.reload();
      } else {
        alert('Todo 수정 실패');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:8080/api/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.isSuccess) {
        const filteredItems = items.filter((item) => item.id !== id);
        setItems(filteredItems);
      } else {
        alert('Todo 삭제 실패');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = (item) => {
    const localDate = new Date(item.dueDate).toISOString().split('T')[0];
    setSelectedDate(localDate);
    setNewItem(item);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleViewProfile = () => {
    setIsProfileModalOpen(true);
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://localhost:8080/api/member', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.isSuccess) {
        alert('회원 탈퇴 성공');
        handleLogout();
      } else {
        alert('회원 탈퇴 실패');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
  };

  const handleDeleteAllClick = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`http://localhost:8080/api/todo/all`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.isSuccess) {
        setItems([]);
      } else {
        alert('Todo 상태 변경 실패');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const checkboxEventHandler = async (id) => {
    const token = localStorage.getItem('accessToken');
    const item = items.find((item) => item.id === id);
    try {
      const response = await fetch(`http://localhost:8080/api/todo/status/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: !item.status }),
      });
      const data = await response.json();
      if (data.isSuccess) {
        const updatedItems = items.map((item) =>
          item.id === id ? data.result : item
        );
        setItems(updatedItems);
      } else {
        alert('Todo 상태 변경 실패');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 shadow-md">
        <div className="flex justify-end space-x-4 p-4">
          {isAuthenticated ? (
            <>
              <button 
                onClick={handleViewProfile} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4"
              >
                프로필 보기
              </button>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md py-2 px-4"
              >
                로그아웃
              </button>
            </>
          ) : (
            <button 
              onClick={handleLogin} 
              className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md py-2 px-4"
            >
              로그인
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-grow pt-16">
        <div className="lg:w-7/12 md:w-9/12 sm:w-10/12 mx-auto p-4 overflow-y-auto">
          <WeatherCard />
          <Calendar 
            handleDateClick={handleDateClick}
            currentYear={currentYear}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
          {isAuthenticated && (
            <Modal 
              isModalOpen={isModalOpen}
              handleModalClose={handleModalClose}
              handleInputChange={handleInputChange}
              handleAddItem={handleAddItem}
              handleUpdateItem={handleUpdateItem}
              newItem={newItem}
              selectedDate={selectedDate}
            />
          )}
          <ProfileModal 
            isProfileModalOpen={isProfileModalOpen}
            handleProfileModalClose={handleProfileModalClose}
            profile={profile}
            handleDeleteAccount={handleDeleteAccount}
          />
          {isAuthenticated && (
            <TodoList
              items={items}
              handleEditClick={handleEditClick}
              handleDeleteItem={handleDeleteItem}
              handleDeleteAllClick={handleDeleteAllClick}
              checkboxEventHandler={checkboxEventHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
