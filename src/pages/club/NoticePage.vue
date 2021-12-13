<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="queryForm.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="queryForm.publish" placeholder="账号类别">
              <el-option label="全部" value=""></el-option>
              <el-option label="发布" value="1"></el-option>
              <el-option label="未发布" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData()">查询</el-button>
            <el-button type="info" @click="restData()">重置</el-button>
            <el-button type="success" @click="addUserBtn()">添加新公告</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-table size="mini" ref="multipleTable" style="width:100%" height="480px" :data="tableData"
              @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column label="是否发布" width="100" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.publish"
            @change="changePublishStatus(scope.row)"
            active-value="1"
            inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <!-- <el-table-column prop="content" label="内容" align="center"></el-table-column> -->
      <el-table-column prop="crtTime" label="创建时间" width="180" align="center"></el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click="handleEdit(scope.row)">内容</el-button> -->
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

    <el-dialog title="添加新公告" :visible.sync="centerDialogVisible" width="600px" center>
      <el-form :model="addForm" ref="addForm" label-width="80px" :rules="rules">
        <el-form-item prop="title" label="标题" size="mini">
          <el-input v-model="addForm.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item prop="publish" label="状态" size="mini">
          <input type="radio" name="publish" value="1" v-model="addForm.publish">&nbsp;发布&nbsp;&nbsp;
          <input type="radio" name="publish" value="0" v-model="addForm.publish">&nbsp;不发布
        </el-form-item>
        <el-form-item label="内容" size="mini">
          <el-input type="textarea" v-model="textContent" :rows="11"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
                <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
                <el-button size="mini" @click="addNotice">确定</el-button>
            </span>
    </el-dialog>

    <el-dialog title="修改公告" :visible.sync="editVisible" width="600px" center>
      <el-form :model="form" ref="form" label-width="80px" :rules="rules">
        <el-form-item prop="title" label="标题" size="mini">
          <el-input v-model="form.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item prop="publish" label="状态" size="mini">
          <input type="radio" name="publish" value="1" v-model="form.publish">&nbsp;发布&nbsp;&nbsp;
          <input type="radio" name="publish" value="0" v-model="form.publish">&nbsp;不发布
        </el-form-item>
        <el-form-item label="内容" size="mini">
          <el-input type="textarea" v-model="textContent" :rows="11"></el-input>
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
import {getNoticeList, addNotice, updateNotice, deleteNotice, publishNotice} from '../../api';
import {mixin} from '../../mixins';

export default {
  mixins: [mixin],
  data() {
    return {
      centerDialogVisible: false, //添加弹窗是否显示
      editVisible: false,         //编辑弹窗是否显示
      delVisible: false,          //删除弹窗是否显示
      addForm: {      //添加框
        title: '',
        content: '',
        publish: '1'
      },
      textContent: '',
      form: {},
      tableData: [],
      queryForm: {
        title: '',
        name: '',
        publish: ''
      },
      currentSize: 0,
      pageSize: 10,    //分页每页大小
      currentPage: 1,  //当前页
      idx: -1,          //当前选择项
      multipleSelection: [],   //哪些项已经打勾
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'}
        ],
        publish: [
          {required: true, message: '请输入宿舍', trigger: 'blur'}
        ],
      }
    }
  },
  computed: {
    //计算当前搜索结果表里的数据
    // data() {
    //   console.log()
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
      this.getData()
    },
    // 重置
    restData() {
      this.queryForm = {
        title: '',
        publish: ''
      }
      this.currentSize = 0
      this.pageSize = 10
      this.currentPage = 1
      this.getData();
    },
    //查询所有
    getData() {
      this.tableData = [];
      let params = new URLSearchParams();
      params.append('title', this.queryForm.title);
      params.append('publish', this.queryForm.publish);
      params.append('page', this.currentPage);
      params.append('limit', this.pageSize);
      getNoticeList(params).then(res => {
        this.tableData = res.data.data;
        this.currentSize = res.data.count;
        // this.currentPage = 1;
      })
    },
    //添加弹窗按钮
    addUserBtn() {
      this.addForm = {      //添加框
        title: '',
        content: '',
        publish: '1'
      }
      this.textContent = '';
      this.centerDialogVisible = true;
    },
    //添加
    addNotice() {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          params.append('title', this.addForm.title);
          params.append('content', this.textContent);
          params.append('publish', this.addForm.publish);
          addNotice(params)
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
          params.append('title', this.form.title);
          params.append('content', this.textContent);
          params.append('publish', this.form.publish);
          updateNotice(params)
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
      deleteNotice(params)
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
    changePublishStatus(row) {
      let params = new URLSearchParams();
      params.append('id', row.id);
      params.append('publish', row.publish);
      publishNotice(params)
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
