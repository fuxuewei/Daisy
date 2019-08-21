import React from 'react'
import Dep from './Dep'

function globalState() {
}

var value;
Object.defineProperty(globalState.prototype, "x", {
    get() {
        console.log('price属性被读取了')
        return value;
    },
    set(x) {
        console.log('price属性被修改了')
        value = x;
    }
});
// function observable (obj) {
//     if (!obj || typeof obj !== 'object') {
//         return;
//     }
//     let keys = Object.keys(obj);
//     keys.forEach((key) =>{
//         defineReactive(obj,key,obj[key])
//     })
//     return obj;
// }
// function defineReactive (obj,key,val) {
//     let dep = new Dep();
//     Object.defineProperty(obj, key, {
//         get(){
//             dep.depend();
//             console.log(`${key}属性被读取了`);
//             return val;
//         },
//         set(newVal){
//             val = newVal;
//             console.log(`${key}属性被修改了`);
//             dep.notify()                    //数据变化通知所有订阅者
//         }
//     })
// }

export default globalState