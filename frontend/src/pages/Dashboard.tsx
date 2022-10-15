import Loader from "../components/Loader";
import { useSession } from "../context/session";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, isLoggedIn } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!user) {
    return <Loader />;
  }

  return <>Dashboard</>;
};

export default Dashboard;
