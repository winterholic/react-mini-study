import { useEffect } from 'react';
import './App.css';
import Home from './pages/home/Home';
import Blog from './pages/blog/Blog';
import WritePost from './pages/blog/WritePost';
import ComponentPage from './pages/component/ComponentPage';
import Shopping from './pages/shopping/Shopping';
import LoveHelper from './pages/lovehelper/LoveHelper';
import MemeMeme from './pages/meme/MemeMeme';
import FMNetherlands from './pages/fmnetherlands/FMNetherlands';
import Login from './pages/login/Login';
import { isAuthenticated } from './utils/auth';

function App() {
  const path = typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    if (path === "/login") {
      return;
    }

    if (!isAuthenticated()) {
      window.location.href = "/login";
    }
  }, [path]);

  if (path === "/login") {
    return <Login />;
  }

  if (!isAuthenticated()) {
    return null;
  }

  if (path === "/blog/write") {
    return (
      <div className="App">
        <WritePost />
      </div>
    );
  }

  if (path.startsWith("/shopping")) {
    return (
      <div className="App">
        <Shopping />
      </div>
    );
  }

  if (path.startsWith("/blog")) {
    return (
      <div className="App">
        <Blog />
      </div>
    );
  }

  if (path.startsWith("/component")) {
    return (
      <div className="App">
        <ComponentPage />
      </div>
    );
  }

  if (path.startsWith("/lovehelper")) {
    return (
      <div className="App">
        <LoveHelper />
      </div>
    );
  }

  if (path.startsWith("/meme")) {
    return (
      <div className="App">
        <MemeMeme />
      </div>
    );
  }

  if (path.startsWith("/netherlands")) {
    return (
      <div className="App">
        <FMNetherlands />
      </div>
    );
  }

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
