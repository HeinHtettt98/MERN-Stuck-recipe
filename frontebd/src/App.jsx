import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./page/Home.page";
import CreatePage from "./page/Create.page";
import Register from "./page/RegisterPage";
import ReceipesHome from "./page/ReceipesHome.page";
import SignInPage from "./page/SignInPage";
import RecipeDetail from "./page/RecipeDetail";
import ProfilePage from "./page/profile/ProfilePage";
import UplodePage from "./page/profile/tool/UplodePage";
import MyRecipe from "./page/profile/tool/MyRecipe";
import SavedPage from "./page/profile/tool/SavedPage";
import Admin from "./page/Admin";
import { useAuthQuery } from "./store/service/UserEndpoint";
import { useDispatch, useSelector } from "react-redux";
import { getInform } from "./store/slice/userSlice";

const App = () => {
  const { data, error, isError } = useAuthQuery();
  const { _id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(getInform(data));
    }
  }, [data, error]);
  const ProtectedRecipeDetail = ({ _id }) => {
    if (!_id) {
      return <Navigate to="/" replace />;
    }

    return <RecipeDetail />;
  };

  return (
    <div className="">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/" element={<HomePage />}>
          <Route path="" element={<ReceipesHome />} />
          <Route path="create" element={_id == "" ? <Navigate to="/" replace /> : <CreatePage />} />
          <Route path="recipe/:id"   element={_id == "" ? <Navigate to="/" replace /> : <RecipeDetail />} />
          <Route path="user/profile/" element={<ProfilePage />}>
            <Route path="" element={<MyRecipe />} />
            <Route path="uplode" element={<UplodePage />} />
            <Route path="admin" element={<Admin />} />
            <Route path="saved" element={<SavedPage />} />
          </Route>
        </Route>

        {/* <Route path="/" element={<HomePage />} />
         */}
      </Routes>
    </div>
  );
};

export default App;
