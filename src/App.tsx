import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginPage />} />
        <ProtectedRoute path="/chat" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;