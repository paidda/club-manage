<template>
    <div>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                        <div class="grid-cont-center">
                            <div class="grid-num">{{userCount}}</div>
                            <div>员工总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                        <div class="grid-cont-center">
                            <div class="grid-num">{{clubCount}}</div>
                            <div>社团总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                        <div class="grid-cont-center">
                            <div class="grid-num">{{activeCount}}</div>
                            <div>活动数量</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                        <div class="grid-cont-center">
                            <div class="grid-num">{{noticeCount}}</div>
                            <div>公告数量</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>最新活动</span>
                    </div>
                    <el-collapse v-model="activeName_2" accordion v-for="active in activeData" :key="active.id">
                        <el-collapse-item :title="active.name">
                            <div>{{active.content}}</div>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>最新公告</span>
                    </div>
                    <el-collapse v-model="activeName" accordion v-for="notice in noticeData" :key="notice.id">
                        <el-collapse-item :title="notice.title">
                            <div>{{notice.content}}</div>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {getAllNum, getNoticeList, getActiveList} from '../api/index';

export default {
    data(){
        return {
            userCount: 0,
            clubCount: 0,
            activeCount: 0,
            noticeCount: 0,
            noticeData: [],
            activeName: 1,
            activeName_2: 2,
            activeData: [],
        }
    },
    created() {

    },
    mounted() {
        this.getAllNum();
        this.getNoticeList();
        this.getActiveList();
    },
    methods: {
        getAllNum() {
            let params = new URLSearchParams();

            getAllNum(params).then(res => {
                this.userCount = res.data.userCount
                this.clubCount = res.data.clubCount
                this.activeCount = res.data.activeCount
                this.noticeCount = res.data.noticeCount
            })
        },
        getNoticeList() {
            this.tableData = [];
            let params = new URLSearchParams();
            params.append('publish', "1");
            params.append('page', 1);
            params.append('limit', 10);
            getNoticeList(params).then(res => {
                this.noticeData = res.data.data;
            })
        }
        ,
        getActiveList() {
            this.tableData = [];
            let params = new URLSearchParams();
            params.append('page', 1);
            params.append('limit', 10);
            getActiveList(params).then(res => {
                this.activeData = res.data.data;
            })
        }
    }
}

</script>

<style scoped>
.grid-content {
    display: flex;
    align-items: center;
    height: 50px;
}

.grid-cont-center {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: darkgray;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}
</style>
