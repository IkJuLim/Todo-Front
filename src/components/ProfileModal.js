import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileModal = ({ isProfileModalOpen, handleProfileModalClose, profile, handleDeleteAccount }) => {
  const navigate = useNavigate();

  if (!isProfileModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">프로필</h2>
        <div className="mb-4">
          <p><strong>이름:</strong> {profile.name}</p>
          <p><strong>닉네임:</strong> {profile.nickName}</p>
          <p><strong>나이:</strong> {profile.age}</p>
        </div>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={() => navigate('/edit-profile')} 
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md py-2 px-4"
          >
            회원 정보 수정
          </button>
          <button 
            onClick={() => navigate('/edit-password')} 
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md py-2 px-4"
          >
            비밀번호 수정
          </button>
          <button 
            onClick={handleDeleteAccount} 
            className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md py-2 px-4"
          >
            계정 삭제
          </button>
          <button 
            onClick={handleProfileModalClose} 
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md py-2 px-4"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
