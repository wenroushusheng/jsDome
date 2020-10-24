import store from '@/store/index.js';
import {
  slideNavList
} from "@/assets/stateDate.js";


export default function beforeEach(to, from, next) {
   
  const idx = slideNavList.map(item => item[1]).indexOf(to.name);
  if (idx >= 6) {
    store.commit('isShowTip');
    return next(false);
  } else {
    next();
  }
}