import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordForm = () => {
  const [checkPassword, setCheckPassword] = useState('');
  const [toBePassword, setToBePassword] = useState('');
  const [toBePasswordCheck, setToBePasswordCheck] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    if(toBePassword !== toBePasswordCheck){
      alert("비밀번호가 서로 일치하지 않습니다.");
    }
    else{
      try {
        const response = await fetch('http://localhost:8080/api/member/password', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ checkPassword, toBePassword }),
        });
        const data = await response.json();
        if (data.isSuccess) {
          navigate('/'); // 성공 시 메인 페이지로 리디렉션
        } else {
          alert('비밀번호 업데이트 실패: ' + data.message); // 에러 처리
        }
      } catch (error) {
        console.error('Error:', error);
        alert('비밀번호 업데이트 중 오류가 발생했습니다.'); // 에러 처리
      }
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="p-8 w-full max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">프로필 수정</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="checkPassword" className="block text-gray-600">CheckPassword</label>
            <input
              type="password"
              id="checkPassword"
              name="checkPassword"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="toBePassword" className="block text-gray-600">ToBePassword</label>
            <input
              type="password"
              id="toBePassword"
              name="toBePassword"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={toBePassword}
              onChange={(e) => setToBePassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="toBePasswordCheck" className="block text-gray-600">ToBePasswordCheck</label>
            <input
              type="password"
              id="toBePasswordCheck"
              name="toBePasswordCheck"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={toBePasswordCheck}
              onChange={(e) => setToBePasswordCheck(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
            비밀번호 업데이트
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordForm;
