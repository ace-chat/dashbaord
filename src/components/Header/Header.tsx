import logo from "@/assets/header_logo.png";
import { pxToVw } from "@/utils";
import { Layout } from "antd";

const Header = () => {
  return <Layout.Header>
    <div className={'w-full h-full flex items-center flex-row'}>
      <img src={logo} alt="logo" style={{ width: pxToVw(42), height: pxToVw(28), objectFit: "contain" }}  />
      <div className='text-bold' style={{ color: "white", fontSize: pxToVw(24), marginLeft: pxToVw(15)}}>ACE</div>
      <div></div>
    </div>
  </Layout.Header>
}

export default Header 