<template>
  <div>
    <div class="cent" v-loading="loading">
      <router-link to="/venderadd"> <el-button class="add" type="primary" icon="el-icon-circle-plus">添加</el-button></router-link>
     <router-view></router-view>
      <el-table class="tb" style="width: 100%;text-align:center" max-height="100%" border :data="user">
        <el-table-column fixed type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="venderCode" label="供应商编号" width="120"></el-table-column>
        <el-table-column prop="name" label="供应商名称" width="120"></el-table-column>
        <el-table-column prop="contactor" label="联系人" width="150"></el-table-column>
        <el-table-column prop="address" label="地址" width="170"></el-table-column>
        <el-table-column prop="postCode" label="邮政编码" width="120"></el-table-column>
        <el-table-column prop="createDate" label="注册日期" width="185"></el-table-column>
        <el-table-column prop="tel" label="电话" width="150"></el-table-column>
        <el-table-column prop="fax" label="传真" width="130"></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template slot-scope="scope">
          <el-button type="text" size="small" @click="change(scope.row)">修改</el-button>
           <el-button @click="del(scope.$index,scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
  <el-pagination
  background
    layout="prev, pager, next"
    :total="total" @current-change='pagechange'>
  </el-pagination>
</div>
    </div>

    <el-dialog
  :visible.sync="dialogVisible"
  width="30%"
  >
  <el-form :model="venderForm" status-icon  ref="venderForm" label-width="100px" class="demo-venderForm">
      <el-form-item class="xiu" label="供应商编号" prop="venderCode ">
        <el-input type="text" v-model="venderForm.venderCode" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item class="xiu" label="供应商名称" prop="name">
        <el-input type="text" v-model="venderForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="xiu" label="供应商密码" prop="passWord">
        <el-input type="password" v-model="venderForm.passWord" ></el-input>
      </el-form-item>
      <el-form-item class="xiu" label="联系人" prop="contactor">
      <el-input type="text" v-model="venderForm.contactor" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item class="xiu" label="地址" prop="address ">
       <el-input type="text" v-model="venderForm.address " autocomplete="off"  ></el-input>
      </el-form-item>
      <el-form-item class="xiu" label="邮政编码" prop="postCode "> 
      <el-input type="text" v-model="venderForm.postCode " autocomplete="off"  ></el-input>
      </el-form-item>
      <el-form-item class="xiu" label="注册日期" prop="createDate "> 
      <el-input type="text" v-model="venderForm.createDate " readonly autocomplete="off"  ></el-input>
      </el-form-item>
      <el-form-item class="xiu" label="电话" prop="tel">
      <el-input type="text" v-model="venderForm.tel" autocomplete="off"  ></el-input>
       </el-form-item>
      <el-form-item class="xiu" label="传真" prop="fax">
      <el-input type="text" v-model="venderForm.fax" autocomplete="off"  ></el-input>
       </el-form-item>
            </el-form>
  <span slot="footer" class="dialog-footer " id="lower">
    <el-button @click="dialogVisible = false" class="low">取 消</el-button>
    <el-button type="primary" @click="submitForm(venderForm)" class="low">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>
<script>
import axios from "axios";
const qs=require('querystring')
export default {
  name: "user_management",
  data() {
    return {
      user: [],
      proCateList:[],
      total:0,
      loading:true,
      dialogVisible: false,
       venderForm:{
        venderCode:'',
        name:'',
        passWord:'',
        contactor:'',
        address:'',
        postCode :'',
        createDate :'',
        tel:'',
        fax:''
      }
    };
  },
  created() {
    this.getProCateList()
    
    axios({
      url: "api/main/purchase/vender/show",
      method: "get"
    })
      .then(resp => {
        this.user = resp.data.list;
        console.log(this.user);
        
      })
      .catch(er => {
        console.log(er);
      });
    
      
  },
  methods:{
     a(){
    axios({
      url: "api/main/purchase/vender/show",
      method: "get"
    })
      .then(resp => {
        this.user = resp.data.list;
        // console.log(this.user);
      })
      .catch(er => {
        console.log(er);
      });
    },
    getProCateList(page,categoryId){
      this.loading=true
      axios({
         url: "api/main/purchase/vender/show",
          method: "get",
          params:{
            page,
            categoryId

          }
      }).then(resp=>{
        this.user = resp.data.list;
        this.proCateList=resp.data.list
        this.total=resp.data.total
        this.loading=false
        
      })
    },
    pagechange(page){
      this.getProCateList(page)
      console.log(page)
    },
    //删除
    del(i,r){
      axios({
        url:'api/main/purchase/vender/delete ',
        method:'post',
        data:qs.stringify({
            venderCode:r.venderCode,
        
        })
      }).then(resp=>{
       
         console.log(resp);
         if(resp.data.code===2){
           alert('删除成功')
           this.a()
         }else{
           alert("删除失败，有依赖记录")
         }
        
      }).catch(er=>{
        console.log(er);
        
      })
    },
    change(row){
      this.dialogVisible = true,
      this.venderForm.venderCode=row.venderCode,
      this.venderForm.name=row.name,
      this.venderForm.passWord=row.passWord,
      this.venderForm.createDate=row.createDate,
      this.venderForm.contactor=row.contactor,
      this.venderForm.address=row.address,
      this.venderForm.postCode =row.postCode ,
      this.venderForm.tel=row.tel,
      this.venderForm.fax=row.fax,
      console.log(this.venderForm)
    },
    submitForm(formName) {
        axios({
        url:'api/main/purchase/vender/update',
        method:'post',
         data: qs.stringify({
           venderCode:this.venderForm.venderCode,
           name:this.venderForm.name,
           passWord:this.venderForm.passWord,
           createDate:this.venderForm.createDate,
           contactor:this.venderForm.contactor,
           address:this.venderForm.address,
           postCode :this.venderForm.postCode, 
           tel:this.venderForm.tel,
           fax:this.venderForm.fax,
           })
        })
        .then(resp=>{
          if(resp.data.code===2){alert("修改成功")}
          console.log(resp.data)
           this.a()
        
          })
          .catch(err=>{
            console.log(err)
            })
           this.dialogVisible = false
 }
  
}
}
</script>
<style>
.el-table td,
.el-table th {
  text-align: center;
}
</style>
<style scoped>
*{padding:0;margin:0}
.nav {
  background-color: #545c64;
  line-height: 50px;
  width: 1291px;
}
.block{
  margin-left: 700px;
  margin-top: 30px;
}
.tb{line-height:60px;text-align:center}
.add{width:80px;height:30px;margin-left:-1140px;margin-bottom: 10px}
.low{width:80px;height:30px;}
.xiu{margin-bottom:15px}
#lower{line-height:60px}

</style>