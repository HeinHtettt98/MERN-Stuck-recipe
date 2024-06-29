import React from "react";
import { Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/" element={<HomePage />}>
          <Route path="" element={<ReceipesHome />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="recipe/:id" element={<RecipeDetail />} />
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
