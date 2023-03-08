import React from "react";

const Navbar = () => {

  const swip = () => {
  
  }
  return (
    <nav className="bg-[#171C2A] py-4">
      <div className="navBar">
        <a href="">
          <img src="./images/logo.png" alt="LWS" className="max-w-[140px]" />
        </a>

        <div className="flex gap-4">
          <a href="#home" className="navHome" id="lws-home">
            {" "}
            Home{" "}
          </a>
          <a className="navCart" id="lws-cart">
            <i className="text-xl fa-sharp fa-solid fa-bag-shopping"></i>
            <span id="lws-totalCart" onClick={swip}>0</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
