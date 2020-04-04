<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="货到付款" name="1">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column align="center" fixed type="index" label="序号" width="50"></el-table-column>
          <el-table-column align="center" prop="soId" label="销售单编号" width="140"></el-table-column>
          <el-table-column align="center" prop="createTime" label="创建时间" width="170"></el-table-column>
          <el-table-column align="center" label="客户名称" width="130">
            <template slot-scope="scope">
              <span>{{scope.row.customerName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="account" label="创建用户" width="100"></el-table-column>
          <el-table-column align="center" prop="tipFee" label="附加费用" width="85"></el-table-column>
          <el-table-column prop="productTotal" label="产品总价" width="110"></el-table-column>
          <el-table-column prop="soTotal" label="销售单总价格" width="110"></el-table-column>
          <el-table-column align="center" prop="payType" label="付款方式" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.payType==1">货到付款</span>
              <span v-if="scope.row.payType==2">款到发货</span>
              <span v-if="scope.row.payType==3">预付款到发货</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="最低预付款金额" width="120"></el-table-column>
          <el-table-column align="center" label="处理状态" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">新增</span>
              <span v-if="scope.row.status==2">已发货</span>
              <span v-if="scope.row.status==3">已收款</span>
              <span v-if="scope.row.status==4">已了结</span>
              <span v-if="scope.row.status==5">已预付</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="details(scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="display(scope.row)" type="text" size="small">收款</el-button>
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
      </el-tab-pane>
      <el-tab-pane label="款到发货" name="2">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column align="center" fixed type="index" label="序号" width="50"></el-table-column>
          <el-table-column align="center" prop="soId" label="销售单编号" width="140"></el-table-column>
          <el-table-column align="center" prop="createTime" label="创建时间" width="170"></el-table-column>
          <el-table-column align="center" label="客户名称" width="130">
            <template slot-scope="scope">
              <span>{{scope.row.customerName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="account" label="创建用户" width="100"></el-table-column>
          <el-table-column align="center" prop="tipFee" label="附加费用" width="85"></el-table-column>
          <el-table-column prop="productTotal" label="产品总价" width="110"></el-table-column>
          <el-table-column prop="soTotal" label="销售单总价格" width="110"></el-table-column>
          <el-table-column align="center" prop="payType" label="付款方式" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.payType==1">货到付款</span>
              <span v-if="scope.row.payType==2">款到发货</span>
              <span v-if="scope.row.payType==3">预付款到发货</span>
            </template>
          </el-table-column>
          <el-table-column prop="prePayFee" label="最低预付款金额" width="120"></el-table-column>
          <el-table-column align="center" label="处理状态" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">新增</span>
              <span v-if="scope.row.status==2">已发货</span>
              <span v-if="scope.row.status==3">已收款</span>
              <span v-if="scope.row.status==4">已了结</span>
              <span v-if="scope.row.status==5">已预付</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="details(scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="display(scope.row)" type="text" size="small">收款</el-button>
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
      </el-tab-pane>
      <el-tab-pane label="预付款到货" name="3">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column align="center" fixed type="index" label="序号" width="50"></el-table-column>
          <el-table-column align="center" prop="soId" label="销售单编号" width="140"></el-table-column>
          <el-table-column align="center" prop="createTime" label="创建时间" width="170"></el-table-column>
          <el-table-column align="center" label="客户名称" width="130">
            <template slot-scope="scope">
              <span>{{scope.row.customerName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="account" label="创建用户" width="100"></el-table-column>
          <el-table-column align="center" prop="tipFee" label="附加费用" width="85"></el-table-column>
          <el-table-column prop="productTotal" label="产品总价" width="110"></el-table-column>
          <el-table-column prop="soTotal" label="销售单总价格" width="110"></el-table-column>
          <el-table-column align="center" prop="payType" label="付款方式" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.payType==1">货到付款</span>
              <span v-if="scope.row.payType==2">款到发货</span>
              <span v-if="scope.row.payType==3">预付款到发货</span>
            </template>
          </el-table-column>
          <el-table-column prop="prePayFee" label="最低预付款金额" width="120"></el-table-column>
          <el-table-column align="center" label="处理状态" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">新增</span>
              <span v-if="scope.row.status==2">已发货</span>
              <span v-if="scope.row.status==3">已收款</span>
              <span v-if="scope.row.status==4">已了结</span>
              <span v-if="scope.row.status==5">已预付</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="details(scope.row)" type="text" size="small">详情</el-button>
              <el-button @click="display(scope.row)" type="text" size="small">收款</el-button>
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
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="销售单详情" :visible.sync="dialogVisible" width="60%">
      <el-table :data="detailsData" style="width: 100%" class="detailsData">
        <el-table-column prop="soId" label=" 销售单编号" width="145"></el-table-column>
        <el-table-column prop="productName" label="产品名称" width="145"></el-table-column>
        <el-table-column prop="productCode" label="产品编号" width="145"></el-table-column>
        <el-table-column prop="unitName" label="数量单位" width="145"></el-table-column>
        <el-table-column prop="unitPrice" label="单位价格" width="145"></el-table-column>
        <el-table-column prop="itemPrice" label="产品总价" width="145"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="销售单收款" :visible.sync="dialogVisible1" width="30%">
      <p><span>采购单编号</span><span class="money">收付款金额</span></p>
      <p><span>{{displayData.soId}}</span><span class="money">{{displayData.money}}</span></p>
      <button type="primary" @click="handleClick" :plain="true">收款</button>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
    return {
      displayData: {
        soId: "",
        money: ""
      },
      tableData: [],
      activeName: "1",
      proCateList: [],
      detailsData: [],
      total: 0,
      loading: true,
      type: 3,
      dialogVisible: false,
      dialogVisible1: false,
      gathering: ""
    };
  },
  created() {
    this.getOrders();
  },
  filters: {},
  methods: {
    getOrders() {
      axios({
        url: "api/main/sell/somain/show",
        method: "get",
        params: {
          payType: this.activeName,
          type: this.type
        }
      })
        .then(resp => {
          this.tableData = resp.data.list;
          this.total = resp.data.total;
          console.log(resp.data);
          //   console.log(this.tableData);
        })
        .catch(er => {
          console.log(er);
        });
    },
    display(row) {
      if (this.activeName == 3 && row.status == 1) {
        this.gathering = 2;
      } else {
        this.gathering = 1;
      }
      this.$confirm(
        `即将对此订单进行收${
          this.gathering == 2 ? "预付款" : "款"
        }操作, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          if(this.gathering == 2){
            this.displayData.money = row.prePayFee;
          } else if (this.activeName == 3 && row.status != 1) {
            this.displayData.money = row.soTotal - row.prePayFee;
          } else {
            this.displayData.money = row.soTotal;
          };
          this.displayData.soId=row.soId
          console.log(this.displayData)
          this.$message({
              type: "info",
            message: "请付款!"
          });
          this.dialogVisible1 = true;
        })

        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消收${this.gathering == 2 ? "预付款" : "款"}`
          });
        });
        
    },
    handleClick(row) {
      axios({
        url: "api/main/finance/receipt",
        method: "post",
        params: {
          soId: this.displayData.soId,
          type: this.gathering
        }
      }).then(resp => {
        this.$message({message:'收款成功',type:"success"});
        this.getOrders();
        this.dialogVisible1 = false;
      });
    },
    getProCateList(page, categoryId) {
      this.loading = true;
      axios({
        url: "api/main/sell/somain/show",
        method: "get",
        params: {
          page,
          payType: this.activeName,
          type: this.type
        }
      }).then(resp => {
        this.user = resp.data.list;
        this.proCateList = resp.data.list;
        this.total = resp.data.total;
        this.loading = false;
      });
    },
    pagechange(page) {
      this.getProCateList(page);
      //   console.log(page);
    },
    details(row) {
      axios({
        url: "api/main/sell/somain/queryItem",
        method: "get",
        params: {
          soId: row.soId
        }
      }).then(resp => {
        this.detailsData = resp.data;
        // this.proCateList = resp.data.list;
        console.log(this.detailsData);
      });
      this.dialogVisible = true;
    }
  },
  watch: {
    activeName: function(val, oldVal) {
      this.getOrders();
    }
  }
};
</script>
<style scoped>

.money{margin-left:120px;}
p{margin: 0;padding:0;line-height: 30px;text-align: center;border:1px solid #ddd}
</style>