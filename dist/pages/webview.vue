<style lang="less">
  @mainColor: #FF741F;
  page{
    background: #fff;
    padding-bottom: 120rpx;
  }
  .container{
    background: #fff;
  }
  .my-picker{
    width: 100%;
  }
  .nav{
    position: fixed;
    top: 0;
    display: flex;
    width: 100%;
    border-top: 2rpx solid #eaeaea;
    border-bottom: 2rpx solid #eaeaea;
    background: #fff;
    z-index: 1000;
    text-align: center;
      line-height: 80rpx;
      color: #333;
      font-size: 30rpx;
      padding: 0 30rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .date-choice{
        width: 48rpx;
        height: 48rpx;
      }
      .arrow-right{
        width: 40rpx;
        height: 40rpx;
      }
  }
  .game-list{
    width: 100%;
  }
  .game-item{
    display: flex;
    align-items: center;
    width: 100%;
    padding: 30rpx 24rpx;
    background: #fff;
    // background: linear-gradient(to bottom, #fff 0%,#F7F6F5 100%);
    border-bottom: 1px solid #eaeaea;
    &:first-child{
       border-top: 1px solid #CBCBCB;
    }
    .game-item-sc{
      width: 48rpx;
      margin-right: 20rpx;
    }
    .game-item-content{
      flex: 1;
    }
    .game-item-con-info{
      display: flex;
      font-size: 28rpx;
      margin-bottom: 10rpx;
      .game-ls{
        width: 41%;
        text-align: left;
        color: #999;
        display: flex;
        justify-content: flex-end;
      }
      .game-time{
        margin-left: 20rpx;
        color: #999;
        width: 80rpx;
        text-align: right;
      }
      .game-minutes{
        margin: 0 20rpx;
        width: 60rpx;
        text-align: center;
        color: @mainColor;
      }
    }
    .game-name{
      display: flex;
      font-size: 30rpx;
      color: #333;
    }
    .home{
      display: flex;
      width: 41%;
      justify-content: flex-end;
      align-items: center;
    }
    .other{
      display: flex;
      align-items: center;
    }
    .score{
      margin: 0 20rpx;
      width: 60rpx;
      text-align: center;
      color: @mainColor;
      font-size: 32rpx;
    }
    .red{
      background: #e41c36;
      color: #fff; 
      width: 26rpx;
      height: 32rpx;
      line-height: 32rpx;
      border-radius: 6rpx; 
      text-align: center;
      overflow: hidden;
      margin: 0 5rpx;
      font-size: 26rpx;
    }
    .yellow{
      background: #f6c151;
      color: #fff;  
      width: 26rpx;
      height: 32rpx;
      line-height: 32rpx;
      border-radius: 6rpx; 
      text-align: center;
      overflow: hidden;
      font-size: 26rpx;
      margin: 0 5rpx;
    }
  }
  .collect{
    width: 48rpx;
    height: 48rpx;
    vertical-align: middle;
  }
  .share{
    width: 40rpx;
    height: 40rpx;
   
  }

  .share-btn{
    width: 40rpx;
    height: 40rpx;
    padding: 0;
    border: 0;
    border-radius:0;
    line-height: 0;
    background: transparent;
    &::after{
      display: none;
    }
  }
  .upLoading{
    padding: 24rpx;
    font-size: 30rpx;
    color: #666;
  }

  .upLoading{
    display: flex;
    align-items: center;
  }

  .loading-img{
    width: 48rpx;
    height: 48rpx;
    margin-right: 10rpx;
    animation: rotateLoading 1s linear infinite;
  }

  @keyframes rotateLoading{
    0%{
      transform: rotate(0); 
    }
    100%{
      transform: rotate(360deg); 
    }
  } 
  .down-flash{
     height: 80rpx;

  }
  .collect-btn{
    padding: 0;
    border: 0;
    border-radius:0;
    line-height: 0;
    background: transparent;
    &::after{
      display: none;
    }
  }

  .no-data{
    text-align: center;
    font-size: 28rpx;
    color: #999;
    padding-top: 100rpx;
    image{
      width: 200rpx;
      height: 200rpx;
    }
  }
</style>
<template>
  <view class="container">
      <web-view src="{{src}}"></web-view>
  </view>
</template>
  
<script>
  import wepy from 'wepy'
  import myMixin from '../mixins/test'

  export default class Index extends wepy.page {
    config = {
      navigationBarTitleText: '足球即时比分',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTextStyle: 'black'  
    }

    components = {
 
    }

    mixins = [myMixin]

    data = {
      src:''
    }

    computed = {
      
    }

    methods = {
     
        
    }

    events = {
 
    }


    onLoad( options ) {
       console.log(options)
    }



  }
</script>