 
 export default {
  bind(el, binding) {
    const _ops = binding.value,
      _c = el.getElementsByClassName(_ops.className);
    _c[_ops.curIdx].className += " "+ _ops.activeClass;
  },
  update(el, binding) {
    const _ops = binding.value,
      _oOps = binding.oldValue,
      _c = el.getElementsByClassName(_ops.className);
    _c[_oOps.curIdx].className = _oOps.className;
    _c[_ops.curIdx].className +=  ' '+_ops.activeClass;
  }
}
 