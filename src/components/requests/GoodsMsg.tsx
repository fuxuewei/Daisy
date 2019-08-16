import React,{useState,useEffect} from 'react';
import '../../assets/less/goodsmsg.less';
import { Tree,Tag, Input, Tooltip, Icon } from 'antd';
import { OmitProps } from 'antd/lib/transfer/renderListBody';
import * as R from 'ramda'

const { TreeNode } = Tree;
interface List<T>{
  title:string,
  key:string,
  state:number,
  children ?: T 
}
const list = [
  {title:'a',state:0,key:'01',children:[{title:'a-1',key:'01-1',state:0},{title:'a-2',key:'01-2',state:0}]},
  {title:'b',state:0,key:'02',children:[{title:'b-1',key:'02-1',state:0},{title:'b-2',key:'02-2',state:0}]},
  {title:'c',state:0,key:'03'},
]
//选择列表
const  TreeSelect = (props:any)=> {
  const onSelect = (selectedKeys:string[], info:any) => {
    console.log('selected', selectedKeys, info);
  };
  // const treenode = (obj:any)=>{
  //   obj.map ((item:any) =>{
  //     return <TreeNode title={item.title} key={item.key}>
  //         {item.children ? treenode(item.children) : ''}
  //     </TreeNode>})
  // }
  const onCheck = (checkedKeys:any, info:any) => {
    console.log('onCheck', checkedKeys, info);
    const checkedArr:any = []
    info.checkedNodes.map((item:any)=>{
      checkedArr.push({title:item.props.title,key:item.key})
    })
    props.changeValues(checkedArr)
  };
    return (
      <Tree
        checkable
        checkedKeys={props.checkedKeys}
        defaultExpandedKeys={['02']}
        defaultSelectedKeys={[]}
        defaultCheckedKeys={[]}
        onSelect={onSelect}
        onCheck={onCheck}
      >

        <TreeNode title="parent" key="0-0">
        {list.map(item=>{
          return <TreeNode title={item.title} key={item.key}>
              {item.children ? item.children.map(child => {return <TreeNode title={child.title} key={child.key} />})  : ''}
          </TreeNode>
        })}
        </TreeNode>
      </Tree>
    );
}
//显示列表
function EditableTagGroup(props:any){
    const [tagss,setTagss] = useState(props.checkedArr),
          [visible,setVisible] = useState(false),
          [inputValue,setInputValue] = useState('')  

    const handleClose = (removedTag:any) => {
      var tags:any = []
      if(removedTag.key.length>2){
        const momo = removedTag.key.split('-')[0]
        const cc = R.filter((tag:any) => tag.key !== momo)(props.checkedArr);
        tags = R.filter((tag:any) => tag !== removedTag)(cc);
      }else if (removedTag.key.length<=2){
        tags = R.filter((tag:any) => {return tag.key.split('-')[0] !== removedTag.key})(props.checkedArr );
      }else{
        tags = R.filter((tag:any) => tag !== removedTag)(props.checkedArr);
      }
      props.changeValues(tags)
    };

    const showInput = () => {
      // this.setState({ inputVisible: true }, () => this.input.focus());
      setVisible(true)
    };
  
    const handleInputChange = (e:any) => {
      setInputValue(e.target.value)
    };
  
    const handleInputConfirm = () => {
      let newArr = [{title:inputValue , key:'"'+list.length +'"'}]
      if(props.checkedArr){
        newArr = [...props.checkedArr,{title:inputValue , key:'"0'+list.length+'"'}]
      }
      props.changeValues(newArr)
      setVisible(false)
      setInputValue('')
    };
  
    const saveInputRef = (input:any) => (input = input);
  
      return (
        <div className = "view_list">
          {props.checkedArr ? props.checkedArr.map((tag:any, index:number) => {
            const isLongTag = tag.title.length > 20;
            const tagElem = (
              <Tag key={tag.key} closable={index !== 0} onClose={() => handleClose(tag)}>
                {isLongTag ? `${tag.title.slice(0, 20)}...` : tag.title}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag.title} key={tag.key}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          }) : ''}
          {visible && (
            <Input
              ref={saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )}
          {!visible && (
            <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
              <Icon type="plus" /> New Tag
            </Tag>
          )}
        </div>
      );
  }
const GoodsMsg:React.FC = ()=>{
  const [values,setValues] = useState()
  const [keys,setKeys] = useState()
  function changeValues(values:any[]){
    if(values){
      setValues(values)
    }
    const vv:string[] = []
    values.map((item)=>{
      vv.push(item.key)
    })
    setKeys(vv)
  }
    return (
        <div className="panel">
            <div className="area_top">
                <div className="area">
                    <TreeSelect changeValues={changeValues} checkedKeys={keys} checkedArr={values}/>
                </div>
                <div className="area">
                    <EditableTagGroup checkedArr={values} changeValues={changeValues}/>
                </div>
            </div>

            <div className="area_bottom">
                <div className="area">bbb</div>
                <div className="area">nnn</div>
            </div>
        </div>
    )
}
export default GoodsMsg;