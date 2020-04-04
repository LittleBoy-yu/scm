<template>
  <!--  采购单添加-->
  <div>
    <div class="Breadcrumb">
      <el-row class="Breadcrumb_row">
        <el-col :span="1">
          <b>位置：</b>
        </el-col>
        <el-col :span="23">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/OrdersAdd' }">采购管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加采购单</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
    </div>

    <!--添加用户-->
    <div style="margin:10px;">
      <el-button type="info" icon="el-icon-circle-plus" plain @click="handleEdit">添加明细</el-button>
      <el-button type="info" icon="el-icon-circle-plus" plain @click="preserve">保存</el-button>
    </div>

    <el-form :model="user" ref="regForm" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="采购单编号" prop="poId">
            <el-input v-model="user.poId" readonly unselectable="on">{{user.poId}}</el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createTime">
            <el-input v-model="user.createTime" readonly unselectable="on">{{user.createTime}}</el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="供应商" prop="venderCode">
            <el-select v-model="user.venderCode" placeholder="请选择供应商" readonly unselectable="on">
              <el-option
                v-for="(item,index) in supplier"
                :key="index"
                :label="item.name"
                :value="item.venderCode"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="创建用户" prop="account">
            <el-input v-model="user.account"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="附加费用" prop="tipFee">
            <el-input v-model="user.tipFee" @change="totalPrice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="采购产品总价" prop="productTotal">
            <el-input v-model="user.productTotal" readonly unselectable="on"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="付款方式" prop="payType">
            <el-select v-model="user.payType" required>
              <el-option label="货到付款" value="1"></el-option>
              <el-option label="款到发货" value="2"></el-option>
              <el-option label="预付款到发货" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最低预付款金额" prop="prePayFee">
            <el-input placeholder="金额" v-model="user.prePayFee"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注" prop="remark">
            <el-input placeholder="备注" v-model="user.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 下面一行采购单明细 -->
      <!-- 产品编号 -->
      <el-table :data="user.poitems" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="productCode" label="产品编号">
          <!-- 添加采购单明细 -->
          <template slot-scope="scope">
            <el-dialog title="添加采购单" :visible.sync="dialogFormVisible">
              <el-table :data="show" style="width: 100%">
                <el-table-column label="选择">
                  <template slot-scope="scope">
                    <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column prop="productCode" label="产品编号"></el-table-column>
                <el-table-column prop="name" label="产品名称"></el-table-column>
                <el-table-column prop="categoryId" label="数量单位"></el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
              </div>
            </el-dialog>
            <div style=" display:flex">
              <el-input v-model="scope.row.productCode"></el-input>
              <el-button
                type="primary"
                @click="proid(scope.$index)"
                style="width:40px;height:40px"
                class="el-icon-edit-outline"
              ></el-button>
            </div>
          </template>
        </el-table-column>
        <!-- 弹出文本框结束 -->

        <el-table-column prop="name" label="产品名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="unitName" label="数量单位">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unitName"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="产品数量">
          <template slot-scope="scope">
            <el-input   size="small"  placeholder="请输入内容"   @change="totalPrice" v-model="scope.row.num"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="unitPrice" label="采购单价">
          <template slot-scope="scope">
            <el-input     size="small"  placeholder="请输入内容"
                @change="totalPrice" v-model="scope.row.unitPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="itemPrice" label="明细总价">
          <template slot-scope="scope">
            <el-input v-model="scope.row.itemPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="primary" @click="detai(scope.row)">确定</el-button> -->
            <el-button type="primary" size="primary" @click="del(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import dayjs from "dayjs";
import cookie from "js-cookie";
import axios from "axios";
const qs = require("querystring");
export default {
  name: "OrdersAdd",
  data() {
    return {
      show: [],
      page: 1,

      user: {
        poId: "", //采购单编号
        venderCode: "", //供应商编号
        account: cookie.get("username"), //创建用户
        createTime: "", //创建时间
        tipFee: "0", //附加费用
        productTotal: "", //产品总价
        poTotal: "", //采购总价
        payType: "", //付款方式
        prePayFee: "0", //最低预付款
        status: "1", //采购单状态
        remark: "", //备注
        poitems: [], //采购单明细
        itemPrice: "",
        num:""
      },
      po: [],
      choose: "",
      radio: "",
      supplier: [],
      dialogFormVisible: false
    };
  },
  created() {
    axios({
      url: "/api/main/purchase/vender/all",
      method: "get"
    })
      .then(res => {
        this.supplier = res.data;
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    //获得服务器数据
    axios({
      url: "/api/main/sell/product/all ",
      method: "get"
    })
      .then(res => {
        this.show = res.data;
        console.log(this.show);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    this.user.createTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    this.user.poId = dayjs().format("YYYYMMDDHHmmss");
  },
  methods: {
    handleEdit() {
      //点添加
      let obj = {
        productCode: "",
        unitPrice: "",
        num: "",
        unitName: "",
        itemPrice: ""
      };
      this.user.poitems.push(obj);
    },

    proid(index) {
      //产品序列按钮
      this.dialogFormVisible = true;
      this.choose = index;
      console.log(this.choose);
    },

    confirm() {
      //弹出文本框确定
      this.dialogFormVisible = false;
      const selected = this.show[this.radio];
      this.user.poitems[this.choose].productCode = selected.productCode;
      this.user.poitems[this.choose].name = selected.name;
      this.user.poitems[this.choose].unitName = selected.unitName;
    },

    totalPrice(row) {
      //产品总价
      this.user.poitems.map(item => {
        item.itemPrice = item.num * item.unitPrice;
      });
      this.user.productTotal = this.user.poitems.reduce((prev, cur) => {
        prev += cur.itemPrice;
        return prev;
      }, 0);
      this.user.poTotal =
        Number(this.user.productTotal) + Number(this.user.tipFee);
    },

    del(index, row) {//删除
      this.user.poitems.splice(index, 1);
      this.user.productTotal -= row.unitPrice * row.num;
    },

    preserve() {
      //确认保存提交新的采购单
      axios
        .post("api/main/purchase/pomain/add", JSON.stringify(this.user), {
          headers: {
            Authorization: cookie.get("token"),
            "Content-Type": "application/json"
          }
        })
        .then(resp => {
          let res = resp.data;
          console.log(res);
          if (res.code == 2) {
            alert(`添加成功`);
            this.$router.push("/Neworders");
          }
        });
    }
  }
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
}
.Breadcrumb {
  height: 40px;
  background: #f0f9fd;
  font-size: 13px;
  font-weight: 500;
  border-bottom: 1px #ccc solid;
}
.Breadcrumb_row {
  line-height: 40px;
}
.el-breadcrumb {
  line-height: 40px;
  font-size: 13px;
  font-weight: 500;
}
</style>