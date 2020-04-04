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
      <el-row>
        <el-col :span="5">
          <el-form-item label="采购单编号:" prop="poId">
            <el-input
              type="text"
              v-model="venderForm.poId"
              autocomplete="off"
              width="120"
              placeholder="请输入采购单编号"
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
          <el-form-item label="处理状态:">
            <el-select v-model="venderForm.status" placeholder="请选择处理状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="供应商:" prop="venderCode">
            <el-select v-model="venderForm.venderCode" placeholder="请选择供应商">
              <el-option
                v-for="(item,index) in supplier"
                :key="index"
                :label="item.name"
                :value="item.venderCode"
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
      <el-table :data="tableData" border style="width: 100%" class="tableData">
        <el-table-column align="center" fixed type="index" label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="poId" label="采购单编号" width="140"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" width="170"></el-table-column>
        <el-table-column align="center" prop="venderName" label="供应商名称" width="120"></el-table-column>
        <el-table-column align="center" prop="account" label="创建用户" width="105"></el-table-column>
        <el-table-column align="center" prop="tipFee" label="附加费用" width="80"></el-table-column>
        <el-table-column prop="productTotal" label="采购产品总价" width="110"></el-table-column>
        <el-table-column prop="poTotal" label="采购单总价格" width="110"></el-table-column>
        <el-table-column align="center" prop="payType" label="付款方式" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.payType==1">货到付款</span>
            <span v-if="scope.row.payType==2">款到发货</span>
            <span v-if="scope.row.payType==3">预付款到发货</span>
          </template>
        </el-table-column>
        <el-table-column prop="prePayFee" label="最低预付款金额" width="120"></el-table-column>
        <el-table-column align="center" prop="status" label="处理状态" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">新增</span>
            <span v-if="scope.row.status==2">已收货</span>
            <span v-if="scope.row.status==3">已付款</span>
            <span v-if="scope.row.status==4">已了结</span>
            <span v-if="scope.row.status==5">已预付</span>
          </template>
        </el-table-column>
        <el-table-column label="详情" width="100">
          <template slot-scope="scope">
            <el-button @click="details(scope.row)" type="text" size="small">查看</el-button>
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
    <el-dialog title="采购单详情" :visible.sync="dialogVisible" width="70%">
 
      <el-table :data="detailsData" style="width: 100%">
        <el-table-column prop="poId" label="采购单编号" width="155"></el-table-column>
        <el-table-column prop="productName" label="产品名称" width="155"></el-table-column>
        <el-table-column prop="productCode" label="产品编号" width="155"></el-table-column>
        <el-table-column prop="unitName" label="数量单位" width="155"></el-table-column>
        <el-table-column prop="unitPrice" label="单位价格" width="155"></el-table-column>
        <el-table-column prop="itemPrice" label="产品总价" width="155"></el-table-column>
      </el-table>
      <el-table :data="moredetailsData" style="width: 100%">
        <el-table-column prop="venderName" label="供应商名称" width="155"></el-table-column>
        <el-table-column prop="account" label="创建用户" width="155"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="155"></el-table-column>
        <el-table-column prop="tipFee" label="附加费用" width="155"></el-table-column>
        <el-table-column prop="poTotal" label="采购单总价" width="155"></el-table-column>
        <el-table-column prop="payType" label="付款方式" width="155">
         <template slot-scope="scope">
            <span v-if="scope.row.payType==1">货到付款</span>
            <span v-if="scope.row.payType==2">款到发货</span>
            <span v-if="scope.row.payType==3">预付款到发货</span>
          </template>
          </el-table-column>
        <el-table-column prop="prePayFee" label="最低预付款金额" width="155"></el-table-column>
        <el-table-column prop="status" label="处理状态" width="155">
        <template slot-scope="scope">
            <span v-if="scope.row.status==1">新增</span>
            <span v-if="scope.row.status==2">已收货</span>
            <span v-if="scope.row.status==3">已付款</span>
            <span v-if="scope.row.status==4">已了结</span>
            <span v-if="scope.row.status==5">已预付</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="155"></el-table-column>
      </el-table>
      <el-table :data="moredetailsData" style="width: 100%">
        <el-table-column prop="stockTime" label="入库时间" width="155"></el-table-column>
        <el-table-column prop="stockUser" label="入库操作用户" width="155"></el-table-column>
        <el-table-column prop="payTime" label="付款时间" width="155"></el-table-column>
        <el-table-column prop="payUser" label="付款操作用户" width="155"></el-table-column>
        <el-table-column prop="prePayTime" label="预付时间" width="155"></el-table-column>
        <el-table-column prop="prePayUser" label="预付操作用户" width="155"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
    return {
      supplier: [],
      value1: "",
      venderForm: {
        payType: "",
        poId: "",
        status: "",
        venderCode: ""
      },
      tableData: [],
      detailsData: [],
      moredetailsData: [],
      options: [
        { value: "1", label: "新增" },
        { value: "2", label: "已收货" },
        { value: "3", label: "已付款" },
        { value: "4", label: "已了结" },
        { value: "5", label: "已预付" }
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
  created() {
    this.getProCateList();
    axios({
      url: "api/main/purchase/vender/all",
      method: "get"
    })
      .then(resp => {
        this.supplier = resp.data;
      })
      .catch(er => {
        console.log(er);
      });
  },
  methods: {
    getProCateList(page) {
      this.loading = true;
      axios({
        url: "api/main/purchase/pomain/query",
        method: "get",
        params: {
          page,
          poId: this.venderForm.poId,
          startDate: this.value1[0],
          endDate: this.value1[1],
          status: this.venderForm.status,
          payType:this.venderForm.payType,
          venderCode: this.venderForm.venderCode
        }
      }).then(resp => {
        this.tableData = resp.data.list;
        // this.proCateList = resp.data.list;
        this.total = resp.data.total;
        console.log(resp.data.list)
        this.loading = false;
      });
    },
    pagechange(page) {
      this.getProCateList(page);
      console.log(page);
    },
    seek() {
      this.getProCateList();
    },
    details(row) {
      console.log(row);
      
      axios({
        url: "api/main/purchase/pomain/queryItem",
        method: "get",
        params: {
          poId: row.poId
        }
      }).then(resp => {
        this.detailsData = resp.data;
        // this.proCateList = resp.data.list;
        console.log(this.detailsData[0]);
      });
       this.moredetailsData= [row];
      this.dialogVisible = true;
      // });
        
    }
  }
};
</script>
<style>
.el-table td,
.el-table th {
  text-align: center;
}
</style>
<style scoped>
/* .rightItems {
  position: relative;
  top: -40px;
} */
.fukuan {
  margin-left: 13px;
}
/* .tableData{margin-top: -40px} */
</style>