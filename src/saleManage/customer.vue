<template>
  <div>
    <div>
      <el-button @click="addCustomer" type="primary" class="addCustomer">
        <i class="el-icon-circle-plus-outline">添加客户</i>
      </el-button>
      <el-dialog title="添加客户" :visible.sync="viewNewForm" width="30%"> 
        <el-form :model="newForm" :rules="rules" ref="newForm" label-width="80px" >
          <el-form-item prop="customerCode" label="客户编号">
            <el-input v-model="newForm.customerCode"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="客户名称">
            <el-input v-model="newForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="passWord" label="客户密码">
            <el-input type="password" v-model="newForm.passWord"></el-input>
          </el-form-item>
          <el-form-item prop="contactor" label="联系人">
            <el-input v-model="newForm.contactor"></el-input>
          </el-form-item>
          <el-form-item prop="address" label="地址">
            <el-input v-model="newForm.address"></el-input>
          </el-form-item>
          <el-form-item prop="postCode" label="邮政编码">
            <el-input v-model="newForm.postCode"></el-input>
          </el-form-item>
          <el-form-item prop="createDate" label="注册日期" >
            <el-input v-model="newForm.createDate" readonly></el-input>
          </el-form-item>
          <el-form-item prop="tel" label="电话">
            <el-input v-model="newForm.tel"></el-input>
          </el-form-item>
          <el-form-item prop="fax" label="传真">
            <el-input v-model="newForm.fax"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addcancel">取消</el-button>
          <el-button @click="submitAdd">提交</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table :data="customerData">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="customerCode" label="客户编号" width="110"></el-table-column>
      <el-table-column prop="name" label="客户名称" width="120"></el-table-column>
      <el-table-column prop="contactor" label="联系人" width="100"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="postCode" label="邮政编码" width="80"></el-table-column>
      <el-table-column prop="createDate" label="注册日期"></el-table-column>
      <el-table-column prop="tel" label="电话" width="120"></el-table-column>
      <el-table-column prop="fax" label="传真" width="80"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="delCustomer(scope.row)">删除</el-button>
          <el-button size="small" @click="update(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加客户" :visible.sync="viewUpdateForm" width="30%">
      <el-form :model="updateForm" :rules="rules" ref="updateForm" label-width="80px">
        <el-form-item label="客户编号" prop="customerCode">
          <el-input v-model="updateForm.customerCode" readonly></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="name">
          <el-input v-model="updateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="客户密码" prop="passWord">
          <el-input type="password" v-model="updateForm.passWord"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactor">
          <el-input v-model="updateForm.contactor"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="updateForm.address"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postCode">
          <el-input v-model="updateForm.postCode"></el-input>
        </el-form-item>
        <el-form-item laber="注册日期" prop="createDate">
          <el-input v-model="updateForm.createDate"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="updateForm.tel"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="fax">
          <el-input v-model="updateForm.fax"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewUpdateForm=false">取消</el-button>
        <el-button @click="submitUpdate">提交</el-button>
      </div>
    </el-dialog>
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="pagedown"></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
const qs = require("querystring");
import dayjs from "dayjs";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      customerData: [],
      total: 0,
      currentPage: 1,
      viewNewForm: false,
      viewUpdateForm: false,
      changeTypes: [
        {
          value: "损耗",
          label: "损耗"
        },
        {
          value: "盘余",
          label: "盘余"
        }
      ],
      updateForm: {
        customerCode: "",
        name: "",
        passWord: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: dayjs().format("YYYY-MM-DD"),
        tel: "",
        fax: ""
      },
      newForm: {
        customerCode: "",
        name: "",
        passWord: "",
        contactor: "",
        address: "",
        postCode: "",
        createDate: dayjs().format("YYYY-MM-DD"),
        tel: "",
        fax: ""
      },
      rules: {
        customerCode: [
          { required: true, message: "请输入客户编码", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]{4,20}$/,
            message: "请输入4~20位数字字母",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "请输入客户名称", trigger: "blur" },
          { min: 1, max: 100, message: "请输入1~100字符", trigger: "blur" }
        ],
        passWord:[
          { required: true, message: "请输入客户密码", trigger: "blur" },
          { min: 4, max: 20, message: "请输入4~20字符", trigger: "blur" } 
        ],
        contactor:[{ required: true, message: "请输入联系人", trigger: "blur" }],
        tel:[{ required: true, message: "请输入电话", trigger: "blur" }]
      }
    };
  },
  methods: {
    addcancel(){
       Object.keys(this.newForm).forEach(key => this.newForm[key] = '');
      this.viewNewForm=false
        this.$refs.newForm.resetFields();
    },
    getData() {
      axios({
        url: "/api/main/sell/customer/show",
        method: "get",
        params: {
          page: this.currentPage
        }
      })
        .then(resp => {
          this.customerData = resp.data.list;
          this.total = resp.data.total;
          console.log(resp);
          
        })
        .catch(err => {
          console.log(err);
        });
    },
    pagedown(current) {
      this.currentPage = current;
      this.getData();
    },
    addCustomer() {
      this.viewNewForm = true;
    },
    submitAdd() {
       this.$refs['newForm'].validate(valid => {
        if (valid) {
      axios({
        url: "api/main/sell/customer/add",
        method: "post",
        data: qs.stringify(this.newForm)
      })
        .then(resp => {
          this.getData();
          this.viewNewForm = false;
          // console.log(resp.data);
          Object.keys(this.newForm).forEach(key => this.newForm[key] = '');
           this.$message({type: "success",message: "添加成功"});
        })
        .catch(err => {
          console.log(err);
        });
        }
       })
    },
    //删除客户
    delCustomer(r) {
      this.$confirm("是否确认删除", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: "api/main/sell/customer/delete",
            method: "post",
            data: qs.stringify({
              customerCode: r.customerCode
            })
          })
            .then(resp => {
              if (resp.data.code == 4) {
                console.log(resp);
                this.$message({
                  type: "error",
                  message: resp.data.message.match(/[\u4e00-\u9fa5]/g).join("")
                });
              } else if (resp.data.code == 2) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
              }
              this.getData();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //转移数据
    update(r) {
      this.viewUpdateForm = true;
      this.updateForm.customerCode = r.customerCode;
      this.updateForm.name = r.name;
      this.updateForm.passWord=r.passWord
      this.updateForm.contactor = r.contactor;
      this.updateForm.address = r.address;
      this.updateForm.postCode = r.postCode;
      this.updateForm.tel = r.tel;
      this.updateForm.fax = r.fax;
    },
    //提交更新
    submitUpdate() {
       this.$refs['updateForm'].validate(valid => {
        if (valid) {
      axios({
        url: "api/main/sell/customer/update",
        method: "post",
        data: qs.stringify(this.updateForm)
      })
        .then(resp => {
          console.log(resp);
          this.getData();
          this.viewUpdateForm = false;
           this.$message({type: "success",message: "修改成功"});
        })
        .catch(err => {
          console.log(err);
        });
        }
       })
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style>
.el-table td,
.el-table th {
  text-align: center;
}
.addCustomer{margin-bottom:5px}
</style>
