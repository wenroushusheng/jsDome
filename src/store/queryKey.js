 export default {
   state: {
     queryKeysData: [
       ['聊天框开关', 'shiftA'],
       ['更新当前页面数据', 'shiftS'],
       ['打开设置', 'shiftD'],
       ['发送信息', 'ctrlENTER'],
     ],
     chatState: false,
     queryKeyModal: false,
     isShowTip: false,
   },
   mutations: {
    execuQK({queryKeysData},e){
      const _curIdx = queryKeysData.map((item) => item[1]).indexOf(getKeyCom(e));
      if(_curIdx == -1 ){ return;  }
      const fn = queryKeysData[_curIdx][2];
      typeof fn ==='function' && fn();
    },
     setNewCom({queryKeysData}, [oKC, nKC]) {
       const idx = queryKeysData.map(item => item[1]).indexOf(oKC);
       idx > -1 && queryKeysData[idx].splice(1,1,nKC);
     },
     setNewFn({queryKeysData},[keyCom, fn]) {
      const idx =  queryKeysData.map(item => item[1]).indexOf(keyCom);
      idx > -1 &&  queryKeysData[idx].splice(2,1,fn);
    },
     setNewQK(state,[name, kc, fn]) {
      state.queryKeysData.push([name, kc, fn]);
    },
     changeChatState(state) {
       state.chatState = !state.chatState
     },
     changeQueryKeyModal(state) {
       state.queryKeyModal = !state.queryKeyModal
     },
     isShowTip(state) {
       state.isShowTip = !state.isShowTip;
     },
   },
   actions: {
   },
 }

 function getKeyCom(e) {
  return (
    ["alt", "ctrl", "shift"].filter((key) => e[key + "Key"]).join("") +
    e.key.toUpperCase()
  );
}



 

 