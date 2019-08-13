import React, {useState} from 'react';
import { Layout,Tabs,Icon,Modal,Button,Form,Input } from 'antd';

const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;



const Tab:React.FC = ()=>{
    const [tabs,setTabs] = useState([
        {name:'Apple',content:'Content of Tab Pane 1',type:"apple"},
        {name:'Android',content:'Content of Tab Pane 2',type:'android'},
    ])
    const [defaultActiveKey,setDefaultActiveKey]=useState("0")
    const [visible,setVisible]=useState(false)
    const handleCancel = (e:any) => {
        console.log(e);
        setVisible(false)
      };
    const handleOk = (e:any) => {
        console.log(e);
        setVisible(false)
    };
    const callback = (key:number|string)=>{
        console.log(key)
    }
    function AddForm(props:any){
        const { getFieldDecorator } = props.form;
        const handleSubmit = (e:any) => {
            e.preventDefault();
            props.form.validateFields((err:string, values:{}) => {
              if (!err) {
                console.log('Received values of form: ', values);
              }
            });
          };
        return <Form onSubmit={handleSubmit}>
            <Form.Item label="TabName:">
                {getFieldDecorator('tabName', {
                    rules: [{ required: true, message: 'Please input the TabName' }],
                })(
                    <Input />,
                )}
            </Form.Item>
            <Form.Item label="Type:">
                {getFieldDecorator('type', {
                    rules: [{ required: false}],
                })(
                    <Input />,
                )}
            </Form.Item>
            <Form.Item label="Content">
                {getFieldDecorator('content', {
                    rules: [{ required: false}],
                })(
                    <Input />,
                )}
            </Form.Item>
        </Form>
    }
    const TForm = Form.create({ name: 'addForm' })(AddForm);
    return (

        <div>
        <Button onClick={()=>setVisible(true)}>+add</Button>
            <Tabs defaultActiveKey="0" onChange={callback}>
                {tabs.map((value,index)=>{
                    return <TabPane tab={
                        <span>
                            <Icon type={value.type} />
                            {value.name}
                        </span>
                        } key={'"'+index+'"'}>
                            {value.content}
                    </TabPane>
                })}
            </Tabs>
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <TForm />
            </Modal>
        </div>
    )
}

export default Tab