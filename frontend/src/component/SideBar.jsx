import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const SideBar = function ({handleCategoryClick,handleCategoryName}) {

  const categories = [
    { categories_id: 4, cat_name: "Programming" },
    { categories_id: 5, cat_name: "Academics" },
  ];
  return (
    <div className="w-[13%] h-dvh pt-16 flex flex-col gap-2 bg-[#2B2D31] p-2">
      <Link to="/">
        <div className="flex gap-2 text-lg text-[#d4d4d5] py-2 px-4 hover:text-white hover:bg-[#35373C] hover:rounded-sm">
          <i className="ri-home-5-fill"></i>home
        </div>
      </Link>
      {categories.map((category) => (
        <div
          key={category.categories_id}
          className="flex gap-2 text-lg text-[#d4d4d5] py-2 px-4 hover:text-white hover:bg-[#35373C] hover:rounded-sm cursor-pointer"
          onClick={() =>  {
            handleCategoryClick(category.categories_id);
            handleCategoryName(category.categories_id);
          }}
        >
          <i
            className={
              category.categories_id === 4
                ? "ri-mac-fill"
                : "ri-book-shelf-fill"
            }
          ></i>
          {category.cat_name}
        </div>
      ))}
    </div>
  );
};

export default SideBar;