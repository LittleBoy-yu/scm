<template>
  <div>
    <el-button type="primary" @click="add" size="small" class="addKind">
      <i class="el-icon-circle-plus-outline el-icon--left"></i>增加
    </el-button>
    <el-table :data="tableData" style="width: 100%;" align="center">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="productCode" label="产品编号" width="100"></el-table-column>
      <el-table-column prop="name" label="产品名称" width="200"></el-table-column>
      <el-table-column prop="unitName" label="数量单位" width="100"></el-table-column>
      <el-table-column prop="categoryName" label="分类名称" width="100"></el-table-column>
      <el-table-column prop="createDate" label="添加日期" width="200"></el-table-column>
      <el-table-column prop="price" label="销售价" width="100"></el-table-column>
      <el-table-column prop="remark" label="产品描述" width="230"></el-table-column>
      <el-table-column label="操作" width="180">
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
    <el-dialog
      class="dislog"
      title="新增产品"
      :visible.sync="dialogVisible1"
      width="30%"
      @close="addcancel"
    >
      <el-form ref="addData" :model="addData" label-width="80px" :rules="rules" :key="'addData'">
        <el-form-item label="产品编号" prop="productCode">
          <el-input v-model="addData.productCode"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="addData.name"></el-input>
        </el-form-item>
        <el-form-item label="产品分类" prop="categoryId">
          <el-select v-model="addData.categoryId" placeholder="产品分类" required>
            <el-option
              v-for="(item,index) in category"
              :key="index"
              :label="item.name"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量单位" prop="unitName">
          <el-input v-model="addData.unitName"></el-input>
        </el-form-item>
        <el-form-item label="销售价" prop="price">
          <el-input v-model="addData.price"></el-input>
        </el-form-item>
        <el-form-item label="添加日期" prop="createDate">
          <el-input v-model="addData.createDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="addData.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addcancel">取 消</el-button>
        <el-button type="primary" :plain="true" @click="addto">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改产品" v-if="dialogVisible2" :visible.sync="dialogVisible2" width="30%">
      <el-form
        ref="changeKind"
        :model="changeKind"
        label-width="80px"
        :rules="rules"
        :key="'changeKind'"
      >
        <el-form-item label="产品编号" prop="productCode">
          <el-input v-model="changeKind.productCode" readonly></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="changeKind.name"></el-input>
        </el-form-item>
        <el-form-item label="产品分类" prop="categoryId">
          <el-select v-model="changeKind.categoryId" placeholder="产品分类">
            <el-option
              v-for="(item,index) in category"
              :key="index"
              :label="item.name"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量单位" prop="unitName">
          <el-input v-model="changeKind.unitName"></el-input>
        </el-form-item>
        <el-form-item label="销售价" prop="price">
          <el-input v-model="changeKind.price"></el-input>
        </el-form-item>
        <el-form-item label="添加日期" prop="createDate">
          <el-input v-model="changeKind.createDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="changeKind.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- <span slot="footer" class="dialog-footer"> -->
            <el-button @click="dialogVisible2=false">取 消</el-button>
            <el-button type="primary" :plain="true" @click="changecheck">确 定</el-button>
          <!-- </span> -->
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog title="提示" :visible.sync="dialogVisible3" width="30%">
      <p style="height:20px;line-height:20px">是否删除改产品分类</p>
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
import dayjs from "dayjs";
export default {
  data() {
    return {
      tableData: [],
      addData: {
        productCode: "",
        name: "",
        unitName: "",
        categoryId: "",
        price: "",
        remark: "",
        createDate: dayjs().format("YYYY-MM-DD HH:mm:ss")
      },
      changeKind: {
        productCode: "",
        name: "",
        unitName: "",
        categoryId: "",
        price: "",
        remark: "",
        createDate: ""
      },
      total: 0,
      loading: true,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      page: 1,
      category: [],
      rules: {
        productCode: [
          { required: true, message: "请输入产品编号", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]{4,20}$/,
            message: "不合规范,请输入4~20位数字字母",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入产品名称", trigger: "blur" },
          { min: 1, max: 100, message: "请输入1~100字符", trigger: "blur" }
        ],
        unitName: [
          { required: true, message: "请输入数量单位", trigger: "blur" }
        ],
        categoryId: [
          { required: true, message: "请选择产品分类", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入产品价格", trigger: "blur" },
          {
            pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
            message: "不合规范,请输入正数,小数仅限两位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    axios({
      url: "api/main/sell/product/show",
      method: "get",
      data: {}
    }).then(resp => {
      this.tableData = resp.data.list;
      this.total = resp.data.total;
      //   console.log("resp.data", resp.data);
    });
    axios({
      url: "api/main/sell/category/all",
      method: "get",
      data: {}
    }).then(resp => {
      this.category = resp.data;
    });
  },
  methods: {
    //     handle(){
    // this.addcancel()
    //     },
    add() {
      this.addData.createDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
      this.dialogVisible1 = true;
    },
    change(row) {
      this.changeKind.productCode = row.productCode;
      this.changeKind.name = row.name;
      this.changeKind.unitName = row.unitName;
      this.changeKind.categoryId = row.categoryId;
      this.changeKind.price = row.price;
      this.changeKind.remark = row.remark;
      this.changeKind.createDate = row.createDate;
      this.dialogVisible2 = true;
    },
    del(row) {
      this.productCode = row.productCode;
      this.dialogVisible3 = true;
    },
    // 翻页
    getProCateList(page) {
      this.loading = true;
      axios({
        url: "api/main/sell/product/show",
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
      Object.keys(this.addData).forEach(key => (this.addData[key] = ""));
      this.$refs.addData.resetFields();
      this.dialogVisible1 = false;
    },
    // 新增  确定
    addto() {
      this.$refs["addData"].validate(valid => {
        if (valid) {
          axios({
            url: "api/main/sell/product/add",
            method: "post",
            params: {
              name: this.addData.name,
              productCode: this.addData.productCode,
              unitName: this.addData.unitName,
              categoryId: this.addData.categoryId,
              price: this.addData.price,
              createDate: this.addData.createDate,
              remark: this.addData.remark
            }
          }).then(resp => {
            this.getProCateList();
            console.log("resp.data", resp);
            this.addcancel();
            if (resp.data.code == 2) {
              this.$message({
                message: "恭喜,新增产品分类成功",
                type: "success"
              });
            } else {
              this.$message({
                message: resp.data.message.replace(/[^\u4e00-\u9fa5]/gi, ""),
                type: "danger"
              });
            }
          });
        }
      });
    },
    // 修改  确定
    changecheck() {
      this.$refs["changeKind"].validate(valid => {
        if (valid) {
          axios({
            url: "api/main/sell/product/update",
            method: "post",
            params: {
              name: this.changeKind.name,
              productCode: this.changeKind.productCode,
              unitName: this.changeKind.unitName,
              categoryId: this.changeKind.categoryId,
              price: this.changeKind.price,
              createDate: this.changeKind.createDate,
              remark: this.changeKind.remark
            }
          }).then(resp => {
            this.getProCateList();
            console.log("resp.data", resp.data);
            this.dialogVisible2 = false;
            if (resp.data.code == 2) {
              this.$message({
                message: "恭喜,产品修改成功",
                type: "success"
              });
            } else {
              this.$message({
                message: resp.data.message.replace(/[^\u4e00-\u9fa5]/gi, ""),
                type: "warning"
              });
            }
          });
        }
      });
    },
    // 删除产品
    delcheck() {
      axios({
        url: "api/main/sell/product/delete",
        method: "post",
        params: {
          productCode: this.productCode
        }
      }).then(resp => {
        this.getProCateList();
        console.log("resp.data", resp.data);
        this.dialogVisible3 = false;
        if (resp.data.code == 2) {
          this.$message({
            message: "恭喜,产品分类删除成功",
            type: "success"
          });
        } else {
          this.$message({
            message: resp.data.message.replace(/[^\u4e00-\u9fa5]/gi, ""),
            type: "warning"
          });
        }
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