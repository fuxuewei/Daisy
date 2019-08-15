import React,{useState, useEffect} from 'react'
import store from '../../store';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message,
  Upload
} from 'antd';

interface IFile {
  type:string
  size:number
}
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

function RegistrationForm(props:any) {
  const state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
    const { getFieldDecorator, setFieldsValue } = props.form;
    const { autoCompleteResult } = state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 10 },
        sm: { span: 5},
      },
      wrapperCol: {
        xs: { span: 3 },
        sm: { span: 12 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const handleSubmit = (e:any) => {
      e.preventDefault();
      props.form.validateFieldsAndScroll((err:string, values:{}) => {
        if (!err) {
          console.log(values)
          success()
        }
      });
    };
    const success = () => {
      message.success('Successful registration');
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );
    
    function getBase64(img:Blob, callback:any) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }
    
    function beforeUpload(file:IFile) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    }
    //上传头像
    let unsubscribe = store.subscribe(()=>{
      // console.log(store.getState().img)
    })
    const UploadOptions = (props: any)=>{
      const [loading,setLoading] = useState(false);
      const [imageUrl,setImageUrl] = useState('');
      const handleChange = (info:any) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (imageUrl:string) =>{
              // setLoading(false)
              setImageUrl(imageUrl)
              props.setFieldsValue({
                'head': imageUrl
              })
              // 调用redux
              // setLoading(true)
            }
          );
        }
      };
      const uploadButton = (
        <div>
          <Icon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      return (
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {props.value ? <img src={props.value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      );
    }
    console.log(store.getState().img)
    return(
    <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
            ],
          })(<Input.Password onBlur={()=>console.log('xxx')} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Habitual Residence">
          {getFieldDecorator('residence', {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [
              { type: 'array', required: true, message: 'Please select your habitual residence!' },
            ],
          })(<Cascader options={residences} />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item label="Head">
          {getFieldDecorator('head', {
            rules: [{ required: false}]
          })(
          <UploadOptions 
          setFieldsValue={setFieldsValue} 
          onChange={(res: any) => console.log} />
          )}
        </Form.Item>
        <Form.Item label="Captcha" extra="We must make sure that your are a human.">
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{ required: true, message: 'Please input the captcha you got!' }],
              })(<Input />)}
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>)
}

const VForm = Form.create({ name: 'register' })(RegistrationForm);

export default VForm