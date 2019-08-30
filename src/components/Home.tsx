import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Dropdown } from 'antd';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import HomePage from './topics/HomePage'
import Data from './Data';
import Img from './Img';
import { message } from 'antd';
import Test from './Test'
import '../assets/less/home.less';

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
            <a href="https://github.com/fuxuewei"><Icon type="github"/><span className="icon">gitHub</span></a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="1">
            <a href="https://juejin.im/user/5d070e336fb9a07f0052dae6"><Icon type="solution" /><span className="icon">juejin</span></a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="2">
            <a href="/" onClick={()=>{localStorage.removeItem('name');message.success('Successful exit');}}><Icon type="logout" /><span className="icon">Exit</span></a>
          </Menu.Item>
        </Menu>
    );
    
    let user = {name: localStorage.getItem("name")};
    const navList = [
        {name:'Data'},
        {name:'Carousel'},
        {name:'Test'}
    ]
    return (
      <Router>
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[window.location.hash.split('/')[1] ? window.location.hash.split('/')[1] :  '0']}
                style={{ lineHeight: '64px'}}
                >
                    <Menu.Item key="0">
                        <Link to={"/"}><Icon type="home" /></Link>
                    </Menu.Item>
                    {navList.map((item,index)=>{
                        return <Menu.Item key={item.name ? item.name : '0'}>
                            <Link to={"/"+item.name}>{item.name}</Link>
                        </Menu.Item>
                    })}
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
            {/* exact 精确匹配 */}
            <Route path="/Data" component={Data} />
            <Route exact path="/Carousel" component={Img} />
            <Route exact path="/Test" component={Test} />
            <Route exact path="/" component={HomePage} />
        </Layout>
        </Layout>
        </Router>
    );
}
export default Home;