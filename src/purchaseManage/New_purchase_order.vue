<template>
  <div>
    <el-header class="nav">
      位置：
      <router-link to="/Add_purchase_order" class="add">新添采购单</router-link>> 添加新采购单
    </el-header>
    <div class="cent">
      <el-button type="primary" icon="el-icon-circle-plus" @click="add">添加明细</el-button>
      <el-button type="primary" icon="el-icon-s-order" @click="Preservation">保存</el-button>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="130px"
        class="demo-ruleForm forms"
      >
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="采购单编号" prop="poId" required>
                <el-input v-model="ruleForm.poId" readonly unselectable="on"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <el-form-item label="供应商">
                <el-select v-model="ruleForm.venderCode" placeholder="请选择供应商">
                  <el-option
                    v-for="(item,index) in supplier"
                    :key="index"
                    :label="item.name"
                    :value="item.venderCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="创建用户" prop="account" required>
                <el-input v-model="ruleForm.account" readonly unselectable="on"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="创建时间" prop="createTime" required>
                <el-input v-model="ruleForm.createTime" readonly unselectable="on"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <el-form-item label="附加费用" prop="tipFee">
                <el-input v-model="ruleForm.tipFee"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="产品总价"  prop="productTotal ">
                <el-input v-model="ruleForm.productTotal " readonly unselectable="on"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="ruleForm.remark"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">
              <el-form-item label="付款方式">
                <el-select v-model="ruleForm.payType" placeholder="请选择付款方式" required>
                  <el-option label="货到付款" value="1"></el-option>
                  <el-option label="款到发货" value="2"></el-option>
                  <el-option label="预付款到发货" value="3"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="最低预付款金额" prop="prePayFee">
                <el-input v-model="ruleForm.prePayFee"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="ruleForm.poitems">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="productCode" label="产品编号" width="240">
          <template slot-scope="scope">
            <div class="code">
              <el-input v-model="scope.row.productCode" readonly unselectable="on"></el-input>
              <el-button
                type="primary"
                icon="el-icon-edit-outline"
                class="bt"
                @click="handleEdit(scope.$index)"
              ></el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="产品名称" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" readonly unselectable="on"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="unitName" label="数量单位" width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unitName" readonly unselectable="on"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="产品数量" width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.num"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="unitPrice" label="采购单价" width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unitPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="itemPrice" label="明细总价" width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.itemPrice"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="unitPrice" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-check" circle @click="Determine(scope.row)"></el-button>
            <el-button
              @click="del(scope.$index,scope.row)"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 选择明细 -->
    <el-dialog :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
      <el-table :data="show" style="width: 100%">
        <el-table-column prop="date" label="选择" width="180">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="productCode" label="产品编码" width="180"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="unitName" label="	数量单位"></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import dayjs from "dayjs";
import axios from "axios";
const qs = require("querystring");
import cook from "js-cookie";
export default {
  data() {
    return {
      ruleForm: {
        poId: "",
        account: cook.get("account"),
        venderCode: "",
        createTime: "",
        tipFee: "0",
        poTotal:"",
        payType: "",
        prePayFee: "0",
        status: "1",
        remark: "",
        poitems: [],
        itemPrice: "",
        productTotal:''
      },
      radio: "",
      chose: "",
      supplier: [],
      show: [],
      dialogVisible: false,
      rules: {
        prePayFee: [
          { required: true, message: "请输入数字", trigger: "blur" },
          {
            pattern: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
            message: "请输入数字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    //时间
    this.ruleForm.poId = dayjs().format("YYYYMMDDHHmmss");
    this.ruleForm.createTime = dayjs().format("YYYY-MM-DD");
   
    //获取供应商
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
    //获取明细
    axios({
      url: "api/main/sell/product/all",
      method: "get"
    })
      .then(resp => {
        this.show = resp.data;
      })
      .catch(er => {
        console.log(er);
      });
  },
  methods: {
    add() {
      let obj = {
        productCode: "",
        unitPrice: "",
        num: "",
        unitName: "",
        itemPrice:'',
        poTotal:"",
      
      };
      this.ruleForm.poitems.push(obj);
    },
    //弹框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    confirm() {
      //弹出文本框确定
      this.dialogVisible = false;
      const selected = this.show[this.radio];
      this.ruleForm.poitems[this.chose].productCode = selected.productCode;
      this.ruleForm.poitems[this.chose].name = selected.name;
      this.ruleForm.poitems[this.chose].unitName = selected.unitName;
    },
    //序号按钮
    handleEdit(index) {
      this.dialogVisible = true;
      this.chose = index;
    },
    //删除按钮
    del(i, r) {
      this.ruleForm.poitems.splice(i, 1);
       
      this.ruleForm.productTotal -= r.unitPrice * r.num;

    },
    //确定添加
    Determine(r) {
         this.ruleForm.poitems.map(item => {
        item.itemPrice = item.num * item.unitPrice;
      });
      this.ruleForm.productTotal = this.ruleForm.poitems.reduce((prev, cur) => {
        prev += cur.itemPrice;
        return prev;
      }, 0);
      this.ruleForm.poTotal=
        Number(this.ruleForm.itemPrice) + Number(this.ruleForm.tipFee);
    },

   
    
    //保存
    Preservation() {
      axios
        .post("api/main/purchase/pomain/add", JSON.stringify(this.ruleForm), {
          headers: {
            Authorization: cook.get("token"),
            "Content-Type": "application/json"
          }
        })
        .then(resp => {
      
          console.log(resp.data);
          if (resp.data.code === 2) {
            alert("添加成功");
          } else {
            alert(resp.data.message);
          }
       
        })
        .catch(er => {
          console.log(er);
        });
    }
  }
};
</script>
<style >
.nav {
  background-color: #545c64;
  line-height: 50px;
  width: 1291px;
}
.add {
  color: black;
  text-decoration: none;
}
.cent {
  margin-left: 30px;
}
.bt {
  float: right;
}
.code {
  display: flex;
}
</style>