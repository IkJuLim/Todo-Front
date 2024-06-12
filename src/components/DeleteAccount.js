import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/member`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 'checkPassword': password }),
      });
      const data = await response.json();
      if (data.isSuccess) {
        navigate('/'); // 성공 시 메인 페이지로 리디렉션
        localStorage.clear();
      } else {
        alert('계정 삭제 실패: ' + data.message); // 에러 처리
      }
    } catch (error) {
      console.error('Error:', error);
      alert('계정 삭제 중 오류가 발생했습니다.'); // 에러 처리
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="p-8 w-full max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">비밀번호 수정</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">비밀번호</label>
            <input
              type="password"
              id="toBePassword"
              name="toBePassword"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="passwordCheck" className="block text-gray-600">비밀번호 확인</label>
            <input
              type="password"
              id="toBePasswordCheck"
              name="toBePasswordCheck"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-red-500 hover:red-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
            계정 삭제
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;
