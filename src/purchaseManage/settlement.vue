<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="货到付款" @click="getOrders" name="1" >
        <el-table :data="tableData" border style="width: 100%;text-align:center">
          <el-table-column align="center" fixed type="index" label="序号" width="50"></el-table-column>
          <el-table-column align="center" prop="poId" label="采购单编号" width="140"></el-table-column>
          <el-table-column align="center" prop="createTime" label="创建时间" width="170"></el-table-column>
          <el-table-column align="center" prop="venderName" label="供应商名称" width="130"></el-table-column>
          <el-table-column align="center" prop="account" label="创建用户" width="100"></el-table-column>
          <el-table-column align="center" prop="tipFee" label="附加费用" width="80"></el-table-column>
          <el-table-column prop="productTotal" label="采购产品总价" width="110"></el-table-column>
          <el-table-column prop="poTotal" label="采购单总价格" width="110"></el-table-column>
          <el-table-column align="payType" prop="payType" label="付款方式" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.payType==1">货到付款</span>
            <span v-if="scope.row.payType==2">款到发货</span>
            <span v-if="scope.row.payType==3">预付款到发货</span>
          </template>
          </el-table-column>
          <el-table-column prop="prePayFee" label="最低预付款金额" width="120"></el-table-column>
          <el-table-column align="center"  label="处理状态" width="100">可了结</el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">了结</el-button>
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
          <el-table-column align="center" prop="poId" label="采购单编号" width="140"></el-table-column>
          <el-table-column align="center" prop="createTime" label="创建时间" width="170"></el-table-column>
          <el-table-column align="center" prop="venderName" label="供应商名称" width="130"></el-table-column>
          <el-table-column align="center" prop="account" label="创建用户" width="100"></el-table-column>
          <el-table-column align="center" prop="tipFee" label="附加费用" width="80"></el-table-column>
          <el-table-column prop="productTotal" label="采购产品总价" width="110"></el-table-column>
          <el-table-column prop="poTotal" label="采购单总价格" width="110"></el-table-column>
          <el-table-column align="payType" prop="payType" label="付款方式" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.payType==1">货到付款</span>
            <span v-if="scope.row.payType==2">款到发货</span>
            <span v-if="scope.row.payType==3">预付款到发货</span>
          </template>
          </el-table-column>
          <el-table-column prop="prePayFee" label="最低预付款金额" width="120"></el-table-column>
          <el-table-column align="center" prop="type" label="处理状态" width="100">可了结</el-table-column>
          
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">了结</el-button>
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
          <el-table-column align="center" prop="poId" label="采购单编号" width="140"></el-table-column>
          <el-table-column align="center" prop="createTime" label="创建时间" width="170"></el-table-column>
          <el-table-column align="center" prop="venderName" label="供应商名称" width="130"></el-table-column>
          <el-table-column align="center" prop="account" label="创建用户" width="100"></el-table-column>
          <el-table-column align="center" prop="tipFee" label="附加费用" width="80"></el-table-column>
          <el-table-column prop="productTotal" label="采购产品总价" width="110"></el-table-column>
          <el-table-column prop="poTotal" label="采购单总价格" width="110"></el-table-column>
          <el-table-column align="payType" prop="payType" label="付款方式" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.payType==1">货到付款</span>
            <span v-if="scope.row.payType==2">款到发货</span>
            <span v-if="scope.row.payType==3">预付款到发货</span>
          </template>
          </el-table-column>
          <el-table-column prop="prePayFee" label="最低预付款金额" width="120"></el-table-column>
          <el-table-column align="center" v-model="type" label="处理状态" width="100">可了结</el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">了结</el-button>
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
  </div>
</template>
<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
    return {
      tableData: [],
      activeName: "1",
      proCateList: [],
      total: 0,
      loading: true,
      type: 4
    };
  },
  created() {
    this.getOrders();
  },
  filters: {
    tostrings() {}
  },
  methods: {
    getOrders() {
      axios({
        url: "api/main/purchase/pomain/show",
        method: "get",
        params: {
          payType: this.activeName,
          type: this.type
        }
      })
        .then(resp => {
          this.tableData = resp.data.list;
          // console.log(resp.data);
          console.log(this.tableData);
        })
        .catch(er => {
          console.log(er);
        });
    },

    handleClick(row) {
      this.$confirm("此操作将了结该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: "api/main/purchase/pomain/end",
            method: "post",
            params: {
              poId: row.poId.toString(),
              payType: Number(this.activeName),
              page: 1
            }
          }).then(resp => {
            console.log(resp.data);
            console.log(typeof row.poId.toString());
            this.getOrders();
          });
          this.$message({
            type: "success",
            message: "了结成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getProCateList(page, categoryId) {
      this.loading = true;
      axios({
        url: "api/main/purchase/pomain/show",
        method: "get",
        params: {
          page,
          categoryId,
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
      console.log(page);
    }
  },
  watch: {
    activeName: function(val, oldVal) {
        this.getOrders();
    }
  }
};
</script>