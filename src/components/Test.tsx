
import React, { useState,useMemo } from 'react'
import {  Button } from 'antd';

    const Fix = (props:any)=>{
        function setStyle(obj:any){
            return obj
        }
        const DFLTStyle =  useMemo(()=>setStyle(props.DFLTStyle),[])
        const newObj = {}
        Object.assign(newObj,DFLTStyle,props.vvstyle)
        
        console.log(newObj)
        return <div style={newObj}>
                hello vv
            </div>
    }
    export default  ()  => {

        //组件固定属性(初始化属性)，变更不发生改变
        const [DFLTStyle,setDFLTStyle] = useState({
            marginTop:'20px',
            marginLeft:'20px',
            border:'1px solid black',
            width:'100px'
        })
        //组件其他属性，变更则组件发生变化
        const [vvstyle,setVVStyle] = useState({
            color:'red'
        })

        const anotherStyle={
            marginTop:'20px',
            marginLeft:'20px',
            border:'1px solid black',
            width:'50px'
        }
        const vvtwostyle={
            color: 'blue'
        }
        //固定属性变更
        function changeDFLTStyle(newStyle:any){
            setDFLTStyle(newStyle)
            console.log('xxx')
        }
        //非固定属性变更
        function changeVVStyle(newStyle:any){
            setVVStyle(newStyle)
            console.log('vvv')
        }
            return  <div>
                <Fix DFLTStyle={DFLTStyle}  vvstyle={vvstyle}/>
                <Button onClick={()=>{changeDFLTStyle(anotherStyle);changeVVStyle(vvtwostyle)}}>vvv</Button>
            </div>
    }