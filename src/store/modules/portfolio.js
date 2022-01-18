import * as types from "../types"
const state = {
    myStocks:[],
    funds:10000
}
const getters={
    [types.GET_MYSTOCKS]:(state , getters)=>{
       
        return state.myStocks.map((stock)=>{
            let record = getters[types.GET_STOCKS].find((el)=>el.id===stock.id)
            return {...stock,price:record.price}
        }) 
        
    },
    [types.GET_FUNDS]:(state)=>{
        return state.funds
    }
}
const mutations={
    [types.BUY_STOCK]:(state,order)=>{
        
        let record = state.myStocks.find((stock)=>stock.id===order.id)
       
        if(record){
            record.quantity += order.quantity
           
        }else{
            state.myStocks.push(order)
        }
        state.funds -= (order.quantity*order.price)
    },
    [types.SELL_STOCK]:(state,order)=>{
        let record = state.myStocks.find((stock)=>stock.id===order.id)
        if(record.quantity>order.quantity){
            record.quantity-=order.quantity
        }else{
            state.myStocks.splice(record,1)
          //  state.myStocks = state.myStocks.filter((stock)=>stock.id !== order.id)
        }
        state.funds += (order.quantity*order.price)
    },
    [types.SET_MYSTOCKS]:(state,stocks)=>{
       
        state.myStocks=stocks?stocks:[]
       
      },
      [types.SET_FUNDS]:(state,funds)=>{
state.funds=funds
      }
}
export default{
    state,getters,mutations
}