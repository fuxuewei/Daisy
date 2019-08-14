const initialState = {
    img:''
  }

const CHANGE_IMG = 'CHANGE_IMG';

function reducer(state:any = initialState, action:any) {
    switch(action.type){
        case CHANGE_IMG:{
            return {
                ...state,
                img:action.payload
            }
        }
    default:
        return state;
    }   
}

function changeImg(img:string){
    return {
        type:CHANGE_IMG,
        payload:img
    }
}


export default reducer;