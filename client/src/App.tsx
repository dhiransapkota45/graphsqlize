import Login from "./components/Login";
import { useEffect, useMemo } from "react";
import Signup from "./components/Signup";
import Todo from "./components/Todo";
import { jwtDecode } from "jwt-decode";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import PageNotfound from "./components/PageNotfound";
import { ApolloProvider } from "@apollo/client";
import { instance } from "./grapql/instance";
import { useLocation } from "react-router-dom";

function App() {
  const locationhook = useLocation();

  // const decode = useMemo(() => {
  //   try {
  //     if (localStorage.getItem("token")) {
  //       return jwtDecode(localStorage.getItem("token") ?? "");
  //     } else {
  //       return null;
  //     }
  //   } catch (error) {
  //     return null;
  //   }
  // }, [localStorage.getItem("token")]);

  useEffect(() => {
    if (locationhook.pathname !== "/login") {
      const token = localStorage.getItem("token") ?? "";
      if (!token) {
        localStorage.clear();
        location.href = "/login";
      }
      const isTokenValid = jwtDecode(token);
      if (!isTokenValid) {
        localStorage.clear();
        location.href = "/login";
      }
    }
  }, []);
  return (
    <ApolloProvider client={instance}>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotfound />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
