import { Button, Checkbox, Form, Icon, Input, message,List } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import '../assets/less/login.less';
import axios from 'axios';

interface ILoginParam {
    username: string;
    password: string;
    remember: boolean;
    passwordList:any;
    showList:boolean
}
interface passwordList {
    name:string;
    pwd:string
}
interface ILoginFormProps extends FormComponentProps, RouteComponentProps {
}

class LoginForm extends React.Component<ILoginFormProps, ILoginParam> {
    state: ILoginParam = {
        username: '',
        password: '',
        remember: true,
        passwordList: this.getPassword(),
        showList:false
    }
// eslint-disable-next-line
    constructor(props: ILoginFormProps) {
        super(props);
    }

    handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    axios.get('/ser/user/login?loginName='+values.username+'&password='+values.password).then((res:any)=>{
                        if(res.data.code==0){
                            message.error('用户名或密码错误');
                        }else{
                            if(values.remember){
                                this.setCookie(values.username,values.password,7);
                            }
                            localStorage.setItem( "name", values.username)
                            localStorage.setItem( "password", values.password)
                            sessionStorage.username = values.username;
                            sessionStorage.password = values.password;
                            this.props.history.push('/');
                            message.success('welcome');
                        }
                    }).catch((err)=>{
                        message.error('服务器错误');
                    })
                } catch (error) {
                    message.error('服务器错误');
                }
            }
        });
    }

    //设置cookie
  setCookie(name:string,value:any,day:number){
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = name + '=' + value + ';expires='+ date;
  };
  //获取cookie
  getCookie(name:string){
    var reg = RegExp(name+'=([^;]+)');
    var arr = document.cookie.match(reg);
    if(arr){
      return arr[1];
    }else{
      return '';
    }
  };

    getPassword(){
        var passwordList:any = []
        if(document.cookie){
            document.cookie.split(';').map((item:any)=>{
                passwordList.push({name:item.split("=")[0].replace(/\s+/g,""),pwd:item.split("=")[1].replace(/\s+/g,"")})
            })
        }
        return passwordList
    }
    showPassword(){
        this.setState({
            showList: true
          });
    }

    chooseList = ()=>{
        if( this.state.showList==true ){
            return (
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.passwordList}
                    renderItem={(item:passwordList) => (
                    <List.Item onClick = {()=>{this.setState({showList:false,password:item.pwd})}}>
                    <Icon type="global" />
                        <List.Item.Meta
                        title={item.name}
                        description={item.pwd}
                        />

                    </List.Item>
                    )}
                />
            )
        }else{
            return <div></div>
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const Vlist = this.chooseList
        return (
            <div className="login-box">
                <div className="login">
                    <div className="login-form-box">
                        <div className="login-logo">
                            <div className="login-name">Daisy</div>
                        </div>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator(`username`, {
                                    initialValue: this.state.username,
                                    rules: [{ required: true, message: '用户名不能为空' }]
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='username' />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <div onClick={()=>this.showPassword()} >
                                {getFieldDecorator(`password`, {
                                    initialValue: this.state.password,
                                    rules: [{ required: true, message: '密码不能为空' }]
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder='password' onChange={()=>this.setState({showList:false})}/>
                                )}
                                </div>
                                <Vlist />
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator(`remember`, {
                                    valuePropName: 'checked',
                                    initialValue: this.state.remember,
                                })(
                                    <Checkbox >Remember Password</Checkbox>
                                )}
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const Login = Form.create()(LoginForm);
export default Login;