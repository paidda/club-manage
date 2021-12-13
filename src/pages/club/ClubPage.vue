<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
          <el-form-item label="名称">
            <el-input v-model="queryForm.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="queryForm.stop" placeholder="社团状态">
              <el-option label="全部" value=""></el-option>
              <el-option label="启用" value="0"></el-option>
              <el-option label="暂停" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData()">查询</el-button>
            <el-button type="info" @click="restData()">重置</el-button>
            <el-button type="success" @click="addClubBtn()">添加新部门</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-table size="mini" ref="multipleTable" style="width:100%" height="480px" :data="tableData"
              @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="部门名称" width="220"></el-table-column>
      <el-table-column prop="content" label="部门简介"></el-table-column>
      <el-table-column prop="userName" label="部长" width="180" align="center"></el-table-column>
      <el-table-column prop="crtTime" label="创建时间" width="180" align="center"></el-table-column>
      <el-table-column label="是否开放" width="100" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.stop"
            @change="changeStopStatus(scope.row)"
            active-value="0"
            inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="getClubUserListBtn(scope.row)">部门员工</el-button>
          <!-- <el-button size="mini" type="waring" @click="updateClubUserBtn(scope.row)">设置社长</el-button> -->
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="total,prev,pager,next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="currentSize"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <el-dialog title="添加新部门" :visible.sync="centerDialogVisible" width="600px" center>
      <el-form :model="addForm" ref="addForm" label-width="80px" :rules="rules">
        <el-form-item prop="name" label="部门名称" size="mini">
          <el-input v-model="addForm.name" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="部门简介" size="mini">
          <el-input type="textarea" v-model="textContent" :rows="11"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
                <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
                <el-button size="mini" @click="addClub">确定</el-button>
            </span>
    </el-dialog>

    <el-dialog title="修改部门" :visible.sync="editVisible" width="600px" center>
      <el-form :model="form" ref="form" label-width="80px" :rules="rules">
        <el-form-item prop="name" label="部门名称" size="mini">
          <el-input v-model="form.name" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="部门简介" size="mini">
          <el-input type="textarea" v-model="textContent" :rows="11"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
                <el-button size="mini" @click="editVisible = false">取消</el-button>
                <el-button size="mini" @click="editSave">确定</el-button>
            </span>
    </el-dialog>

    <el-dialog title="成员列表" :visible.sync="clubListVisible" width="1080px" center>
      <div class="handle-box">
        <el-form :inline="true" :model="queryUserForm" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="queryUserForm.userName" placeholder="姓名" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getClubUserList()" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table size="mini" ref="multipleTable" style="width:100%" height="380px" :data="clubUserList"
              @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="college" label="部门" width="120"></el-table-column>
        <el-table-column prop="studeClass" label="职位" width="120"></el-table-column>
        <el-table-column prop="phone" label="手机" width="100" align="center"></el-table-column>
        <el-table-column prop="crtTime" label="加入时间" width="150" align="center"></el-table-column>
        <el-table-column label="审核状态" width="80" align="center">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.pass === '1'"
              :type="scope.row.pass === '1' ? 'success' : 'success'"
              disable-transitions>通过
            </el-tag>
            <el-tag
              v-if="scope.row.pass === '2'"
              :type="scope.row.pass === '2' ? 'primary' : 'primary'"
              disable-transitions>待审核
            </el-tag>
            <el-tag
              v-if="scope.row.pass === '0'"
              :type="scope.row.pass === '0' ? 'danger' : 'danger'"
              disable-transitions>不通过
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否部长" width="80" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.leader"
              @change="updateClubUserBtn(scope.row)"
              active-value="1"
              inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="passClubUserBtn(scope.row)" v-if="scope.row.pass === '2'">审核</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total,prev,pager,next"
          :current-page="currentUserPage"
          :page-size="pageUserSize"
          :total="currentUserSize"
          @current-change="handleCurrentUserChange"
        >
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog title="删除会员" :visible.sync="delVisible" width="300px" center>
      <div align="center">删除不可恢复，是否确定删除？</div>
      <span slot="footer">
                <el-button size="mini" @click="delVisible = false">取消</el-button>
                <el-button size="mini" @click="deleteRow">确定</el-button>
            </span>
    </el-dialog>
    <el-dialog title="审批会员" :visible.sync="passVisible" width="300px" center>
      <span slot="footer">
                <el-button size="mini" @click="passVisible = false">取消</el-button>
                <el-button size="mini" @click="passClubUser(0)" type="danger">拒绝</el-button>
                <el-button size="mini" @click="passClubUser(1)" type="success">通过</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import {getClubList, addClub, updateClub, deleteNotice, stopClub, updateClubUser, getClubUserList, deleteClubUser, passClubUser} from '../../api';
import {mixin} from '../../mixins';

export default {
  mixins: [mixin],
  data() {
    return {
      passVisible: false,         //审核弹出框
      clubListVisible: false,     //会员列表弹框是否显示
      centerDialogVisible: false, //添加弹窗是否显示
      editVisible: false,         //编辑弹窗是否显示
      delVisible: false,          //删除弹窗是否显示
      addForm: {      //添加框
        name: '',
        content: '',
      },
      textContent: '',
      form: {},
      tableData: [],
      queryForm: {
        name: '',
        stop: ''
      },
      queryUserForm: {
        clubId: '',
        userName: ''
      },
      currentSize: 0,
      pageSize: 10,    //分页每页大小
      currentPage: 1,  //当前页
      currentUserSize: 0,
      pageUserSize: 5,    //分页每页大小
      currentUserPage: 1,  //当前页
      idx: -1,          //当前选择项
      multipleSelection: [],   //哪些项已经打勾
      clubUserList: [],
      clubUserId: "",
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    //计算当前搜索结果表里的数据
    // data() {
    //   return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    // }
  },
  watch: {},
  created() {
    this.getData();
  },
  methods: {
    // 审核
    passClubUser(pass) {
      let params = new URLSearchParams();
      params.append('id', this.clubUserId);
      params.append('pass', pass);
      passClubUser(params)
        .then(res => {
          if (res) {
            this.getClubUserList();
            this.notify("删除成功", "success");
          } else {
            this.notify("删除失败", "error");
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.passVisible = false;
    },
    // 打开审核框
    passClubUserBtn(row) {
      this.passVisible = true
      this.clubUserId = row.id
    },
    // 打开会员列表
    getClubUserListBtn(row) {
      this.clubListVisible = true
      this.queryUserForm.clubId = row.id
      this.queryUserForm.userName = ""
      this.getClubUserList()
    },
    getClubUserList() {
      let params = new URLSearchParams();
      params.append('clubId', this.queryUserForm.clubId);
      params.append('userName', this.queryUserForm.userName);
      getClubUserList(params)
        .then(res => {
          if (res.code == 1) {
            this.clubUserList = res.data.data
              this.currentUserSize = res.data.count;
          } else {
            this.notify(res.msg, "error");
          }
        })
        .catch(err => {
          console.log("系统出错");
        });
    },
    // 设置社长
    updateClubUserBtn(row) {
      let params = new URLSearchParams();
      params.append('id', row.id);
      params.append('clubId', row.clubId);
      params.append('leader', row.leader);
      updateClubUser(params)
        .then(res => {
          if (res.code == 1) {
            this.notify(res.msg, "success");
            this.getClubUserList()
          } else {
            this.notify(res.msg, "error");
          }
        })
        .catch(err => {
          console.log("系统出错");
        });
    },
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData()
    },
    //获取当前页
    handleCurrentUserChange(val) {
      this.currentPage = val;
    },
    // 重置
    restData() {
      this.queryForm = {
        name: '',
        stop: ''
      }
      this.currentSize = 0
      this.pageSize = 10
      this.currentPage = 1
      this.getData();
    },
    //查询所有用户
    getData() {
      this.tableData = [];
      let params = new URLSearchParams();
      params.append('name', this.queryForm.name);
      params.append('stop', this.queryForm.stop);
      getClubList(params).then(res => {
        this.tableData = res.data.data;
        this.currentSize = res.data.count;
      })
    },
    //添加弹窗按钮
    addClubBtn() {
      this.addForm = {      //添加框
        name: '',
        content: '',
      }
      this.textContent = '';
      this.centerDialogVisible = true;
    },
    //添加
    addClub() {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          params.append('name', this.addForm.name);
          params.append('content', this.textContent);
          params.append('publish', this.addForm.publish);
          addClub(params)
            .then(res => {
              if (res.code == 1) {
                this.getData();
                this.notify(res.msg, "success");
                this.centerDialogVisible = false;
              } else {
                this.notify(res.msg, "error");
              }
            })
            .catch(err => {
              console.log("系统出错");
            });
        }
      })

    },
    //弹出编辑页面
    handleEdit(row) {
      this.editVisible = true;
      this.textContent = row.content;
      this.form = row;
    },
    //保存编辑页面修改的数据
    editSave() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          params.append('id', this.form.id);
          params.append('name', this.form.name);
          params.append('content', this.textContent);
          params.append('publish', this.form.publish);
          updateClub(params)
            .then(res => {
              if (res.code == 1) {
                this.getData();
                this.notify("修改成功", "success");
              } else {
                this.notify("修改失败", "error");
              }
            })
            .catch(err => {
              console.log(err);
            });
          this.editVisible = false;
        }
      })
    },
    //删除
    deleteRow() {
      let params = new URLSearchParams();
      params.append('id', this.idx);
      deleteClubUser(params)
        .then(res => {
          if (res) {
            this.getClubUserList();
            this.notify("删除成功", "success");
          } else {
            this.notify("删除失败", "error");
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.delVisible = false;
    },
    changeStopStatus(row) {
      let params = new URLSearchParams();
      params.append('id', row.id);
      params.append('stop', row.stop);
      stopClub(params)
        .then(res => {
          if (res.code == 1) {
            this.getData();
            this.notify(res.msg, "success");
            this.centerDialogVisible = false;
          } else {
            this.notify(res.msg, "error");
          }
        })
        .catch(err => {
          console.log("系统出错");
        });
    }
  }
}
</script>

<style scoped>
.handle-box {
  margin-bottom: -20px;
}

.consumer-img {
  width: 100%;
  height: 80px;
  border-radius: 5px;
  margin-bottom: 5px;
  overflow: hidden;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.pagination {
  display: flex;
  justify-content: center;
}
</style>
