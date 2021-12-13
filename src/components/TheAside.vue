<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#334256"
            text-color="#ffffff"
            active-text-color="#20a0ff"
            router
         >
            <template v-for="item in items">
                <template>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        {{item.title}}
                    </el-menu-item>
                </template>
            </template>

        </el-menu>
    </div>
</template>

<script>
import bus from "../assets/js/bus"
export default {
    data(){
        return{
            collapse: false,
            items:[
                {
                    index: 'Info',
                    title: '系统首页'
                },
                {
                    index: 'ClubList',
                    title: '工作安排'
                },
                {
                    index: 'ActiveList',
                    title: '工作岗位'
                },
                {
                    index: 'myClubList',
                    title: '工资查询'
                },
                {
                    index: 'MyActiveList',
                    title: '我的活动'
                }
            ]
        }
    },
    computed:{
        onRoutes(){
            return this.$route.path.replace('/','');
        }
    },
    created(){
        this.getItemRoles()
        //通过Bus进行组件间的通信，来折叠侧边栏
        bus.$on('collapse',msg =>{
            this.collapse = msg
        })
    },
    methods:{
        getItemRoles() {
            if ("1" === localStorage.getItem("roles")) {
               this.items = [
                    {
                        index: 'Info',
                        title: '系统首页'
                    },
                    {
                        index: 'Consumer',
                        title: '员工管理'
                    },
                    {
                        index: 'Notice',
                        title: '公告管理'
                    },
                    {
                        index: 'Club',
                        title: '部门管理'
                    },
                    {
                        index: 'Active',
                        title: '活动管理'
                    },
                    {
                        index: 'ClubList',
                        title: '社团列表'
                    },
                    {
                        index: 'ActiveList',
                        title: '活动列表'
                    },
                    {
                        index: 'myClubList',
                        title: '我的社团'
                    },
                    {
                        index: 'MyActiveList',
                        title: '我的活动'
                    }
                ]
            } else{

            }
        }
    }
}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    background-color: #334256;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar{
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse){
    width: 150px;
}

.sidebar >ul {
    height: 100%;
}
</style>
