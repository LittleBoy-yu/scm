<template>
  <div id="mian">
    <div class="top">
      <img src="/static/img/logo.png" alt />
      <ul class="time">
        <li class="el-icon-user-solid">姓名:{{user?user:'请登录'}}</li>
        <li class="el-icon-time">系统时间 :{{time}}</li>
      </ul>
      <el-container class="container">
        <el-aside width="13%">
          <el-menu
            unique-opened
            default-active="2"
            id="aside"
            class="el-menu-vertical-demo left"
            background-color="#3E4A53"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/user"  :disabled="display(3)">用户管理</el-menu-item>
                <el-menu-item @click="out">重新登录</el-menu-item>
                <el-menu-item @click="out">退出系统</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2" :disabled="display(1)">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>采购管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/supplier">供应商管理</el-menu-item>
                <el-menu-item index="/newBuy">新添采购单</el-menu-item>
                <el-menu-item index="/settlement">采购单了结</el-menu-item>
                <el-menu-item index="/seek">采购单查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" :disabled="display(5)">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>仓储管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/storeEnter">入库登记</el-menu-item>
                <el-menu-item index="/storeOut">出库登记</el-menu-item>
                <el-menu-item index="/storeCheck">库存盘点</el-menu-item>
                <el-menu-item index="/storeSeek">库存查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" :disabled="display(4)">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>财务收支</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/incomeRegister">收款登记</el-menu-item>
                <el-menu-item index="/payRegister">付款登记</el-menu-item>
                <el-menu-item index="/registerSeek">收支查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5" :disabled="display(2)">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>销售管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/productKinds">产品分类管理</el-menu-item>
                <el-menu-item index="/productions">产品管理</el-menu-item>
                <el-menu-item index="/customer">客户管理</el-menu-item>
                <el-menu-item index="/newSale">新添销售单</el-menu-item>
                <el-menu-item index="/closeSale">销售单了结</el-menu-item>
                <el-menu-item index="/saleSeek">销售单查询</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6" :disabled="display(6)">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>业务报表</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/purchaseReport">月度采购报表</el-menu-item>
                <el-menu-item index="/incomePayReport">月度收支登记表</el-menu-item>
                <el-menu-item index="/storeEnterReport">月度入库报表</el-menu-item>
                <el-menu-item index="/storeOutReport">月度出库报表</el-menu-item>
                <el-menu-item index="/storeCheckReport">产品库存报表</el-menu-item>
                <el-menu-item index="/saleReport">月度销售报表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header class="nav">
            <p align="left" id="path">位置：{{path}}</p>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Cookies from "js-cookie";
export default {
  name: "mainpage",
  data() {
    return {
      time: "",
      user: Cookies.get("account"),
      models: Cookies.get("models")
    };
  },
  created() {
    this.getDate();
  },
  computed: {
    path() {
      return this.$route.name;
    }
  },
  methods: {
    out() {
      if (confirm("确定回到登录页吗？") === true) {
        Cookies.remove("account");
        Cookies.remove("token");
        Cookies.remove("models");
        Cookies.remove("JSESSIONID");
        this.$router.push("/");
      } else {
        return false;
      }
    },
    display(a) {
      let flag = true;
      if (this.models) {
        let arr = this.models.split("");
        arr.map(item => {
          if (item == a) {
            flag = false;
            return flag;
          }
        });
      }
      return flag;
    },
    getDate() {
      let now = new Date();
      this.time = now.toLocaleString();
      setTimeout(this.getDate, 1000);
    }
  }
};
</script>
<style>
#main {
  width: 100%;
}
.nav {
  background-color: #3e4a53;
  height: 30px;
  line-height: 50px;
  /* width: 1291px; */
  width: 100%;
}
.top {
  background: #ccc;
  height: 120px;
  /* line-height: 120px; */
}
.top {
  background-image: url("/static/img/timtop.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.top img {
  vertical-align: middle;
}
.time {
  list-style: none;
  padding: 0;
  display: flex;
  width: 430px;
  height: 40px;
  border: 1px solid #eee;
  border-radius: 50px;
  float: right;
  margin-right: 50px;
  margin-top: 50px;
  font-size: 14px;
}
.time li {
  line-height: 40px;
  margin-left: 20px;
}
#path {
  vertical-align: middle;
  color: #fff;
  margin: 5px;
}
.container {
  margin-top: 20px;
  width: 100%;
  background-image: url("/static/img/tt.jpg");
  height: 800%;
}
.el-main {
  padding: 5px 2px;
}
.el-tabs_nav-scroll {
  height: 30px !important;
}
</style>
