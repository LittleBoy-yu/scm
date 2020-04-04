<template>
  <div>
    <el-row height="30">
      <el-col :span="7">
        <span class="demonstration">选择年月</span>
        <el-date-picker v-model="time" type="month" placeholder="选择年月"></el-date-picker>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row class="report">
      <el-col :span="4">收款次数：{{main.receCount}}</el-col>
      <el-col :span="4">收款总金额：{{main.recePrice}}</el-col>
      <el-col :span="5">付款次数：{{main.payCount}}</el-col>
      <el-col :span="4">付款总金额：{{main.payPrice}}</el-col>
    </el-row>
    
    <el-tabs v-model="activeName">
      <el-tab-pane label="收款详细" name="receipt">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column align="center" fixed type="index" label="序号" width="100"></el-table-column>
          <el-table-column align="center" prop="soId" label="销售单编号" width="230"></el-table-column>
          <el-table-column align="center" prop="createTime" label="销售日期" width="230"></el-table-column>
          <el-table-column align="center" prop="pay_time" label="收款日期" width="195"></el-table-column>
          <el-table-column align="center" prop="pay_price" label="收款金额" width="155"></el-table-column>
          <el-table-column align="center" prop="account" label="经手人" width="155"></el-table-column>
          <el-table-column align="center" label="处理状态" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">新增</span>
              <span v-if="scope.row.status==2">已发货</span>
              <span v-if="scope.row.status==3">已收款</span>
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
      </el-tab-pane>
       <el-tab-pane label="付款详细" name="pay">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column align="center" fixed type="index" label="序号" width="100"></el-table-column>
          <el-table-column align="center" prop="poid" label="采购单编号" width="230"></el-table-column>
          <el-table-column align="center" prop="createTime" label="采购日期" width="230"></el-table-column>
          <el-table-column align="center" prop="pay_time" label="付款日期" width="195"></el-table-column>
          <el-table-column align="center" prop="pay_price" label="付款金额" width="155"></el-table-column>
          <el-table-column align="center" prop="account" label="经手人" width="155"></el-table-column>
          <el-table-column align="center" label="处理状态" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.status==1">新增</span>
              <span v-if="scope.row.status==2">已发货</span>
              <span v-if="scope.row.status==3">已收款</span>
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
      </el-tab-pane>
    </el-tabs>
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
      activeName:"receipt"
    };
  },
  methods: {
    search() {
      axios({
        url: "api/main/report/payment/main",
        method: "get",
        params: {
          time: dayjs(this.time).format("YYYY-MM")
        }
      }).then(resp => {
        this.total = resp.data.total
        this.main = resp.data;
        // console.log(this.total);
      });
      this.getdata();
    },
    getdata(){
        axios({
        url: `api/main/report/payment/detail/${this.activeName}`,
        method: "get",
        params: {
          time: dayjs(this.time).format("YYYY-MM")
        }
      }).then(resp => {
          this.tableData=resp.data.list
        this.total = resp.data.total
       
        console.log(resp.data);
      });
    },
      pagechange(page) {
      axios({
        url: `api/main/report/payment/detail/${this.activeName}`,
        method: "get",
        params: {
          page,
          time: dayjs(this.time).format("YYYY-MM")
        }
      }).then(resp => {
        this.tableData = resp.data.list
        this.total = resp.data.total
        
        console.log(resp);
      });
      console.log(this.total);
    }
  },
  watch: {
     activeName:function(){
         this.getdata()
     }
  }
};
</script>
<style scoped>
.demonstration{position: relative;left:-20px}
.report{margin: 15px 0}
</style>
