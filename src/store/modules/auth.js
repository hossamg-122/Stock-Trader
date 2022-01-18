import * as types from "../types";
import authenticationApi from "../../API's/authenticationApi";
import firebase from "../../API's/firebase";
import router from "../../routes/router";
const handleLocalStorage=(data)=>{
  const expireDate=new Date(new Date().getTime()+(parseInt(data.expiresIn)*1000))
  localStorage.setItem('token',data.idToken)
  localStorage.setItem('userId',data.localId)
  localStorage.setItem('expireDate',expireDate)
}
const clearLoclaStorage=()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expireDate')
}
const state = {
  userId: null,
  token: null
};
const getters = {
  [types.GET_USER_DATA]: state => {
    return state;
  }
};
const mutations = {
  [types.SET_USER_DATA]: (state, { localId, idToken }) => {
    console.log(localId,idToken)
    state.userId = localId;
    state.token = idToken;
  },
  [types.LOGOUT_USER]: state => {
    router.replace("/sign-in");
    state.userId = null;
    state.token = null;
    clearLoclaStorage()
  }
};
const actions = {
  [types.SIGN_UP]: ({ commit }, { email, password }) => {
    authenticationApi
      .post("/accounts:signUp?key=AIzaSyCRUBSGj1E_xjo6QsTYg3ty1CdG9M2xmGg", {
        email,
        password,
        returnSecureToken: true
      })
      .then(({ data }) => {
        firebase
          .patch(`/users/${data.localId}.json?auth=${data.idToken}`, {
            email: data.email
          })
          .then(res => {
            
            handleLocalStorage(data)
          })
          .catch(e => {
            console.log(e.response);
          });
        commit(types.SET_USER_DATA, data);
        router.replace(`/home/${data.localId}`);
      })
      .catch(e => {
        if ((e.response.status = 400)) {
          alert("E-Mail Is Already Exists");
        }
        console.log("Error", e.response);
      });
  },
  [types.SIGN_IN]: ({ commit,dispatch }, { email, password }) => {
    
    authenticationApi
      .post(
        "/accounts:signInWithPassword?key=AIzaSyCRUBSGj1E_xjo6QsTYg3ty1CdG9M2xmGg",
        { email, password, returnSecureToken: true }
      )
      .then(({ data }) => {
       console.log(data)
        commit(types.SET_USER_DATA, data);
       
        handleLocalStorage(data)
        
        
        router.replace(`/home/${data.localId}`);

      })
      .catch(e => {
        if ((e.response.status = 400)) {
          alert("Inavalid User Name or Password");
        }
        console.log("Error", e.response);
      });
  },
   [types.AUTO_LOGIN]:({commit})=>{
     console.log("try")
     const token = localStorage.getItem('token')
     
     if(!token){
       return
     }
     console.log("token",token)
     const expireDate = localStorage.getItem('expireDate')
     
     if(new Date()>=expireDate){
       return
     }
     console.log("expireDate",expireDate)
     const userId = localStorage.getItem('userId')
     console.log("userId",userId)
     commit(types.SET_USER_DATA,{localId:userId,idToken:token})
     router.replace(`/home/${userId}`);
     
   }
};
export default {
  state,
  actions,
  mutations,
  getters
};
