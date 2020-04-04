<template>
  <el-main>
    <el-row>
      <el-col :span="24">
        <el-button icon="el-icon-circle-plus-outline" @click="add">增加明细</el-button>
        <el-button icon="el-icon-circle-plus-outline" @click="save">保存</el-button>
      </el-col>
    </el-row>
        <el-form :model="newSale" ref="newSale" label-width="120px" :rules="rules">
            <el-row>
        <el-col :span="8">
         <el-form-item label="销售单编号" prop="soId">
            <el-input v-model="newSale.soId" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
         <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="newSale.createTime" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
         <el-form-item label="客户选择" prop="customerCode">
            <el-select v-model="newSale.customerCode" placeholder="请选择" @change="sup">
              <el-option
                v-for="(item,index) in customer"
                :key="index"
                :label="item.name"
                :value="item.customerCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="创建用户" prop="account">
            <el-input v-model="newSale.account" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
           <el-form-item label="附加费用" prop="tipFee">
            <el-input v-model="newSale.tipFee" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
             <el-form-item label=" 销售单总价" prop="productTotal">
            <el-input v-model="totalPrice" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="付款方式" prop="payType">
            <el-select v-model="newSale.payType" placeholder="请选择" @change="select">
              <el-option
                v-for="(item,index) in Type"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最低预付款金额" prop="prePayFee">
            <el-input v-model="newSale.prePayFee" :disabled="flag"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="newSale.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
        </el-form>
    <el-row>
      <el-col :span="24">
        <el-table border :data="newSale.soitems">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="产品编号" prop="productCode">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.productCode">
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-edit-outline button"
                  @click="go(scope.$index)"
                ></i>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="产品名称" prop="name">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="数量单位" prop="unitName">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.unitName" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="销售数量" prop="productCode">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.num"
                placeholder="请输入内容"
                onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="销售单价" prop="unitPrice">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.unitPrice"
                placeholder="请输入内容"
                readonly
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="明细总价" prop="itemPrice">
            <template slot-scope="scope">
              <!-- <span>{{scope.row.num*scope.row.unitPrice|two}}</span> -->
              <el-input v-model="scope.row.itemPrice" readonly></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-table border :data="pro">
        <el-table-column label="选择">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="产品编号">
          <template slot-scope="scope">
            <span>{{scope.row.productCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量单位">
          <template slot-scope="scope">
            <span>{{scope.row.unitName}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>
<script>
import axios from "axios";
const qs = require("querystring");
import cookie from "js-cookie";
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      flag: true,

      //明细数据
      pro: [],
      radio: "",
      pointIndex: "",

      //

      Type: [
        { value: 1, label: "货到付款" },
        { value: 2, label: "款到发货" },
        { value: 3, label: "预付款到发货" }
      ],
      newSale: {
        soId: new Date(),
        customerCode: "",
        account: cookie.get("account"),
        createTime: new Date(),
        tipFee: "0",
        productTotal: "",
        soTotal: "",
        payType: "",
        prePayFee: "0",
        status: "1",
        remark: "",
        soitems: []
      },
      customer: [],
      rules: {
        customerCode: [
          { message: "请选择供应商名称", trigger: "blur", required: true }
        ],
        tipFee: [
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "不能为负数",
            trigger: "blur"
          }
        ],
        prePayFee: [
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "不能为负数",
            trigger: "blur"
          }
        ],
        productTotal: [
          { message: "请在明细里完整填写", trigger: "blur", required: true },
          {
            pattern: /^\d+(\.\d+)?$/,
            message: "不能为负数",
            trigger: "blur"
          }
        ],
        payType: [{ required: true }]
      }
    };
  },
  filters: {
    two(value) {
      return parseFloat(value).toFixed(2);
    }
  },
  methods: {
    //上传数据
    save() {      
        this.$refs.newSale.validate(valid => {
          if (valid&&this.totalPrice!=0) {
            console.log(this.newSale);
            axios({
              url: "api/main/sell/somain/add",
              method: "post",
              headers: { "Content-Type": "application/json" },
              data: JSON.stringify(this.newSale)
            })
              .then(resp => {
                console.log(resp);
                this.$message({
                  type: "success",
                  message: "保存成功"
                });
                this.$router.push("/newSale");
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            console.log("输入的数据不合法");
            alert("输入的数据不合法");
          }
        });
    },

    //删除行
    handleDelete(index) {
      this.newSale.soitems.splice(index, 1);
    },

    //创建时间
    time() {
      let year = this.newSale.createTime.getFullYear();
      let month = this.newSale.createTime.getMonth() + 1;
      let date = this.newSale.createTime.getDate();
      let hours = this.newSale.createTime.getHours();
      let minutes = this.newSale.createTime.getMinutes();
      let seconds = this.newSale.createTime.getSeconds();
      return (this.newSale.createTime = `${year}-${
        month < 10 ? "0" + month : month
      }-${date < 10 ? "0" + date : date}`);
    },
    timea() {
      let y = this.newSale.soId.getFullYear();
      let m = this.newSale.soId.getMonth() + 1;
      let d = this.newSale.soId.getDate();
      let h = this.newSale.soId.getHours();
      let min = this.newSale.soId.getMinutes();
      let s = this.newSale.soId.getSeconds();
      return `${y}${m < 10 ? "0" + m : m}${d < 10 ? "0" + d : d}${
        h < 10 ? "0" + h : h
      }${min < 10 ? "0" + min : min}${s < 10 ? "0" + s : s}`;
    },

    //添加行
    add() {
      var newValue = {
        productCode: "",
        unitPrice: "",
        num: "",
        unitName: "",
        itemPrice: ""
      };
      this.newSale.soitems.push(newValue);
    },

    //选择器传值
    //付款方式
    select(value) {
      let t = "";
      t = this.Type.find(item => {
        return (item.value = value);
      });

      this.newSale.payType = value;
      if (value == 3) {
        this.flag = false;
      }
    },

    //客户
    sup(value) {
      let n = "";
      n = this.customer.find(item => {
        return (item = value);
      });
      this.newSale.customerCode = value;
    },

    //选择明细页显示
    go(index) {
      this.dialogVisible = true;
      this.pointIndex = index;
      console.log(index);
    },

    //确认选择
    confirm() {
      this.dialogVisible = false;
      const selected = this.pro[this.radio];
      console.log(selected);
      this.newSale.soitems[this.pointIndex].productCode = selected.productCode;
      this.newSale.soitems[this.pointIndex].name = selected.name;
      this.newSale.soitems[this.pointIndex].unitName = selected.unitName;
      this.newSale.soitems[this.pointIndex].unitPrice = selected.price;
    },
  },
computed:{
 totalPrice() {
      this.newSale.soitems.map(item => {
        item.itemPrice = Math.round(item.num * item.unitPrice*100)/100;
      });
      this.newSale.productTotal = this.newSale.soitems.reduce((prev, cur) => {
        prev += cur.itemPrice;
        return prev;
      }, 0);

      this.newSale.soTotal =
        Number(this.newSale.productTotal) + Number(this.newSale.tipFee) + Number(this.newSale.prePayFee);
        return Math.round(this.newSale.soTotal*100)/100
    }
},
  created() {
    this.time();
    this.newSale.soId = this.timea();
    axios.get(`/api/main/sell/customer/show`).then(resp => {
      this.customer = resp.data.list;
    });

    axios({
      url: "/api/main/sell/product/all ",
      method: "get"
    })
      .then(res => {
        this.pro = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style  scoped>
.button {
  cursor: pointer;
}
.t {
  padding: 10px 0;
}
</style>