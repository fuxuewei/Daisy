import Dep from './Dep'


class Watcher {
    constructor(obj,newobj,func){
        this.vm = obj;
        this.newvm = newobj
        console.log(obj)
        this.update()
        // this.cb = func;
        // this.value = this.get()  // 将自己添加到订阅器的操作

    }
    update(){
        let value = this.newvm
        let oldVal = this.vm

        console.log(value)
        console.log(oldVal)
        if(value != oldVal){
            console.log('cc')
        }
    }

    // update(){
    //     let oldVal = this.value;
    //     if (value !== oldVal) {
    //         console.log('xxx')
    //         this.value = value;
    //     }
    // }
    // get(){
    //     Dep.target = this;  // 缓存自己
    //     let value = this.vm.data  // 强制执行监听器里的get函数
    //     Dep.target = null;  // 释放自己
    //     return value;
    // }
}
export default Watcher