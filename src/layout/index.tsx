import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return <div className="relative w-screen h-screen flex flex-col items-center">
    <Header />
    <div className="w-full flex-1 h-[calc(100vh-74px)] overflow-x-visible overflow-y-auto ">
      <Outlet />
    </div>
  </div>
}

export default Layout;