import React, {useState,useEffect} from 'react';
import { Table, Input } from 'antd';
import { setTest,getTest} from '../globalState/test'
import Const from '../globalState/Const'
import axios from 'axios';

interface Record{
    name:String
}
const { Search } = Input
const Tables: React.FC = () => {

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },{
      title: 'Display_Title',
      dataIndex: 'display_title',
      key: 'display_title',
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
  ];
 const params = {
    display_title: "",
    page: 1,
    pagesize: 10
 }
//  const [data,setData] = useState([])
 const [data,setData] = useState([]);
 const [total,setTotal] = useState()
useEffect(() => {
  axios.post('/ser/opinionRecoverController/selectOpinionDeleted',params).then((res:any)=>{
    if(res.data.data.length>0){
      const ss =res.data.data.map((item:any,index:number)=>{
        item.key = index
        return item
      })
      setData(ss)
      setTotal(res.data.total)
    }
  })
},[]);

function getDelData(page:number){
  const params = {
    display_title: "",
    page: page,
    pagesize: 10
 }
  axios.post('/ser/opinionRecoverController/selectOpinionDeleted',params).then((res:any)=>{
    if(res.data.data.length>0){
      const ss =res.data.data.map((item:any,index:number)=>{
        item.key = index
        return item
      })
      console.log(ss)
      setData(ss)
      
    }
  })
}

function findDels(value:string){
  const params = {
    display_title: value,
    endtime: "2018-10-19 00:00:00",
    page: 1,
    pagesize: 10,
    starttime: "2018-10-05 00:00:00",
 }
  axios.post('/ser/opinionRecoverController/selectOpinionDeleted',params).then((res:any)=>{
    var ss = []
    if(res.data.data.length>0){
      ss =res.data.data.map((item:any,index:number)=>{
        item.key = index
        return item
    })
    setData(ss)
    setTotal(res.data.total)
    }
  })
}
return (
  <div>
    <Search
      placeholder="input search text"
      enterButton="Search"
      size="large"
      onSearch={value => findDels(value)}
    />
    <Table columns={columns} dataSource={data} pagination={{
            onChange:getDelData,total: total
          }}/>
    <div>{getTest('price')}</div>
    <button onClick={()=>setTest('price',80)}>80</button>
  </div>
)
}
export default Const(Tables)