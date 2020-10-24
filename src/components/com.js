export function goCurIdx(idx) {
  e.currentTarget.querySelector(".item");
  e.currentTarget.querySelector(".cur-idx").className = "item";
  e.target.className += " cur-idx";
  this.cur = idx;
  this.$emit("pageNum", idx);
}