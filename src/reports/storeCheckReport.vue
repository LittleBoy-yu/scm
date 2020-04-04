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
      <el-col :span="6">库存总数量&emsp;：{{main.totalNum}}</el-col>
    </el-row>

    <el-table class="dislog" :data="tableData" style="width: 100%;" align="center">
      <el-table-column label="序号" align="center" type="index" width="300"></el-table-column>
      <el-table-column label="产品编号" prop="ProductCode"></el-table-column>
      <el-table-column label="产品名称" prop="name"></el-table-column>
      <el-table-column label="产品库存" prop="num" ></el-table-column>
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
      total: 0
    };
  },
  methods: {
    search() {
      axios({
        url: "api/main/report/stock/main",
        method: "get",
        params: {
          time: dayjs(this.time).format("YYYY-MM")
        }
      }).then(resp => {
        this.tableData = resp.data.details.list;
        this.total = resp.data.details.total;
        this.main = resp.data;
        console.log(resp.data);
      });
    },
    pagechange(page) {
      axios({
        url: "api/main/report/stock/main",
        method: "get",
        params: {
          page,
          time: dayjs(this.time).format("YYYY-MM")
        }
      }).then(resp => {
        this.tableData = resp.data.details.list;
        this.total = resp.data.details.total;
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
