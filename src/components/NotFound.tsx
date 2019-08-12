import React from 'react';
import { Layout,Breadcrumb } from 'antd';
const { Header, Content, Sider } = Layout;

const NotFound: React.FC = () => {
return (
    <Layout>
        <Content
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background:'#fff'
            }}
        >
            404 notfound
        </Content>
    </Layout>
)
}
export default NotFound