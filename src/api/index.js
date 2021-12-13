import {get, post} from "./http"

// 判断管理员是否登录成功
export const getLoginStatus = (params) => post(`/login`, params);

//============首页相关================
//数量
export const getAllNum = (params) => post(`getAllNum`, params);

//============用户相关================
//查询用户
export const getAllConsumer = (params) => post(`user/getUserList`, params);
//添加用户
export const setConsumer = (params) => post(`user/addUser`, params);
//编辑用户
export const updateConsumer = (params) => post(`user/updateUser`, params);
//删除用户
export const delConsumer = (params) => post(`user/deleteUser`, params);

//============公告相关================
//查询公告
export const getNoticeList = (params) => post(`notice/getNoticeList`, params);
//添加公告
export const addNotice = (params) => post(`notice/addNotice`, params);
//更新公告
export const updateNotice = (params) => post(`notice/updateNotice`, params);
//删除公告
export const deleteNotice = (params) => post(`notice/deleteNotice`, params);
//发布或取消发布
export const publishNotice = (params) => post(`notice/publishNotice`, params);

//============社团相关================
//查询社团
export const getClubList = (params) => post(`club/getClubList`, params);
//添加社团
export const addClub = (params) => post(`club/addClub`, params);
//更新社团
export const updateClub = (params) => post(`club/updateClub`, params);
//停止社团
export const stopClub = (params) => post(`club/stopClub`, params);

//============社团会员相关================
//社长设置
export const updateClubUser = (params) => post(`club/updateClubUser`, params);
//社团会员列表
export const getClubUserList = (params) => post(`club/getClubUserList`, params);
//删除会员
export const deleteClubUser = (params) => post(`club/deleteClubUser`, params);
//加入社团
export const addClubUser = (params) => post(`club/addClubUser`, params);
//审批会员
export const passClubUser = (params) => post(`club/passClubUser`, params);
//我的社团列表
export const getMyClubList = (params) => post(`club/getMyClubList`, params);


//============活动相关================
//活动列表
export const getActiveList = (params) => post(`active/getActiveList`, params);
//添加活动
export const addActive = (params) => post(`active/addActive`, params);
//更新活动
export const updateActive = (params) => post(`active/updateActive`, params);
//删除活动
export const deleteActive = (params) => post(`active/deleteActive`, params);
//活动人员列表
export const getActiveUserList = (params) => post(`active/getActiveUserList`, params);
//加入活动
export const addActiveUser = (params) => post(`active/addActiveUser`, params);
//删除活动人员
export const deleteActiveUser = (params) => post(`active/deleteActiveUser`, params);
//我参加的活动列表
export const myActiveUserList = (params) => post(`active/myActiveUserList`, params);


