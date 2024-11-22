import { BrowserRouter, Routes, Route } from "react-router-dom";
import MessagePage from "./pages/TicketChat";
import Login from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import AdminPage from "./pages/AdminPage";
import PrivateRoute from "./routing/ProtectedRoute";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/adminPage" element={<AdminPage />} />
              <Route path="/chatPage" element={<ChatPage />} />
              <Route path="/messages/:ticketNumber" element={<MessagePage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>

  );
}

export default App;
