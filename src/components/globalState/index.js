import Dep from './Dep'

export const observable =(obj)=> {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    let keys = Object.keys(obj);
    keys.forEach((key) =>{
        defineReactive(obj,key,obj[key])
    })
    return obj;
}
function defineReactive (obj,key,val) {
    Object.defineProperty(obj, key, {
        get(){
            Dep.depend();
            console.log(`${key}属性被读取了`);
            return val;
        },
        set(newVal){
            val = newVal;
            console.log(`${key}属性被修改了`);
            Dep.notify()       //数据变化通知所有订阅者
        }
    })
}
