import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchProfile(token);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/api/member', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.isSuccess) {
        const { name, nickName, age } = data.result;
        setName(name);
        setNickName(nickName);
        setAge(age);
      } else {
        alert('회원 정보 조회 실패');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch('http://localhost:8080/api/member', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, nickName, age }),
      });
      const data = await response.json();
      if (data.isSuccess) {
        navigate('/'); // 성공 시 메인 페이지로 리디렉션
      } else {
        alert('프로필 업데이트 실패: ' + data.message); // 에러 처리
      }
    } catch (error) {
      console.error('Error:', error);
      alert('프로필 업데이트 중 오류가 발생했습니다.'); // 에러 처리
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="p-8 w-full max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">프로필 수정</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nickName" className="block text-gray-600">NickName</label>
            <input
              type="text"
              id="nickName"
              name="nickName"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-600">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
            프로필 업데이트
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
