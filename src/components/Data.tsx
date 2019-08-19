import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Tables from './topics/Table';
import Tab from './topics/Tabs';
import VForm from './topics/Form';
import NotFound from './NotFound'
import GoodsMsg from './requests/GoodsMsg'

const Data = ()=>{
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    const subnavs = [
        {
            name:'Components',
            children:['Table','Tabs','Form'],
            icon:'menu'
        },
        {
            name:'HttpRequest',
            children:['GoodsMsg'],
            icon:'global'
        }
    ]
    interface NavList{
        name:string | number | undefined;
        children:string[] | null;
        icon:string | undefined
    }
    const nav = (navList:NavList[])=>{
        let navBar = navList.map((value,index)=>{
            return  <SubMenu
                    key={value.name}
                    title={
                        <span>
                            <Icon type={value.icon} />
                           <span>{value.name}</span>
                        </span>
                    }
                    >
                        {value.children?value.children.map((child:any,index:number)=>{
                            return <Menu.Item key={child}>
                              <Link to={"/Data/"+value.name+"/"+child}>{child}</Link>
                              </Menu.Item>
                        }):()=>{console.log('null')}}
                        
                </SubMenu>
        })
        return <Menu
                mode="inline"
                defaultSelectedKeys={[window.location.hash.split('/')[3]]}
                defaultOpenKeys={[window.location.hash.split('/')[2]]}
                style={{ height:'100%'}}
                >{navBar}
                </Menu>

    }
    return (
        <Router>
              <Sider collapsible width={200}  style={{ background:'#fff' }}>
                  {nav(subnavs)}
              </Sider>
              <Layout style={{padding: '0 24px 24px'}}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                      <Breadcrumb.Item>Home</Breadcrumb.Item>
                      <Breadcrumb.Item>{window.location.hash.split('/')[1]}</Breadcrumb.Item>
                      <Breadcrumb.Item>{window.location.hash.split('/')[2]}</Breadcrumb.Item>
                      <Breadcrumb.Item>{window.location.hash.split('/')[3]}</Breadcrumb.Item>
                  </Breadcrumb>
                  <Content
                      style={{
                          padding: 24,
                          margin: 0,
                          minHeight: 280,
                          background:'#fff'
                      }}
                  >
                      <Route path="/Data/Components/Table" component={Tables} />
                      <Route path="/Data/Components/Tabs" component={Tab} />
                      <Route path="/Data/Components/Form" component={VForm} />
                      <Route path="/Data/HttpRequest/GoodsMsg" component={GoodsMsg} />
                      {/* <Route path="/Data/404" component={NotFound} /> */}
                  </Content>
              </Layout>
          </Router>
      );
}

export default Data