import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [age, setAge] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    const usernamePattern = /^.{7,25}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,30}$/;
    const namePattern = /^[A-Za-z가-힣]+$/;
    const nickNamePattern = /^.{2,}$/;

    if (!username || !usernamePattern.test(username)) {
      errors.username = "아이디는 7~25자 내외로 입력해주세요";
    }
    if (!password || !passwordPattern.test(password)) {
      errors.password = "비밀번호는 8~30 자리이면서 1개 이상의 알파벳, 숫자, 특수문자를 포함해야합니다.";
    }
    if (!name || !namePattern.test(name)) {
      errors.name = "사용자 이름은 한글 또는 알파벳만 입력해주세요.";
    }
    if (!nickName || !nickNamePattern.test(nickName)) {
      errors.nickName = "닉네임이 너무 짧습니다.";
    }
    if (age < 0 || age > 150) {
      errors.age = "나이는 0에서 150 사이여야 합니다.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/member/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, name, nickName, age }),
      });
      const data = await response.json();
      if (data.isSuccess) {
        navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
      } else {
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="p-8 w-full max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">회원가입</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="nickName" className="block text-gray-600">닉네임</label>
            <input
              type="text"
              id="nickName"
              name="nickName"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
            {errors.nickName && <p className="text-red-500 text-sm">{errors.nickName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-600">나이</label>
            <input
              type="number"
              id="age"
              name="age"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">회원가입</button>
        </form>
        <div className="mt-6 text-blue-500 text-center">
          <a href="/login" className="hover:underline">계정이 있으신가요?</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
