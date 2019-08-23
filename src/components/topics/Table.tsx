import React, {useState,useEffect} from 'react';
import { Table, Divider, Tag } from 'antd';
import { setTest,getTest} from '../globalState/test'
import Const from '../globalState/Const'
import axios from 'axios';

interface Record{
    name:String
}

const Tables: React.FC = () => {

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text: String) => <a href="javascript:;">{text}</a>,
    },
    {
      title: 'Media_Name',
      dataIndex: 'media_name',
      key: 'media_name',
    },
    {
      title: 'Login_Name',
      dataIndex: 'login_name',
      key: 'login_name',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: { map: (arg0: (tag: any) => JSX.Element) => React.ReactNode; }) => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
  ];
 const params = {
    display_title: "",
    page: 1,
    pagesize: 10
 }
//  const [data,setData] = useState([])
 const [data,setData] = useState([
  {
    id: '1',
    login_name: 'John Brown',
    age: 32,
    media_name: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    id: '2',
    login_name: 'Jim Green',
    age: 42,
    media_name: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    id: '3',
    login_name: 'Joe Black',
    age: 32,
    media_name: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]);
useEffect(() => {
  axios.post('/ser/opinionRecoverController/selectOpinionDeleted',params).then((res:any)=>{
    if(res.data.length>0){
      setData(res.data)
    }
  })
});
return (
  <div>
    
    <Table columns={columns} dataSource={data}/>
    <div>{getTest('price')}</div>
    <button onClick={()=>setTest('price',80)}>80</button>
  </div>
)
}
export default Const(Tables)