import React from 'react'
import Dep from './Dep'


function Const(Component:any){
    return class A extends React.Component{
      constructor(props:any){
        super(props)
        Dep.addSub(this)
      }
      render(){
        return <Component />
      }
    }
  }

  export default Const