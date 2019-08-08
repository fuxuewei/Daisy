import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Tabel from '../components/topics/Tabel';

const Home: React.FC = () => {
    interface Person{
        name:string | null;
    }
    interface NavList{
        name:string | null;
        children:string[] | null;
        icon:string | undefined
    }
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    const Greeter = (person: Person) =>{
        return "Hello, " +person.name + "!";
    }
    const menu = (
        <Menu>
          <Menu.Item key="0">
            <a href="https://github.com/fuxuewei">gitHub</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="1">
            <a href="https://juejin.im/user/5d070e336fb9a07f0052dae6">juejin</a>
          </Menu.Item>
        </Menu>
    );
    const nav = (navList:NavList[])=>{
        let navBar = navList.map((value,index)=>{
            return  <SubMenu
                    key={'sub'+index}
                    title={
                        <span>
                            <Icon type={value.icon} />
                           {value.name}
                        </span>
                    }
                    >
                        {value.children?value.children.map((child:any,index:number)=>{
                            return <Menu.Item key={child}>{child}</Menu.Item>
                        }):()=>{console.log('null')}}
                        
                </SubMenu>
        })
        return <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height:'100%',background:'#fff'}}
                >{navBar}
                </Menu>

    }
    let user = {name: localStorage.getItem("name")};
    let subnavs = [
        {
            name:'Components',
            children:['Table','Tabs','Form'],
            icon:'menu'
        },
        {
            name:'HttpRequest',
            children:['GoodsList'],
            icon:'global'
        }
    ]
    
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px'}}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                    <Menu.Item key="4" style={{ float:'right' }}>
                        <Icon type="user" style={{ float:'left',lineHeight:'64px'}}/>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link" href="#" style={{color:'#fff'}}>
                            {Greeter(user)} <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                </Menu>
            </Header>
        <Layout>
            <Sider width={200} style={{ background:'#fff' }}>
                {nav(subnavs)}
            </Sider>
            <Layout style={{padding: '0 24px 24px'}}>
                <Route path="/tabel" component={Tabel} />
            </Layout>
        </Layout>
        </Layout>
    );
}

export default Home;