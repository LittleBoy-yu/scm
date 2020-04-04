<template>
  <div>
    <el-row>
      <el-col :span="7" :offset="1">
        <span class="demonstration">选择年月</span>
        <el-date-picker v-model="time" type="month" placeholder="选择年月"></el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="report">
      <el-col :span="4">采购单总数：{{main.totalnum}}</el-col>
      <el-col :span="4">已了结数：{{main.endtotalnum}}</el-col>
      <el-col :span="5">采购单总金额：{{main.pototal}}</el-col>
      <el-col :span="4">已付款金额：{{main.totalpay}}</el-col>
    </el-row>
    <el-table class="dislog" :data="tableData" style="width: 100%;" align="center">
      <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
      <el-table-column label="采购单编号" prop="poId" width="140"></el-table-column>
      <el-table-column label="供应商名称" prop="venderName" width="150"></el-table-column>
      <el-table-column label="创建日期" prop="createTime" width="150"></el-table-column>
      <el-table-column label="创建用户" prop="account"></el-table-column>
      <el-table-column label="采购单总金额" prop="poTotal"></el-table-column>
      <el-table-column label="未付款金额" prop="poId">

      </el-table-column>
     <el-table-column align="center" prop="payType" label="付款方式" width="110">
          <template slot-scope="scope">
            <span v-if="scope.row.payType==1">货到付款</span>
            <span v-if="scope.row.payType==2">款到发货</span>
            <span v-if="scope.row.payType==3">预付款到发货</span>
          </template>
        </el-table-column>
      <el-table-column label="最低预付款金额" prop="prePayFee"></el-table-column>
      <el-table-column align="center" prop="status" label="处理状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">新增</span>
            <span v-if="scope.row.status==2">已收货</span>
            <span v-if="scope.row.status==3">已付款</span>
            <span v-if="scope.row.status==4">已了结</span>
            <span v-if="scope.row.status==5">已预付</span>
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
      main: {},
      value: "",
      time: "",
      total:0,
      
    };
  },
  methods: {
    search() {
      axios({
        url: "api/main/report/pomain/main",
        method: "get",
        params: {
          time: dayjs(this.time).format("YYYY-MM")
        }
      }).then(resp => {
        this.tableData = resp.data.details.list
        this.total = resp.data.details.total
        this.main = resp.data;
        console.log(this.total);
      });
    },
      pagechange(page) {
      axios({
        url: "api/main/report/pomain/main",
        method: "get",
        params: {
          page,
          time: dayjs(this.time).format("YYYY-MM")
        }
      }).then(resp => {
        this.tableData = resp.data.details.list
        this.total = resp.data.totalnum
        this.main = resp.data;
        console.log(resp);
      // console.log(this.total);
      });
    }
  }
};
</script>
<style>
.el-table td,
.el-table th {
  text-align: center!important;
}
</style>
<style scoped>
.report{margin: 15px 0;}
</style>
