//订阅器

class Dep {
    
    static subs = []
    
    //增加订阅者
    static addSub(sub){
        this.subs.push(sub);
    }
    //判断是否增加订阅者
    static depend () {
        if (Dep.target) {
            this.addSub(Dep.target)
        }
    }

    //通知订阅者更新
    static notify(){
        this.subs.forEach((sub) =>{
            sub.setState({})
        })
    }
}
Dep.target = null;

export default Dep