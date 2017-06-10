const STOPAGE_KEY  = 'chenxi'
export default{
  fetch:function() {
    return JSON.parse(window.localStorage.getItem(STOPAGE_KEY) || '[]');
  },
  save:function(items) {
    window.localStorage.setItem(STOPAGE_KEY,JSON.stringify(items));
  }
}
