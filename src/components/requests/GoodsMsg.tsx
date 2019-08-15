import React,{useState} from 'react';
import '../../assets/less/goodsmsg.less';
import { Tree,Tag, Input, Tooltip, Icon } from 'antd';

const { TreeNode } = Tree;
interface List<T>{
  title:string,
  key:string,
  state:number,
  children ?: T 
}
const list = [
  {title:'a',state:0,key:'0-1',children:[{title:'a-1',key:'0-1-1',state:0},{title:'a-2',key:'0-1-2',state:0}]},
  {title:'b',state:0,key:'0-2',children:[{title:'b-1',key:'0-2-1',state:0},{title:'b-2',key:'0-2-2',state:0}]},
  {title:'c',state:0,key:'0-3'},
]
//选择列表
const  TreeSelect = ()=> {
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
  };

    return (
      <Tree
        checkable
        defaultExpandedKeys={['0-2']}
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
    const [tagss,setTagss] = useState(['Unremovable', 'Tag 2', 'Tag 3']),
          [visible,setVisible] = useState(false),
          [inputValue,setInputValue] = useState('')

    const handleClose = (removedTag:string) => {
      const tags = tagss.filter(tag => tag !== removedTag);
      console.log(tags);
      setTagss(tags)
    };
  
    const showInput = () => {
      // this.setState({ inputVisible: true }, () => this.input.focus());
      setVisible(true)
    };
  
    const handleInputChange = (e:any) => {
      setInputValue(e.target.value)
    };
  
    const handleInputConfirm = () => {
      if (inputValue && tagss.indexOf(inputValue) === -1) {
        setTagss([...tagss, inputValue]) 
      }
      console.log(tagss);
      setVisible(false)
      setInputValue('')
    };
  
    const saveInputRef = (input:any) => (input = input);
  
      return (
        <div className = "view_list">
          {tagss.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag key={tag} closable={index !== 0} onClose={() => handleClose(tag)}>
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
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
    return (
        <div className="panel">
            <div className="area_top">
                <div className="area">
                    <TreeSelect />
                </div>
                <div className="area">
                    <EditableTagGroup />
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