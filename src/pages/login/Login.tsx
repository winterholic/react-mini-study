import { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { login } from '../../utils/auth';
import { media } from '../../styles/media';

const LoginPageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;
`;

const LoginCard = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 420px;
  overflow: hidden;
`;

const LoginHeader = styled.div`
  background: #fff;
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;

  ${media.tablet`
    padding: 2.5rem;
  `}
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1rem;
`;

const LogoImage = styled.img`
  border-radius: 8px;
`;

const LogoText = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0;
`;

const LoginTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;

  ${media.tablet`
    font-size: 1.5rem;
  `}
`;

const LoginForm = styled.form`
  padding: 2rem;

  ${media.tablet`
    padding: 2.5rem;
  `}
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ErrorMessage = styled.div`
  background-color: #fef2f2;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  border-left: 4px solid #dc2626;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const InfoText = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
`;

const TestCredentials = styled.div`
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;

  strong {
    color: #374151;
    display: block;
    margin-bottom: 0.5rem;
  }

  code {
    background-color: #fff;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    color: #667eea;
    font-family: 'Courier New', monospace;
  }
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = login(username, password);

      if (result.success) {
        window.location.href = '/';
      } else {
        setError(result.error || '로그인에 실패했습니다.');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <LoginPageWrapper>
      <LoginCard>
        <LoginHeader>
          <LogoWrapper>
            <LogoImage src="/VOIDDOT.svg" alt="VOID." width={42} height={42} />
            <LogoText>VOID.</LogoText>
          </LogoWrapper>
          <LoginTitle>로그인</LoginTitle>
        </LoginHeader>

        <LoginForm onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FormGroup>
            <Label htmlFor="username">아이디</Label>
            <Input
              id="username"
              type="text"
              placeholder="아이디를 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </FormGroup>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </LoginButton>

          <TestCredentials>
            <strong>테스트 계정:</strong>
            ID: <code>admin</code> / PW: <code>admin123</code><br />
            ID: <code>test</code> / PW: <code>test123</code><br />
            ID: <code>user</code> / PW: <code>user123</code>
          </TestCredentials>

          <InfoText>
            © 2025 VOID. All rights reserved.
          </InfoText>
        </LoginForm>
      </LoginCard>
    </LoginPageWrapper>
  );
};

export default Login;
