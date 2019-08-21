import {globalState,observable} from './index'
import Watcher from './Watcher'

let car = observable({
    'brand':'BMW',
    'price':3000
})

// export const setTest = (key,value) =>{
//     var a = new globalState();
//     a[key] = value;
// }

// export const getTest = (key) =>{
//     var b = new globalState();
//     return b[key]; 
// }
function myVue (data,key) {
    this.data = data;
    observable(data);                      //将数据变的可观测
    
    return this;
}

var xx = new myVue({
    'brand':'BMW',
    'price':3000
}, 'price');


export const setTest = (key,value) =>{
    var cc = JSON.parse(JSON.stringify(xx))
    xx.data[key] = value
    new Watcher(cc, xx,function (value) {

    });
    // car.price = value
}

export const getTest = (key) =>{
    return xx.data[key]
    // return car[key]; 
}