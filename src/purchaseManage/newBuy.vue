<template>
  <div>
    <div class="cent" v-loading="loading">
      <el-form
        size="middle"
        :model="venderForm1"
        status-icon
        ref="venderForm1"
        label-width="100px"
        class="venderForm"
      >
        <el-row>
          <el-col :span="7">
            <el-form-item class="xiu1" label="采购单编号" prop="poId">
              <el-input
                type="text"
                v-model="venderForm1.poId"
                autocomplete="off"
                placeholder="请输入要查询的采购单编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
          </el-row>
          <el-row>
          <el-col :span="5" prop="status">
            <el-form-item label="处理状态:">
              <el-select v-model="venderForm1.status" placeholder="请选择处理状态">
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
              <el-select v-model="venderForm1.venderCode" placeholder="请选择供应商">
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
              <el-select v-model="venderForm1.payType" placeholder="付款方式">
                <el-option
                  v-for="item in pay"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2" class="rightItems">
            <el-button  @click="seek" type="primary" style="padding:10px 25px">查询</el-button>
          </el-col>
           <el-col :span="2" >
            <router-link to="/addnewbuy">
                    <el-button class="add" type="primary" icon="el-icon-circle-plus" style="padding:10px 15px">添加</el-button>
            </router-link>
          </el-col>
        </el-row>
      </el-form>

      <el-table class="tb" style="width: 1300px;text-align:center" max-height="100%" border :data="user">
        <el-table-column fixed type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="poId" label="采购单编号" width="140"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170"></el-table-column>
        <el-table-column prop="venderName" label="供应商名称" width="120"></el-table-column>
        <el-table-column prop="account" label="创建用户" width="120"></el-table-column>
        <el-table-column prop="tipFee" label="附加费用" width="100"></el-table-column>
        <el-table-column prop="productTotal" label="采购产品总价" width="120"></el-table-column>
        <el-table-column prop="poTotal" label="采购单总价" width="110"></el-table-column>
        <el-table-column prop="payType" label="付款方式" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.payType==1">货到付款</span>
            <span v-if="scope.row.payType==2">款到发货</span>
            <span v-if="scope.row.payType==3">预付款到发货</span>
          </template>
        </el-table-column>
        <el-table-column prop="prePayFee" label="最低付款金额" width="110"></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="change(scope.row)">修改</el-button>
            <el-button @click="del(scope.$index,scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
        class="page"
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="pagechange"
        ></el-pagination>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" width="45%">
      <el-form
        :rules="rules"
        :model="venderForm"
        status-icon
        ref="venderForm"
        label-width="100px"
        class="demo-venderForm"
      >
        <el-form-item class="xiu" label="采购单编号" prop="poId">
          <el-input type="text" v-model="venderForm.poId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="xiu" label="创建时间" prop="createTime">
          <el-input type="text" v-model="venderForm.createTime" readonly autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="xiu" label="供应商名称" prop="venderCode">
          <el-select v-model="venderForm.venderCode" placeholder="请选择供应商">
            <el-option
              v-for="(item,index) in supplier"
              :key="index"
              :label="item.name"
              :value="item.venderCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="xiu" label="创建用户" prop="account">
          <el-input type="text" v-model="venderForm.account" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item class="xiu" label="附加费用" prop="tipFee">
          <el-input type="text" v-model="venderForm.tipFee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="xiu" label="采购产品总价" prop="productTotal">
          <el-input type="text" v-model="toPrice" autocomplete="off" readonly></el-input>
        </el-form-item>
        <el-form-item class="xiu" label="采购单总价" prop="poTotal">
          <el-input type="text" v-model="totalPrice" autocomplete="off" readonly></el-input>
        </el-form-item>
           <el-form-item class="xiu" label="付款方式" prop="payType">
            <el-select v-model="venderForm.payType" required>
              <el-option label="货到付款" :value="1"></el-option>
              <el-option label="款到发货" :value="2"></el-option>
              <el-option label="预付款到发货" :value="3"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item class="xiu" label="最低付款金额" prop="prePayFee">
          <el-input type="text" v-model="venderForm.prePayFee" autocomplete="off" :disabled="flag"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-circle-plus" @click="add" class="mingxi">添加明细</el-button>
        <el-button type="primary" icon="el-icon-s-order" @click="Preservation" class="mingxi">保存</el-button>
        <div>
          <el-table :data="venderForm.poitems">
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column prop="productCode" label="产品编号" width="220">
              <template slot-scope="scope">
                <div class="code">
                  <el-input v-model="scope.row.productCode" readonly unselectable="on" style="width:180px"></el-input>
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
                <el-input v-model="scope.row.productName" readonly unselectable="on"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="unitName" label="数量单位" width="100">
              <template slot-scope="scope">
                <el-input v-model="scope.row.unitName" readonly unselectable="on"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="num" label="产品数量" width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.num" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="unitPrice" label="采购单价" width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.unitPrice"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="itemPrice" label="明细总价" width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.itemPrice" readonly></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="unitPrice" label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  @click="delet(scope.$index,scope.row)"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog
          :visible.sync="dialogVisibles"
          width="30%"
          :before-close="handleClose"
          :modal="false"
        >
          <el-table :data="show" style="width: 100%">
            <el-table-column prop="date" label="选择" width="50">
              <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="productCode" label="产品编码" width="120"></el-table-column>
            <el-table-column prop="name" label="产品名称"></el-table-column>
            <el-table-column prop="unitName" label="  数量单位"></el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibles = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
      <span slot="footer" class="dialog-footer" id="lower">
        <el-button @click="dialogVisible = false" class="low">取 消</el-button>
        <el-button type="primary" @click="Preservation" class="low">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
const qs = require("querystring");
import cook from "js-cookie";
export default {
  name: "user_management",
  data() {
    return {
      user: [],
      proCateList: [],
      total: 0,
      loading: true,
      dialogVisible: false,
      dialogVisibles: false,
      radio: "",
      chose: "",
      supplier: [],
      venderForm1: {
        payType: "",
        poId: "",
        status: "1",
        venderCode: ""
      },
      venderForm: {
        poId: "",
        createTime: "",
        venderName: "",
        account: "",
        tipFee: "",
        productTotal: "",
        poTotal: "",
        payType: "",
        prePayFee: "",
        statue: "",
        poitems: []
      },
      did: false,
      options: [{ value: "1", label: "新增" },{ value: "2", label: "已收货" },{ value: "3", label: "已付款" },{ value: "4", label: "已了结" },{ value: "5", label: "已预付" }],
      pay: [
        { value: "1", label: "货到付款" },
        { value: "2", label: "款到发货" },
        { value: "3", label: "预付款到发货" }
      ],
      value1: "",
      show: [],
      prices: [],
      totals: "",
      rules: {
         venderCode: [
          { required: true, message: "请选择供应商称", trigger: "blur" },
          { min: 1, max: 100, message: "供应商名称不能为空", trigger: "blur" }
        ],
        tipFee: [
          { required: true, message: "请输入附加费用", trigger: "change" },
        ]
      }
    };
  },
  created() {
    this.getProCateList();
    axios({
      url: "api/main/sell/product/all",
      method: "get"
    })
      .then(resp => {
        this.show = resp.data;
        // console.log(this.show);
        
      })
      .catch(er => {
        console.log(er);
      });
    axios({
      url: "api/main/purchase/vender/all",
      method: "get"
    })
      .then(resp => {
        this.supplier = resp.data;
        console.log(this.supplier);
        
      })
      .catch(er => {
        console.log(er);
      });
  },
  computed:{
    flag(){
      if(this.venderForm.payType==3){
        return false
      }else{
        this.venderForm.prePayFee=0
        return true}
    }
    ,
      totalPrice() {
      this.venderForm.poitems.map(item => {
        item.itemPrice = Math.round(item.num * item.unitPrice*100)/100;
      });
      this.venderForm.productTotal = this.venderForm.poitems.reduce((prev, cur) => {
        prev += cur.itemPrice;
        return prev;
      }, 0);
      this.venderForm.poTotal =Number(this.venderForm.productTotal) + Number(this.venderForm.tipFee)
       return this.venderForm.poTotal
    },
    toPrice(){
      this.venderForm.productTotal = this.venderForm.poitems.reduce((prev, cur) => {
        prev += cur.itemPrice;
        return prev;
      }, 0);
      return this.venderForm.productTotal
    }
  },
  methods: {
    changeCode(){
      let n = "";
      n = this.supplier.find(item => {
        return (item.venderCode = value);
      });
      // console.log(value);
      this.venderForm.venderCode = value;
      console.log(this.venderForm.venderCode);
    }
    ,
    a() {
      axios({
        url: "api/main/purchase/pomain/show",
        method: "get",
        params: {
          type: 1
        }
      })
        .then(resp => {
          this.user = resp.data.list;
          // console.log(this.user);
        })
        .catch(er => {
          console.log(er);
        });
    },
    getProCateList(page, categoryId) {
      this.loading = true;
      axios({
        url: "api/main/purchase/pomain/show",
        method: "get",
        params: {
          type: 1,
          page,
          categoryId
        }
      }).then(resp => {
        this.user = resp.data.list;
        console.log(this.user);
        
        // this.proCateList=resp.data.list
        this.total = resp.data.total;
        this.loading = false;
      });
    },
    pagechange(page) {
      this.did=true
      if (this.did) {
        this.getProCateList1(page);
      } else {
        this.getProCateList(page);
      }

      // console.log(page);
    },
    //删除
    del(i, r) {
      console.log(1);
      axios({
        url: "api/main/purchase/pomain/delete ",
        method: "post",
        data: qs.stringify({
          poId: r.poId
        })
      })
        .then(resp => {
          // console.log(resp);
          if (resp.data.code === 2) {
            alert("删除成功");
            this.a();
          } else {
            alert(resp.data.message);
          }
        })
        .catch(er => {
          console.log(er);
        });
    },
    change(row) {
      (this.dialogVisible = true),
        (this.venderForm.poId = row.poId),
        (this.venderForm.createTime = row.createTime),
        (this.venderForm.venderCode = row.venderCode),
        (this.venderForm.account = row.account),
        (this.venderForm.tipFee = row.tipFee),
        (this.venderForm.productTotal = row.productTotal),
        (this.venderForm.poTotal = row.poTotal),
        (this.venderForm.payType = row.payType),
        (this.venderForm.status = row.status),
        (this.venderForm.prePayFee = row.prePayFee),
        this.$forceUpdate();
        axios({
          url:"api/main/purchase/pomain/queryItem",
          method:"post",
          data:qs.stringify({poId:row.poId})
        }).then(resp=>{
          // console.log(resp);
          this.venderForm.poitems=resp.data
        })
        console.log(row.venderCode);
    },
    add() {
      let obj = {
        productCode: "",
        unitPrice: "",
        num: "",
        unitName: "",
        itemPrice: "",
        poTotal: ""
      };
      this.venderForm.poitems.push(obj);
    },
    Preservation() {
      axios
        .post(
          "api/main/purchase/pomain/update",
          JSON.stringify(this.venderForm),
          {
            headers: {
              Authorization: cook.get("token"),
              "Content-Type": "application/json"
            }
          }
        )
        .then(resp => {
          console.log(resp.data);
          if (resp.data.code === 2) {
            alert("添加成功");
            this.dialogVisible = false
          } else {
            alert(resp.data.message);
          }
        })
        .catch(er => {
          console.log(er);
        });
    },
    handleEdit(index) {
      this.dialogVisibles = true;
      this.chose = index;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    confirm() {
      //弹出文本框确定
      this.dialogVisibles = false;
      const selected = this.show[this.radio];
      this.venderForm.poitems[this.chose].productCode = selected.productCode;
      this.venderForm.poitems[this.chose].productName = selected.name;
      this.venderForm.poitems[this.chose].unitName = selected.unitName;
    },
    delet(i, r) {
      this.venderForm.poitems.splice(i, 1);
      // this.venderForm.productTotal -= r.unitPrice * r.num;
    },
    getProCateList1(page) {
      this.loading = true;
      axios({
        url: "api/main/purchase/pomain/query",
        method: "post",
        params: {
          page,
          payType: this.venderForm1.payType,
          poId: this.venderForm1.poId,
          startDate: this.value1[0],
          endDate: this.value1[1],
          status: this.venderForm1.status,
          venderCode: this.venderForm1.venderCode
        }
      }).then(resp => {
        this.user = resp.data.list;
        // this.proCateList = resp.data.list;
        this.total = resp.data.total;
        console.log(resp.data.list);
        this.loading = false;
      });
    },
    seek() {
      this.getProCateList1();
    }
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.nav {
  background-color: #545c64;
  line-height: 50px;
  width: 1291px;
}
.block {
  /* margin-left: 700px; */
  margin-left: -60px;

  padding-bottom: 30px;
}
.tb {
  line-height: 60px;
  text-align: center;
}
.low {
  width: 80px;
  height: 30px;
}
.xiu {
  margin-bottom: 15px;
}
.xiu1 {
  margin-bottom: 30px;
}
#lower {
  line-height: 60px;
}

.tb {
  position: relative;
  top: 20px;
}
.page{
  margin-top: 30px
}
el-table-column {text-align: center}
.mingxi{padding: 5px 10px}
</style>