
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./UserLayout.css";

const { Content } = Layout;
export default function AppContainer(): JSX.Element {
  return (
    <Layout className="page-user">
      <Content className="content">
        <Outlet />
      </Content>
    </Layout>
  );
}
