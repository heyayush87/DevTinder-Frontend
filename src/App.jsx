import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from "./Component/Body";
import Login from "./Component/Login";
import Profile from "./Component/Profile";
import { Provider } from 'react-redux';
import Store from './utils/Store';
import Feed from './Component/Feed';
export default function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
