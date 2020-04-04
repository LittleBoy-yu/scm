<template>
  <div class="reg">
   <el-form :model="venderForm" :rules="rules" status-icon  ref="venderForm" label-width="100px" class="demo-venderForm">
      <el-form-item label="供应商编号" prop="venderCode">
        <el-input type="text" v-model="venderForm.venderCode" autocomplete="off"  onKeyUp="value=value.replace(/[\W]/g,'')"></el-input>
      </el-form-item>
      <el-form-item label="供应商名称" prop="name">
        <el-input type="text" v-model="venderForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="供应商密码" prop="passWord">
        <el-input type="password" v-model="venderForm.passWord" ></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contactor">
        <el-input type="text" v-model="venderForm.contactor" ></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input type="text" v-model="venderForm.address" ></el-input>
      </el-form-item>
      <el-form-item label="邮编" prop="postCode ">
        <el-input type="text" v-model="venderForm.postCode" ></el-input>
      </el-form-item>
      <el-form-item label="添加日期" prop="createDate">
      <el-input type="text" v-model="venderForm.createDate" autocomplete="off" readonly placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="tel ">
        <el-input type="text" v-model="venderForm.tel" ></el-input>
      </el-form-item>
      <el-form-item label="传真" prop="fax">
        <el-input type="text" v-model="venderForm.fax" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('venderForm')">提交</el-button>
        <el-button @click="resetForm('venderForm')">重置</el-button>
      </el-form-item>
      </el-form>
     <ul>
     <li>4~20位数字字母</li>
     <li>长度不超过100</li>
     <li>不能为空，4~20位字符</li>
     <li>不能为空</li>
     </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import dayjs from 'dayjs'
const qs = require('querystring')
export default {
  name: 'reg',
  data () {
    return {
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
      },rules: {
          venderCode: [
          { required: true, message: "请输入供应商编号", trigger: "blur" },
          { min: 1, message: "用户姓名不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入供应商名称", trigger: "blur" },
          { min: 1,max:100, message: "密码不能为空", trigger: "blur" }
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4,max:20, message: "密码不能为空", trigger: "blur" }
        ],
        contactor: [
          { required: true, message: "请输入联系人", trigger: "blur" },
          { min: 1, message: "联系人不能为空", trigger: "blur" }
        ]
      }
    }
      },
     created() {
         this.getDate()
     },
      methods: {
        getDate(){ 
            this.venderForm.createDate=dayjs().format('YYYY-MM-DD HH:mm:ss')
            
            setTimeout(this.getDate,1000); 
            },
      submitForm(formName) {
      this.$refs[formName].validate((valid) => {
      if(valid){
        axios({
        url:'api/main/purchase/vender/add',
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
           fax:this.venderForm.fax
           }
         )
        }).then(resp=>{
          if(resp.data.code===2){
            console.log(this.venderForm)
            this.$router.push('/supplier')}
          console.log(resp.data)
          }).catch(err=>{
            console.log(err)
            })
    }else{return false}
   });
 },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        
      }
     
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul{position: relative;top: -630px;left: 380px;}
li{list-style:none;line-height:63px;width:180px;text-align:left}
.demo-venderForm{width:500px;margin-left:-100px}
.reg{width:50%;margin-left:10%;margin-top:20px}
.imgright{position: relative;top:-455px;left:630px}
</style>
