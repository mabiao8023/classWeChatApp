import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  }
  methods = {
    tap () {
      this.mixin = 'mixin data was changed'
      console.log('mixin method tap')
    },
    
  }
  formateMonth(value){
            let year = parseInt(value/12,10);
            let month = value % 12;
            if( year > 0 && month == 0 ){
                return `${year}年`;
            }
            return year > 0 ? `${year}年${month}个月` : `${month}个月`;
    }

    formateMoney(value){
      if(!value){
        return '';
      }
      var prizeStr =  value + "";
      return prizeStr.replace(/^(\d+)\.0+$/,"$1");
    }
    
    secondsFormate(seconds){
      return [
                parseInt(seconds / 60 / 60),
                parseInt(seconds / 60 % 60),
                parseInt(seconds % 60)
            ].join(":").replace(/\b(\d)\b/g, "0$1");
    }
    
  onShow() {
    console.log('mixin onShow')
  }

  onLoad() {
    console.log('mixin onLoad')
  }
}
