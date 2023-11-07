import logo from "@/assets/logo.png";
import { Layout } from "antd";

const Header = () => {
  return <Layout.Header>
    <div className={'w-full h-full flex items-center justify-between'}>
      <img className={'w-120 h-22'} src={logo} alt="logo" />
      <div></div>
    </div>
  </Layout.Header>
}

export default Header