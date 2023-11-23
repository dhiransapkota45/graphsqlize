import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window?.localStorage?.getItem("token")
      ? navigate("/todo")
      : navigate("/login");
  }, [navigate]);
  return <div></div>;
};

export default Landing;
