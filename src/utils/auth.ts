import usersData from '../data/users.json';

const TOKEN_KEY = 'auth_token';

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
}

export const login = (username: string, password: string): { success: boolean; token?: string; user?: User; error?: string } => {
  const user = usersData.find(u => u.username === username && u.password === password);

  if (user) {
    const token = generateToken(user);
    const userInfo: User = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email
    };

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('user', JSON.stringify(userInfo));

    return { success: true, token, user: userInfo };
  }

  return { success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' };
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token;
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

const generateToken = (user: { id: number; username: string }): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    username: user.username,
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  }));
  const signature = btoa('fake-signature-for-demo');

  return `${header}.${payload}.${signature}`;
};
