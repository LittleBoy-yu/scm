<template>
  <div>
    <el-button type="primary" @click="add" size="small" class="addKind">
      <i class="el-icon-circle-plus-outline el-icon--left"></i>增加
    </el-button>
    <el-table :data="tableData" style="width: 100%;" align="center">
      <el-table-column type="index" label="序号" width="150"></el-table-column>
      <el-table-column prop="categoryId" label="分类序列号" width="150"></el-table-column>
      <el-table-column prop="name" label="名称" width="280"></el-table-column>
      <el-table-column prop="remark" label="描述" width="300"></el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button type="warning" @click="change(scope.row)" size="small">修改</el-button>
          <el-button type="danger" @click="del(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="pagechange"
      ></el-pagination>
    </div>
    <!-- 添加 -->
 <el-dialog class="dislog" title="新增产品分类" :visible.sync="dialogVisible1" width="30%"  @close="addcancel">
      <el-form :model="addData" :rules="rules" ref="addData" label-width="100px">
        <el-form-item label="分类序列号">
          <el-input class="dislog" type="text" readonly placeholder="分类序列号（系统自动分配）"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input class="dislog" type="text" v-model="addData.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input class="dislog" type="text" v-model="addData.remark" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addcancel">取 消</el-button>
        <el-button type="primary" :plain="true" @click="addto">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="dialogVisible2" width="30%">
      <el-form :model="changeKind" :rules="rules1" ref="changeKind" label-width="100px">
        <el-form-item label="分类序列号">
          <el-input class="dislog" type="text" readonly v-model="changeKind.categoryId"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input class="dislog" type="text" v-model="changeKind.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input class="dislog" type="text" v-model="changeKind.remark" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2=false">取 消</el-button>
        <el-button type="primary" @click="changecheck">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog title="提示" :visible.sync="dialogVisible3" width="30%">
      <p>是否删除改产品分类</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="delcheck">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
    return {
      tableData: [],
      addData: {
        name: "",
        remark: ""
      },
      changeKind: {
        categoryId: "",
        name: "",
        remark: ""
      },
      total: 0,
      loading: true,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      page: 1,
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
      },
      rules1: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }]
      }
    };
  },
  created() {
    axios({
      url: "api/main/sell/category/show",
      method: "get",
      data: {}
    }).then(resp => {
      this.tableData = resp.data.list;
      this.total = resp.data.total;
      //   console.log("resp.data", resp);
    });
  },
  methods: {
    add() {
      this.dialogVisible1 = true;
    },
    change(row) {
      this.changeKind.categoryId = row.categoryId;
      this.changeKind.name = row.name;
      this.changeKind.remark = row.remark;
      console.log(this.changeKind);
      this.dialogVisible2 = true;
    },
    del(row) {
      this.categoryId = row.categoryId;
      this.dialogVisible3 = true;
    },
    // 翻页
    getProCateList(page) {
      this.loading = true;
      axios({
        url: "api/main/sell/category/show",
        method: "post",
        params: {
          page
        }
      }).then(resp => {
        this.tableData = resp.data.list;
        // this.proCateList = resp.data.list;
        this.total = resp.data.total;
        // console.log('resp.data.',resp.data)
        this.loading = false;
      });
    },
    pagechange(page) {
      this.getProCateList(page);
      console.log(page);
    },
    // 新增  取消
    addcancel() {
     Object.keys(this.addData).forEach(key => this.addData[key] = '');
        (this.dialogVisible1 = false);
        this.$refs.addData.resetFields();
    },
    // 新增  确定
    addto() {
      this.$refs["addData"].validate(valid => {
        if (valid) {
          axios({
            url: "api/main/sell/category/add",
            method: "post",
            params: {
              name: this.addData.name,
              remark: this.addData.remark
            }
          }).then(resp => {
            this.getProCateList();
            console.log("resp.data", resp);
            this.addcancel();
            this.$message({
              message: "恭喜,新增产品分类成功",
              type: "success"
            });
          });
        }
      });
    },
    // 修改  确定
    changecheck() {
      this.$refs['changeKind'].validate(valid => {
        if (valid) {
          axios({
            url: "api/main/sell/category/update",
            method: "post",
            params: {
              name: this.changeKind.name,
              categoryId: this.changeKind.categoryId,
              remark: this.changeKind.remark
            }
          })
            .then(resp => {
              this.getProCateList();
              // console.log("resp.data", resp);
              this.$message({
                message: "恭喜,产品修改成功",
                type: "success"
              });
              this.dialogVisible2 = false;
            })
            .catch(er => {
              console.log(er);
            });
        }
      });
    },
    // 删除分类
    delcheck() {
      axios({
        url: "api/main/sell/category/delete",
        method: "post",
        params: {
          categoryId: this.categoryId
        }
      }).then(resp => {
        if (resp.data.code == 2) {
          this.getProCateList();
          console.log("resp.data", resp.data);
          this.$message({
            message: "恭喜,产品分类删除成功",
            type: "success"
          });
        } else {
          this.$message({
            message: resp.data.message.match(/[\u4e00-\u9fa5]/g).join(""),
            type: "danger"
          });
        }
        this.dialogVisible3 = false;
      });
    }
  }
};
</script>
<style>
.el-table td,
.el-table th {
  text-align: center;
}
</style>
<style scoped>
.addKind {
  position: relative;
  left: -580px;
  margin: 10px 0;
}
.dislog {
  line-height: 60px;
}
</style>