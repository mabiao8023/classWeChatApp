const aipCommonPath = '/home/apiEntry/api/';
const Host = `https://a.ym8800.com`;

let apiPath = {
    bannerList:`${Host}/index/banner`, // banner图
    classList:`${Host}/index/class`, // 首页问题列表/class/info
    classInfo:`${Host}/class/info`, // 课程特色页面
    classTry:`${Host}/class/try`, // 课程试听列表
    classChapter:`${Host}/class/chapter`, // 课程章节
	classPay:`${Host}/class/buyClass/wxapp`,// 购买课程
	userClass:`${Host}/my_class_list/list`, //已购买的接口
	userChapter:`${Host}/my_class/info`,
	userArticle:`${Host}/article/info`, //已购买文章接口
	getPerson:`${Host}/me/info`, // 获取个人信息
	classPercent:`${Host}/my_class/learn_percent`, // 添加课程进度
	getTest:`${Host}/test/get`, //获取测试
	getTestAsk:`${Host}/test/get_ask`, // 获取测试的问题
	getRandAnswer:`${Host}/test/get_answer`, // 获取随机问题
	login:`${Host}/wxapp/login`, // 登录接口
	updateUserInfo:`${Host}/wxapp/user/update`, // 更新用户信息
}

export default apiPath
