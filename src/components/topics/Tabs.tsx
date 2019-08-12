import React from 'react';
import { Layout,Tabs,Icon } from 'antd';

const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;

const callback = (key:number|string)=>{
    console.log(key)
}
const Tab:React.FC = ()=>{
    return (
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab={
                    <span>
                        <Icon type="apple" />
                        Apple
                    </span>
                    } key="1">
                Content of Tab Pane 1
                </TabPane>
                <TabPane tab={
                    <span>
                    <Icon type="android" />
                    Android
                    </span>
                } key="2">
                Content of Tab Pane 2
                </TabPane>
            </Tabs>
    )
}

export default Tab