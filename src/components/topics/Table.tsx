import React, {useState} from 'react';
import { Table, Divider, Tag } from 'antd';
import { setTest,getTest} from '../globalState/test'
import Const from '../globalState/Const'

interface Record{
    name:String
}

const Tables: React.FC = () => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: String) => <a href="javascript:;">{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
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
    {
      title: 'Action',
      key: 'action',
      render: (text:String, record:Record,index:number) => (
        <span>
          <a href="javascript:;">Invite {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={()=> {
            data.splice(index,1);
            console.log(data);
            setData(data)}}>Delete</a>
        </span>
      ),
    },
  ];
const [data,setData] = useState([
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]);
return (
  <div>
    <Table columns={columns} dataSource={data}/>
    <div>{getTest('price')}</div>
    <button onClick={()=>setTest('price',80)}>80</button>
  </div>
)
}
export default Const(Tables)