import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsBookmark, BsStar, BsTrash } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTodoContext } from "../context/TodoContext";
import AddListModal from "./AddListModal";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const { activeView, setActiveView } = useTodoContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavItemClick = (view) => {
    setActiveView(view);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Navigation links content
  const NavigationLinks = () => (
    <div className="flex-1 overflow-y-auto py-4">
      <div className="px-4 mb-6">
        <button
          onClick={() => setIsAddListModalOpen(true)}
          className="flex items-center w-full py-2 px-3 rounded-md bg-[#106688] text-white hover:bg-[#17526a] transition-colors"
        >
          <AiOutlinePlus className="mr-2" />
          <span>Create List</span>
        </button>
      </div>
      <nav className="space-y-1 px-2">
        <a
          href="#"
          onClick={() => handleNavItemClick("lists")}
          className={`flex items-center px-2 py-2 text-white rounded-md hover:bg-[#106688] ${
            activeView === "lists" ? "bg-[#106688]" : ""
          }`}
        >
          <BsBookmark className="mr-3 size-5" />
          <span>My Lists</span>
        </a>
        <div className="pl-4 mt-2">
          <a
            href="#"
            onClick={() => handleNavItemClick("starred")}
            className={`flex items-center px-2 py-2 text-white rounded-md hover:bg-[#106688] ${
              activeView === "starred" ? "bg-[#106688]" : ""
            }`}
          >
            <BsStar className="mr-3 size-5 text-white" />
            <span>Favorite</span>
          </a>
        </div>
        <a
          href="#"
          onClick={() => handleNavItemClick("deleted")}
          className={`flex items-center px-2 py-2 text-white rounded-md hover:bg-[#106688] ${
            activeView === "deleted" ? "bg-[#106688]" : ""
          }`}
        >
          <BsTrash className="mr-3 size-5" />
          <span>Recently deleted</span>
        </a>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 h-full bg-[#0b3d54]">
          <NavigationLinks />
        </div>
      </div>

      {/* Mobile header and sidebar */}
      <div className="lg:hidden">
        {/* Mobile header */}
        <header className="fixed top-0 left-0 right-0 z-10 bg-[#0B4965] shadow-md">
          <div className="px-4">
            <div className="flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="flex items-center">
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-100 hover:bg-[#0b3d54] hover:text-white focus:outline-none transition-colors"
                >
                  {isMenuOpen ? (
                    <RxCross1 className="size-6" aria-hidden="true" />
                  ) : (
                    <GiHamburgerMenu className="size-6" aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* Logo/Title */}
              <div className="flex flex-1 items-center justify-center">
                <h1 className="text-xl text-white font-bold">To-Do List</h1>
              </div>

              {/* Right side placeholder */}
              <div className="w-10"></div>
            </div>
          </div>
        </header>

        {/* Mobile sidebar as overlay when menu is open */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40">
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-gray-700 bg-opacity-30 backdrop-blur-sm transition-opacity"
              onClick={toggleMenu}
            ></div>

            {/* Sidebar panel */}
            <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-[#0b3d54] overflow-y-auto">
              <div className="p-4 border-b border-[#0a3346]">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-white">Menu</h2>
                  <button
                    onClick={toggleMenu}
                    className="p-1 rounded-md hover:bg-[#0a3346] text-white"
                  >
                    <RxCross1 className="size-5" />
                  </button>
                </div>
              </div>
              <NavigationLinks />
            </div>
          </div>
        )}

        {/* Content padding for mobile header */}
        <div className="h-16"></div>
      </div>

      {/* Add List Modal */}
      <AddListModal
        isOpen={isAddListModalOpen}
        onClose={() => setIsAddListModalOpen(false)}
      />
    </>
  );
};

export default Navigation;
