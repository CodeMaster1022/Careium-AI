import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import MessagePage from "./pages/TicketChat";
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
          {/* Public Routes */}
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/messages/:ticketNumber" element={<MessagePage />} />
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route index element={<ChatPage />} />
            <Route path="history" element={<ChatPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
