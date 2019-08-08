import React from 'react';
import { Layout,Breadcrumb } from 'antd';
const { Header, Content, Sider } = Layout;

const Tabel: React.FC = () => {
return (
    <Layout>
    <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>
    <Content
        style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
        }}
    >
        xxxx
    </Content>
    </Layout>
)
}
export default Tabel