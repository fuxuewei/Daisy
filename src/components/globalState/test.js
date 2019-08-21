import globalState from './index'
// import observable from './index'

// let car = observable({
//     'brand':'BMW',
//     'price':3000
// })

export const setTest = (key,value) =>{
    var a = new globalState();
    a[key] = value;
}

export const getTest = (key) =>{
    var b = new globalState();
    return b[key]; 
}