import {observable} from './index'

function myVue (data) {
    this.data = data;
    observable(data);                      //将数据变的可观测
    
    return this;
}

var globalData = new myVue({
    'brand':'BMW',
    'price':3000
});


export const setTest = (key,value) =>{
    globalData.data[key] = value
}

export const getTest = (key) =>{
    return globalData.data[key]
}