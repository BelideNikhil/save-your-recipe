import React,{useReducer} from 'react'

export const Context=React.createContext()


export  const Provider =({children})=>{
    
    const reducerFunction=(stateObject,action)=>{
        console.log("triggered",stateObject)
        if(action.type==="CHANGE_COLOR"){
            return ({...stateObject,color:action.payload})
        }else if(action.type==="CHANGE_MODE"){
            return ({...stateObject,mode:action.payload})
        }else {
            return stateObject;
        }
    }

    const changeColor=(color)=>{
        dispatchFunction({type:"CHANGE_COLOR",payload:color})
    }
    const changeMode=(mode)=>{
        dispatchFunction({type:"CHANGE_MODE",payload:mode})
    }
    const [stateObject,dispatchFunction]=useReducer(reducerFunction,{color:"#FFBF86",mode:false})
    return(
        <Context.Provider value={{...stateObject,changeColor,changeMode}}>
            {children}
        </Context.Provider>
    )
}