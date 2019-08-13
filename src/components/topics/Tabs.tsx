import React, {useState} from 'react';
import { Layout,Tabs,Icon,Modal,Button,Form,Input,Radio } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

const { TabPane } = Tabs;

interface ICollectionProps {
  visible: boolean  
  onCancel: () => void
  onCreate: () => void 
  form: WrappedFormUtils<any>
}

const CollectionCreateForm = Form.create<any>({ name: 'form_in_modal' })(
    // eslint-disable-next-line
      class extends React.Component<ICollectionProps>{
        render() {
          const { visible, onCancel, onCreate, form} = this.props;
          const { getFieldDecorator } = form;
          return (
            <Modal
              visible={visible}
              title="Create a new collection"
              okText="Create"
              onCancel={onCancel}
              onOk={onCreate}
            >
              <Form layout="vertical">
                <Form.Item label="Title">
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input the title of collection!' }],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Description">
                  {getFieldDecorator('description')(<Input type="textarea" />)}
                </Form.Item>
                <Form.Item className="collection-create-form_last-form-item">
                  {getFieldDecorator('modifier', {
                    initialValue: 'public',
                  })(
                    <Radio.Group>
                      <Radio value="public">Public</Radio>
                      <Radio value="private">Private</Radio>
                    </Radio.Group>,
                  )}
                </Form.Item>
              </Form>
            </Modal>
          );
        }
      }
  );
  
class Tab extends React.Component {
    formRef: any = null
    state = {
        visible: false,
        tabs:[
            {name:'Apple',content:'Content of Tab Pane 1',type:"apple"},
        {name:'Android',content:'Content of Tab Pane 2',type:'android'},
        ]
    };
    handleCancel = (e:any) => {
        this.setState({ visible: false });
      };
    handleOk = (e:any) => {
        this.setState({ visible: false });

    };
    callback = (key:number|string)=>{
        console.log(key)
    }
    saveFormRef = (formRef:any) => {
      console.log(formRef)
        this.formRef = formRef;
      };
    handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err: any, values: any) => {
        if (err) {
        return;
        }

        console.log('Received values of form: ', values);
        form.resetFields();
        this.setState({ visible: false });
    });
    };
    render() {
    return (
        <div>
        <Button onClick={()=>this.setState({visible:true})}>+add</Button>
            <Tabs defaultActiveKey="0" onChange={this.callback}>
                {this.state.tabs.map((value,index)=>{
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
            <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
            />
        </div>
    )
    }
}

export default Tab