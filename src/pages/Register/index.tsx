import React, { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('请输入有效的邮箱地址');
      return;
    }
    setEmailError('');
    // 在这里处理注册逻辑，例如向服务器发送注册请求
    console.log('用户名:', username);
    console.log('密码:', password);
    console.log('邮箱:', email);
  };

  return (
    <div>
      <h2>注册</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>用户名:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>密码:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>邮箱:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </div>
        <button type="submit">注册</button>
      </form>
    </div>
  );
}

export default Register;