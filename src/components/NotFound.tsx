import React from 'react';
import { Layout} from 'antd';
const { Content } = Layout;

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