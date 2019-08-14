import React from 'react';
import '../../assets/less/goodsmsg.less';
import { Tree } from 'antd';

const { TreeNode } = Tree;

const  TreeSelect = ()=> {
  const onSelect = (selectedKeys:string[], info:any) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys:any, info:any) => {
    console.log('onCheck', checkedKeys, info);
  };

    return (
      <Tree
        checkable
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
        onSelect={onSelect}
        onCheck={onCheck}
      >
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0" disabled>
            <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
            <TreeNode title="leaf" key="0-0-0-1" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
          </TreeNode>
        </TreeNode>
      </Tree>
    );
}
const GoodsMsg:React.FC = ()=>{
    return (
        <div className="panel">
            <div className="area_top">
                <div className="area">
                    <TreeSelect />
                </div>
                <div className="area">vvv</div>
            </div>

            <div className="area_bottom">
                <div className="area">bbb</div>
                <div className="area">nnn</div>
            </div>
        </div>
    )
}
export default GoodsMsg;