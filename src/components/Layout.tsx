import React from 'react';
import { Drawer,Affix,Button,Tabs } from 'antd';
import '../assets/less/carousel.less';

const { TabPane } = Tabs;
const callback = (key:string) => {
    console.log(key);
}
const Layout = ()=>{
    return <div  className="drop-console">
            <div className="drop_operation">
                <div className="operation_button" >
                    <Affix offsetBottom={0}>
                        <Button
                            type="primary"
                        >
                            组件库
                        </Button>
                    </Affix>
                </div>
                <div className="operation_button">
                    <Button
                        type="primary"
                    >
                    </Button>
                </div>
                <div className="operation_button">
                    <Button
                        type="primary"
                    >
                        保存修改
                    </Button>
                </div>
            </div>
            <Drawer
                height ={450}
                placement="bottom"
                closable={false}
                mask = {false}
            >
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Layout" key="1">
                    </TabPane>
                    <TabPane tab="Components" key="2">
                    </TabPane>
                </Tabs>
            </Drawer>
    </div>
}
export default Layout