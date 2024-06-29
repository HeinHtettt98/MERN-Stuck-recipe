import NavComponent from "../component/Nav.component";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AuthGard from "../component/guard/AuthGard";

const HomePage = () => {
  return (
    <AuthGard>
      <div>
        <NavComponent />
        <div>
          <Outlet />
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthGard>
  );
};

export default HomePage;
