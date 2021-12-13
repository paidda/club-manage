<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
          <el-form-item label="工号">
            <el-input v-model="queryForm.no" placeholder="学号">1</el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="queryForm.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="账号类别">
            <el-select v-model="queryForm.flag" placeholder="账号类别">
              <el-option label="全部" value=""></el-option>
              <el-option label="管理员" value="1"></el-option>
              <el-option label="学生" value="2">职工</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData()">查询</el-button>
            <el-button type="info" @click="restData()">重置</el-button>
            <el-button type="success" @click="addUserBtn()">添加新用户</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-table size="mini" ref="multipleTable" style="width:100%" height="480px" :data="tableData"
              @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="no" label="工号" width="120" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120" align="center"></el-table-column>
      <el-table-column prop="college" label="部门" width="120" align="center"></el-table-column>
      <el-table-column prop="studeClass" label="职位" width="120" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机" width="120" align="center"></el-table-column>
      <el-table-column prop="addr" label="地址" align="center"></el-table-column>
      <el-table-column prop="phone" label="账号类别" width="80" align="center">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.flag === '1'"
            :type="scope.row.flag === '1' ? 'success' : 'success'"
            disable-transitions>管理员
          </el-tag>
          <el-tag
             v-if="scope.row.flag === '2'"
            :type="scope.row.flag === '2' ? 'primary' : 'success'"
            disable-transitions>职工
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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

    <el-dialog title="添加新用户" :visible.sync="centerDialogVisible" width="600px" center>
      <el-form :model="registerForm" ref="registerForm" label-width="80px" :rules="rules">
        <el-form-item prop="no" label="工号" size="mini">
          <el-input v-model="registerForm.no" placeholder="学号"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名" size="mini">
          <el-input v-model="registerForm.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" size="mini">
          <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="college" label="部门" size="mini">
          <el-input v-model="registerForm.college" placeholder="学院"></el-input>
        </el-form-item>
        <el-form-item prop="studeClass" label="职位" size="mini">
          <el-input v-model="registerForm.studeClass" placeholder="班级"></el-input>
        </el-form-item>
        <el-form-item prop="addr" label="宿舍" size="mini">
          <el-input v-model="registerForm.addr" placeholder="宿舍"></el-input>
        </el-form-item>
        <el-form-item prop="flag" label="类别" size="mini">
          <input type="radio" name="flag" value="1" v-model="registerForm.flag">&nbsp;管理员&nbsp;&nbsp;
          <input type="radio" name="flag" value="2" v-model="registerForm.flag">&nbsp;职工
        </el-form-item>
        <el-form-item prop="phone" label="手机号" size="mini">
          <el-input v-model="registerForm.phone" placeholder="手机号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
                <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
                <el-button size="mini" @click="addConsumer">确定</el-button>
            </span>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="editVisible" width="600px" center>
      <el-form :model="form" ref="form" label-width="80px" :rules="rules">
        <el-form-item prop="no" label="工号" size="mini">
          <el-input v-model="form.no" placeholder="学号" readonly></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名" size="mini">
          <el-input v-model="form.name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" size="mini">
          <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="college" label="部门" size="mini">
          <el-input v-model="form.college" placeholder="学院"></el-input>
        </el-form-item>
        <el-form-item prop="studeClass" label="职位" size="mini">
          <el-input v-model="form.studeClass" placeholder="班级"></el-input>
        </el-form-item>
        <el-form-item prop="addr" label="宿舍" size="mini">
          <el-input v-model="form.addr" placeholder="宿舍"></el-input>
        </el-form-item>
        <el-form-item prop="flag" label="类别" size="mini">
          <input type="radio" name="flag" value="1" v-model="form.flag">&nbsp;管理员&nbsp;&nbsp;
          <input type="radio" name="flag" value="2" v-model="form.flag">&nbsp;学生
        </el-form-item>
        <el-form-item prop="phone" label="手机号" size="mini">
          <el-input v-model="form.phone" placeholder="手机号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
                <el-button size="mini" @click="editVisible = false">取消</el-button>
                <el-button size="mini" @click="editSave">确定</el-button>
            </span>
    </el-dialog>

    <el-dialog title="删除用户" :visible.sync="delVisible" width="300px" center>
      <div align="center">删除不可恢复，是否确定删除？</div>
      <span slot="footer">
                <el-button size="mini" @click="delVisible = false">取消</el-button>
                <el-button size="mini" @click="deleteRow">确定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import {getAllConsumer, setConsumer, updateConsumer, delConsumer} from '../../api';
import {mixin} from '../../mixins';

export default {
  mixins: [mixin],
  data() {
    return {
      centerDialogVisible: false, //添加弹窗是否显示
      editVisible: false,         //编辑弹窗是否显示
      delVisible: false,          //删除弹窗是否显示
      registerForm: {      //添加框
        no: '',
        name: '',
        college: '',
        password: '',
        studeClass: '',
        phone: '',
        addr: '',
        flag: '2'
      },
      form: {},
      tableData: [],
      queryForm: {
        no: '',
        name: '',
        flag: ''
      },
      currentSize: 0,
      pageSize: 10,    //分页每页大小
      currentPage: 1,  //当前页
      idx: -1,          //当前选择项
      multipleSelection: [],   //哪些项已经打勾
      rules: {
        no: [
          {required: true, message: '请输入工号', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        flag: [
          {required: true, message: '请选择账号类别', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        college: [
          {required: true, message: '请输入部门', trigger: 'blur'}
        ],
        studeClass: [
          {required: true, message: '请输入职位', trigger: 'blur'}
        ],
        addr: [
          {required: true, message: '请输入宿舍', trigger: 'blur'}
        ],
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
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    // 重置
    restData() {
      this.queryForm = {
        no: '',
        name: '',
        flag: ''
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
      params.append('no', this.queryForm.no);
      params.append('name', this.queryForm.name);
      params.append('flag', this.queryForm.flag);
      params.append('page', this.currentPage);
      params.append('limit', this.pageSize);
      getAllConsumer(params).then(res => {
        this.tableData = res.data.data;
        this.currentSize = res.data.count;
      })
    },
    //添加弹窗按钮
    addUserBtn() {
      this.registerForm = {      //添加框
        no: '',
        name: '',
        password: '',
        college: '',
        studeClass: '',
        phone: '',
        addr: '',
        flag: '2'
      }
      this.centerDialogVisible = true;
    },
    //添加用户
    addConsumer() {
      this.$refs['registerForm'].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          params.append('no', this.registerForm.no);
          params.append('name', this.registerForm.name);
          params.append('password', this.registerForm.password);
          params.append('college', this.registerForm.college);
          params.append('studeClass', this.registerForm.studeClass);
          params.append('phone', this.registerForm.phone);
          params.append('addr', this.registerForm.addr);
          params.append('flag', this.registerForm.flag);
          setConsumer(params)
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
              console.log(err);
            });
        }
      })

    },
    //弹出编辑页面
    handleEdit(row) {
      this.editVisible = true;
      this.form = row
    },
    //保存编辑页面修改的数据
    editSave() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          params.append('id', this.form.id);
          params.append('no', this.form.no);
          params.append('name', this.form.name);
          params.append('password', this.form.password);
          params.append('college', this.form.college);
          params.append('studeClass', this.form.studeClass);
          params.append('phone', this.form.phone);
          params.append('addr', this.form.addr);
          params.append('flag', this.form.flag);
          updateConsumer(params)
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
    //删除一名用户
    deleteRow() {
      let params = new URLSearchParams();
      params.append('id', this.idx);
      delConsumer(params)
        .then(res => {
          if (res) {
            this.getData();
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
