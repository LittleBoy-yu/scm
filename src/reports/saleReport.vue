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
    <el-row style="margin:15px 0">
      <el-col :span="4">已了结单数：{{main.endtotalnum}}</el-col>
      <el-col :span="4">销售总单数：{{main.totalnum}}</el-col>
      <el-col :span="5">销售总金额：{{main.sototal}}</el-col>
      <el-col :span="5">已付款金额：{{main.totalpay}}</el-col>
    </el-row>
    
    <el-table class="dislog" :data="tableData" style="width: 100%;" align="center">
      <el-table-column label="序号" align="center" type="index" width="100"></el-table-column>
      <el-table-column label="销售单号" prop="soId" width="150"></el-table-column>
      <el-table-column label="客户编号" prop="customerCode" width="150"></el-table-column>
      <el-table-column label="客户名称" prop="customerName" width="150"></el-table-column>
      <el-table-column label="销售日期" prop="createTime"></el-table-column>
      <el-table-column label="经手人" prop="account"></el-table-column>
      <el-table-column label="销售单总金额" prop="soTotal"></el-table-column>
      <el-table-column label="未付款金额" prop="poId">

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
        url: "api/main/report/somain/main",
        method: "get",
        params: {
          time: dayjs(this.time).format("YYYY-MM")
        }
      }).then(resp => {
        this.tableData = resp.data.details.list
        this.total = resp.data.details.total
        this.main = resp.data;
      });
    },
      pagechange(page) {
      axios({
        url: "api/main/report/somain/main",
        method: "get",
        params: {
          page,
          time: dayjs(this.time).format("YYYY-MM")
        }
      }).then(resp => {
        this.tableData = resp.data.details.list
        this.total = resp.data.details.total
        this.main = resp.data;
        console.log(resp);
      });
      console.log(this.total);
    }
  }
};
</script>
<style scoped>

</style>
