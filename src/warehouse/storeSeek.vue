<template>
  <div>
    <el-form
      size="middle"
      :model="venderForm"
      status-icon
      ref="venderForm"
      label-width="100px"
      class="venderForm"
    >
      <el-row :gutter="0">
        <el-col :span="5">
          <el-form-item label="产品编号:" prop="productCode">
            <el-input
              type="text"
              v-model="venderForm.productCode"
              autocomplete="off"
              width="120"
              placeholder="请输入产品编号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="产品名称:" prop="name">
            <el-input
              type="text"
              v-model="venderForm.name"
              autocomplete="off"
              width="120"
              placeholder="请输入产品名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="最小值:" prop="min">
            <el-input
              type="text"
              onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
              v-model="venderForm.value[0]"
              placeholder="最小值"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="最大值:" prop="max">
            <el-input
              type="text"
              onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
              v-model="venderForm.value[1]"
              placeholder="最大值"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" class="rightItems">
          <el-button type="primary" @click="seek">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" fixed type="index" label="序号" width="90"></el-table-column>
        <el-table-column align="center" prop="productCode" label="产品编号" width="190"></el-table-column>
        <el-table-column align="center" prop="name" label="产品名称" width="195"></el-table-column>
        <el-table-column align="center" prop="num" label="当前库存" width="195"></el-table-column>
        <el-table-column align="center" prop="poNum" label="采购在途数" width="195"></el-table-column>
        <el-table-column align="center" prop="soNum" label="预销售数" width="190"></el-table-column>
        <el-table-column align="center" label="变更记录" width="190">
          <template slot-scope="scope">
            <el-button @click="details(scope.row)" type="primary" size="small">查看</el-button>
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
    <el-dialog title="库存详情" :visible.sync="dialogVisible" width="60%">
      <template >
        <el-tabs v-model="activeName"  @tab-click="handleClick" >
          <el-tab-pane label="入库记录" name="1">
            <el-table :data="tableData1" border style="width: 100%">
              <el-table-column align="center" fixed type="index" label="序号" width="90"></el-table-column>
              <el-table-column align="center" prop="orderCode" label="相关采购单号" width="190"></el-table-column>
              <el-table-column align="center" prop="stockTime" label="入库时间" width="195"></el-table-column>
              <el-table-column align="center" prop="createUser" label="入库经手人" width="125"></el-table-column>
              <el-table-column align="center" prop="stockNum" label="入库数量" width="125"></el-table-column>
              <el-table-column align="center" prop="stockType" label="库存类型" width="125">入库</el-table-column>
            </el-table>
              <div class="block">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="total1"
                  @current-change="pagechange"
                ></el-pagination>
              </div>
          </el-tab-pane>
          <el-tab-pane label="出库记录" name="2">
             <el-table :data="tableData2" border style="width: 100%">
              <el-table-column align="center" fixed type="index" label="序号" width="90"></el-table-column>
              <el-table-column align="center" prop="orderCode" label="相关采购单号" width="190"></el-table-column>
              <el-table-column align="center" prop="stockTime" label="出库时间" width="195"></el-table-column>
              <el-table-column align="center" prop="createUser" label="出库经手人" width="125"></el-table-column>
              <el-table-column align="center" prop="stockNum" label="出库数量" width="125"></el-table-column>
              <el-table-column align="center" prop="stockType" label="库存类型" width="125">出库</el-table-column>
            </el-table>
              <div class="block">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="total1"
                  @current-change="pagechange"
                ></el-pagination>
              </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-dialog>
  </div>
</template>
   
<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
    return {
      venderForm: {
        value: [0],
        name: "",
        productCode: ""
      },
      productCode: "",
      page: "",
      tableData: [],
      tableData1: [],
      tableData2: [],
      total: 0,
      total1:0,
      
      loading: true,
      dialogVisible: false,
      activeName: "1"
    };
  },
  created() {
    this.getOrders();
  },
  watch: {
    activeName: function() {}
  },
  methods: {
    getOrders(page) {
      console.log(this.venderForm.value);
      axios({
        url: " api/main/stock/query",
        method: "get",
        params: {
          page,
          productCode: this.venderForm.productCode,
          name: this.venderForm.name,
          min: this.venderForm.value[0],
          max: this.venderForm.value[1]
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
    pagechange(page) {
      this.getOrders(page);
      console.log(page);
    },
    seek() {
      this.getOrders();
    },
    getdata(){
         axios({
        url: " api/main/stock/alterRecord",
        method: "get",
        params: {
          productCode: this.productCode,
          stockType: this.activeName
        }
      })
        .then(resp => {
          if(this.activeName==1){
            this.tableData1 = resp.data.data.list;
          }else{
            this.tableData2 = resp.data.data.list;
          }
          this.total1=resp.data.total
          console.log(resp.data.data.list);
          //   console.log(this.tableData);
        })
        .catch(er => {
          console.log(er);
        });
    },
    details(row) {
      this.productCode = row.productCode;
      this.getdata()
      this.dialogVisible = true;
    },
    handleClick() {
        this.getdata()
      console.log(this.activeName);
     
    }
  }
};
</script>
<style scoped>
/* .rightItems {
  position: relative;
  top: -40px;
} */
.fukuan {
  margin-left: 13px;
}
.tableData {
  margin-top: -40px;
}
</style>