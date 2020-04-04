<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align="center" fixed type="index" label="序号" width="90"></el-table-column>
      <el-table-column align="center" prop="productCode" label="产品编号" width="190"></el-table-column>
      <el-table-column align="center" prop="name" label="产品名称" width="195"></el-table-column>
      <el-table-column align="center" prop="num" label="当前库存" width="195"></el-table-column>
      <el-table-column align="center" prop="poNum" label="采购在途数" width="195"></el-table-column>
      <el-table-column align="center" prop="soNum" label="预销售数" width="190"></el-table-column>
      <el-table-column align="center" label="操作" width="190">
        <template slot-scope="scope">
          <el-button @click="details(scope.row)" type="primary" size="small">盘点</el-button>
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
    <el-dialog title="库存盘点" :visible.sync="dialogVisible" width="40%" @close="close">
      <el-form ref="change" :model="change" label-width="180px" class="pandian" :rules="rules">
        <el-form-item label="变化数量：" prop="num">
          <el-col :span="10" :offset="2">
            <el-input v-model="change.num" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="变化类型：" prop="value">
          <el-col :span="6" :offset="2">
            <el-select v-model="change.value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="损益原因：" prop="description">
          <el-col :span="10" :offset="2">
            <el-input v-model="change.description"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="10" :offset="2">
            <el-button size="middle" @click="handleClick">保存</el-button>
            <el-button size="middle" @click="close">取消</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
     var numCheck=(rule, value, callback)=>{
					if(!value){
						return callback(new Error('请输入变化数量'));
					}else if( !/^[+]{0,1}(\d+)$/.test(value)){
						return callback(new Error('不合规范,请输入正整数'));
					}else if(value>this.change.originNum){
            return callback(new Error('超出库存范围'));
      		}else{
            	callback()
          }
				}
    return {
      options: [
        {
          value: "损耗",
          label: "损耗"
        },
        {
          value: "盈余",
          label: "盈余"
        }
      ],
      tableData: [],
      activeName: "1",
      proCateList: [],
      detailsData: [],
      change: {
        value: "",
        num: "",
        productCode: "",
        orginNum: "",
        description: ""
      },
      total: 0,
      loading: true,
      type: 2,
      dialogVisible: false,
      total: 0,
      page: "",
      rules: {
        value: [{ required: true, message: "请选择变化类型", trigger: "blur" }],
        num:[{ required: true,validator: numCheck, trigger: 'blur'}],
        description:[{ required: true, message: "请输入变化原因", trigger: "blur" }]
        
      }
    };
   
  },
  created() {
    this.getOrders();
  },

  methods: {
    getOrders() {
      axios({
        url: "api/main/sell/product/show",
        method: "get",
        params: {
          //   payType: this.activeName,
          //   type: this.type
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

    handleClick() {
      this.$refs["change"].validate(valid => {
        if (valid) {
      this.$confirm("即将进行库存更新, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: "api/main/stock/checkstock",
            method: "get",
            params: {
              productCode: this.change.productCode,
              originNum: this.change.originNum,
              num: this.change.num,
              type: this.change.value,
              description: this.change.description
            }
          }).then(resp => {
            console.log("resp.data",resp.data);
            this.getOrders();
            console.log(this.change.originNum)
            this.dialogVisible = false;
          });
          this.$message({
            type: "success",
            message: "盘点成功!"
          });
          Object.keys(this.change).forEach(key => this.change[key] = '');
          this.$refs.change.resetFields();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消出库"
          });
        });
         }
})
    },
    getProCateList(page, categoryId) {
      this.loading = true;
      axios({
        url: "api/main/sell/product/show",
        method: "get",
        params: {
          page
        }
      }).then(resp => {
        this.tableData = resp.data.list;
        this.total = resp.data.total;
        this.loading = false;
      });
    },
    pagechange(page) {
      this.getProCateList(page);
    //   console.log(page);
    },
    details(row) {
      this.change.originNum = row.num;
      this.change.productCode = row.productCode;
      this.dialogVisible = true;
    },
    close() {
      Object.keys(this.change).forEach(key => this.change[key] = '');
        this.dialogVisible = false;
        this.$refs.change.resetFields();
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
/* .detailsData {
  margin-top: -90px;
} */
.pandian {
  margin-top: -60px;
}
</style>