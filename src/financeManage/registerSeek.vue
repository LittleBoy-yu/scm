<template>
  <div class="big">
    <el-form
      size="middle"
      :model="venderForm"
      status-icon
      ref="venderForm"
      label-width="100px"
      class="venderForm"
    >
      <el-row>
        <el-col :span="5">
          <el-form-item label="相关单据号:" prop="no">
            <el-input
              type="text"
              v-model="venderForm.no"
              autocomplete="off"
              width="120"
              placeholder="请输入相关单据号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <template>
              <div class="block">
                <span class="demonstration">日期范围</span>
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </div>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="5" prop="status">
          <el-form-item label="收支类型:">
            <el-select v-model="venderForm.type" placeholder="请选择收支类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="付款方式:" prop="venderCode" class="fukuan">
            <el-select v-model="venderForm.payType" placeholder="付款方式">
              <el-option
                v-for="item in pay"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3" class="rightItems">
          <el-button type="primary" @click="seek">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="tableData" border style="width: 100%;" max-height="100%" class="tableData">
        <el-table-column align="center" fixed type="index" label="序号" width="130"></el-table-column>
        <el-table-column align="center" prop="ordercode" label="相关单据号" width="250"></el-table-column>
        <el-table-column align="center" prop="payTime" label="收付款时间" width="230"></el-table-column>
        <el-table-column align="center" prop="payPrice" label="收付款金额" width="230"></el-table-column>
        <el-table-column align="center" prop="account" label="经手人" width="200"></el-table-column>
        <el-table-column align="center" prop="payType" label="单据付款方式" width="260">
          <template slot-scope="scope">
            <span v-if="scope.row.payType==1">货到付款</span>
            <span v-if="scope.row.payType==2">款到发货</span>
            <span v-if="scope.row.payType==3">预付款到发货</span>
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
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
    return {
      value1: "",
      venderForm: {
        payType: "",
        no: "",
        type: ""
      },
      tableData: [],
      detailsData: [],
      moredetailsData: [],
      options: [
        { value: "支出", label: "支出" },
        { value: "收入", label: "收入" }
      ],
      pay: [
        { value: "1", label: "货到付款" },
        { value: "2", label: "款到发货" },
        { value: "3", label: "预付款到发货" }
      ],

      total: 0,
      loading: true,
      dialogVisible: false
    };
  },
  methods: {
    getProCateList(page) {
      this.loading = true;
      //   console.log('this.venderForm',this.venderForm)
      if(this.venderForm.type){
      axios({
        url: "api/main/finance/query",
        method: "post",
        params: {
          page,
          no: this.venderForm.no,
          startDate: this.value1[0],
          endDate: this.value1[1],
          type: this.venderForm.type,
          payType: this.venderForm.payType
        }
      })
        .then(resp => {
            this.tableData = resp.data.list;
            // this.proCateList = resp.data.list;
            this.total = resp.data.total;
            console.log("resp.data.", resp.data);
            this.loading = false;
        })
        .catch(er => {
          this.$message.error(er.message);
        });
        }else{
            this.$message.error("请选择收支类型");
        }
    },
    pagechange(page) {
      this.getProCateList(page);
      console.log(page);
    },
    seek() {
      this.getProCateList();
    }
  }
};
</script>
<style scoped>
/* .fukuan {
  margin-left: 13px;
}
.big {
  overflow-y: scroll;
} */
</style>