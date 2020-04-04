<template>
  <div class="reg">
   <el-form :model="userForm" :rules="rules" status-icon  ref="userForm" label-width="100px" class="demo-userForm">
      <el-form-item label="用户账号" prop="account" >
        <el-input type="text" v-model="userForm.account" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" prop="name" >
        <el-input type="text" v-model="userForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="passWord">
        <el-input type="password" v-model="userForm.passWord" ></el-input>
      </el-form-item>
      <el-form-item label="添加日期" prop="createDate">
      <el-input type="text" v-model="userForm.createDate" autocomplete="off" readonly placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="modelcodes"> 
      <el-checkbox-group v-model="userForm.modelcodes">
      <el-checkbox label="1" name="type" >采购管理</el-checkbox>
      <el-checkbox label="2" name="type" >销售管理</el-checkbox>
      <el-checkbox label="3" name="type" >系统管理</el-checkbox>
      <el-checkbox label="4" name="type" >财务管理</el-checkbox>
      <el-checkbox label="5" name="type" >仓库管理</el-checkbox>
      <el-checkbox label="6" name="type" >业务报表</el-checkbox>
      </el-checkbox-group>
      </el-form-item>
    
      <el-form-item label="锁定状态" prop="status"> 
      <el-switch v-model="userForm.status" active-color="#FF0A00" inactive-color="#999"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
        <el-button @click="resetForm('userForm')">重置</el-button>
      </el-form-item>
      </el-form>
     <!-- <ul>
     <li>标题不能超过30个字符</li>
     <li>多个关键字用,隔开</li>
     <li>默认为用户账号</li>
     </ul> -->
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
      userForm:{
        account:'',
        name:'',
        passWord:'',
        createDate:'',
        status:false,
        modelcodes:[]
      },
       rules: {
          account: [
            { required: true, message: '请输入用户账号', trigger: 'blur' },
            { min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入用户姓名', trigger: 'blur' },
            { min: 1, message: '用户姓名不能为空', trigger: 'blur' }
          ],
          passWord: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, message: '密码不能为空', trigger: 'blur' }
          ]
          },
      }

      },
     created() {
         this.getDate()
     },
    
      methods: {
        getDate(){ 
            this.userForm.createDate=dayjs().format('YYYY-MM-DD HH:mm:ss')
            
            setTimeout(this.getDate,1000); 
            },
      submitForm(formName) {
      this.$refs[formName].validate((valid) => {
      if(valid){
        axios({
        url:'api/main/system/user/add',
        method:'post',
         data: qs.stringify({
           account:this.userForm.account,
           name:this.userForm.name,
           passWord:this.userForm.passWord,
           createDate:this.userForm.createDate,
           status:this.userForm.status?1:0,
           modelcodes:this.userForm.modelcodes
           }
         )
        }).then(resp=>{
          if(resp.data.code===2){
            console.log(this.userForm)
            this.$router.push('/user')}
            this.$message.success(`${resp.data.message}`)
          console.log(resp.data)
          }).catch(err=>{
            console.log(err)
            })
    }else{
     console.log("cuole")
      return false}
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
/* ul{position: relative;top: -500px;left: 380px;}
li{list-style:none;line-height:65px;width:180px;text-align:left} */
.demo-userForm{width:500px;margin-left:-100px}
.reg{width:50%;margin-left:10%;margin-top:20px}
.imgright{position: relative;top:-455px;left:630px}
</style>
