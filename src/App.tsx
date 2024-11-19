import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import ProtectedRoute from "./routing/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/AdminLogin"  element={<AdminLogin />} />
        <Route path="/AdminPage"  element={<AdminPage />} />
      </Routes>
        <ProtectedRoute>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/chat" element={<Outlet />}>
              <Route index element={<ChatPage />} />
              <Route path="history" element={<ChatPage />} />
            </Route>
          </Routes>
        </ProtectedRoute>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
