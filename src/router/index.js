import Vue from 'vue'
import Router from 'vue-router'
// import mainpage from '@/components/mainpage'
// import log from '@/components/log'
// import reg from '@/components/reg'
// import user from '@/userManage/user'
// import supplier from '@/purchaseManage/supplier'
// import venderadd from '@/purchaseManage/venderadd'
// import newBuy from '@/purchaseManage/newBuy'
// import addnewbuy from '@/purchaseManage/addnewbuy'
// import settlement from '@/purchaseManage/settlement'
// import seek from '@/purchaseManage/seek'
// import storeEnter from '@/warehouse/storeEnter'
// import storeOut from '@/warehouse/storeOut'
// import storeCheck from '@/warehouse/storeCheck'
// import storeSeek from '@/warehouse/storeSeek'
// import incomeRegister from '@/financeManage/incomeRegister'
// import payRegister from '@/financeManage/payRegister'
// import registerSeek from '@/financeManage/registerSeek'
// import proudctKinds from '@/saleManage/productKinds'
// import proudctions from '@/saleManage/productions'
// import customer from '@/saleManage/customer'
// import newSale from '@/saleManage/newSale'
// import addnewSale from '@/saleManage/addnewSale'
// import closeSale from '@/saleManage/closeSale'
// import saleSeek from '@/saleManage/saleSeek'
// import purchaseReport from '@/reports/purchaseReport'
// import incomePayReport from '@/reports/incomePayReport'
// import storeEnterReport from '@/reports/storeEnterReport'
// import storeOutReport from '@/reports/storeOutReport'
// import storeCheckReport from '@/reports/storeCheckReport'
// import saleReport from '@/reports/saleReport'

Vue.use(Router)
const qs = require('querystring')

export default new Router({
  routes: [

    {
      path: '/',
      name: '登录',
      component:()=> import('@/components/log'),
      meta:{requireAuth:false}
    },
    {
      path: '/mainpage',
      name: '主页',
      component:()=> import('@/components/mainpage'),
      meta:{requireAuth:true,
      },
      children: [

        // 管理信息
        {
          path: '/user',
          name: '主页->系统管理->用户管理',
          component: ()=> import('@/userManage/user'),
          meta:{
            requireAuth:true,
            bpath:3
          }

        },
        {
          path: '/user/reg',
          name: '主页->系统管理->用户管理->添加',
          component:()=> import('@/components/reg'),
          meta:{
            requireAuth:true,
            bpath:3
          }

        },
        // 采购管理
        {
          path: '/supplier',
          name: '主页->采购管理->供应商管理',
          component:()=> import('@/purchaseManage/supplier'),
          meta:{
            requireAuth:true,
            bpath:1
          }
        },
        {
          path: '/venderadd',
          name: '主页->采购管理->供应商管理->添加供应商',
          component:()=> import('@/purchaseManage/venderadd'),
          meta:{
            requireAuth:true,
            bpath:1
          }
        },
        {
          path: '/newBuy',
          name: '主页->采购管理->采购单',
          component:()=> import('@/purchaseManage/newBuy'),
          meta:{
            requireAuth:true,
            bpath:1
          }
        },
        {
          path: '/addnewbuy',
          name: '主页->采购管理->新添采购单',
          component:()=> import('@/purchaseManage/addnewbuy'),
          meta:{
            requireAuth:true,
            bpath:1
          }
        },
        {
          path: '/settlement',
          name: '主页->采购管理->采购单了结',
          component:()=> import('@/purchaseManage/settlement'),
          meta:{
            requireAuth:true,
            bpath:1
          }
        },
        {
          path: '/seek',
          name: '主页->采购管理->采购单查询',
          component:()=> import('@/purchaseManage/seek'),
          meta:{requireAuth:true,bpath:1}
        },
        // 仓储管理
        {
          path: '/storeEnter',
          name: '主页->仓储管理->入库登记',
          component:()=> import('@/warehouse/storeEnter'),
          meta:{requireAuth:true,bpath:5}
        },
        {
          path: '/storeOut',
          name: '主页->仓储管理->出库登记',
          component:()=> import('@/warehouse/storeOut'),
          meta:{requireAuth:true,bpath:5}
        },
        {
          path: '/storeCheck',
          name: '主页->仓储管理->库存盘点',
          component:()=> import('@/warehouse/storeCheck'),
          meta:{requireAuth:true,bpath:5}
        },
        {
          path: '/storeSeek',
          name: '主页->仓储管理->库存查询',
          component:()=> import('@/warehouse/storeSeek'),
          meta:{requireAuth:true,bpath:5}
        },
        // 财务收支
        {
          path: '/incomeRegister',
          name: '主页->财务收支->收款登记',
          component:()=> import('@/financeManage/incomeRegister'),
          meta:{requireAuth:true,bpath:4}
        },
        {
          path: '/payRegister',
          name: '主页->财务收支->付款登记',
          component:()=> import('@/financeManage/payRegister'),
          meta:{requireAuth:true,bpath:4}
        },
        {
          path: '/registerSeek',
          name: '主页->财务收支->收支查询',
          component:()=> import('@/financeManage/registerSeek'),
          meta:{requireAuth:true,bpath:4}
        },
        // 销售管理
        {
          path: '/productKinds',
          name: '主页->销售管理->产品分类管理',
          component:()=> import('@/saleManage/productKinds'),
          meta:{requireAuth:true,bpath:2}
        },
        {
          path: '/productions',
          name: '主页->销售管理->产品管理',
          component:()=> import('@/saleManage/productions'),
          meta:{requireAuth:true,bpath:2}
        },
        {
          path: '/customer',
          name: '主页->销售管理->客户管理',
          component:()=> import('@/saleManage/customer'),
          meta:{requireAuth:true,bpath:2}
        },
        {
          path: '/newSale',
          name: '主页->销售管理->新添销售单 ',
          component:()=> import('@/saleManage/newSale'),
          meta:{requireAuth:true,bpath:2}
        },
        {
          path: '/addnewSale',
          name: '主页->销售管理->新添销售单->添加 ',
          component:()=> import('@/saleManage/addnewSale'),
          meta:{requireAuth:true,bpath:2}
        },
        {
          path: '/closeSale',
          name: '主页->销售管理->销售单了结',
          component:()=> import('@/saleManage/closeSale'),
          meta:{requireAuth:true,bpath:2}
        },
        {
          path: '/saleSeek',
          name: '主页->销售管理->销售单查询',
          component:()=> import('@/saleManage/saleSeek'),
          meta:{requireAuth:true,bpath:2}
        },
        // 业务报表
        {
          path: '/purchaseReport',
          name: '主页->业务报表->月度采购报表',
          component:()=>import('@/reports/purchaseReport'),
          meta:{requireAuth:true,bpath:6}
        },
        {
          path: '/incomePayReport',
          name: '主页->业务报表->月度收支登记报表',
          component:()=>import('@/reports/incomePayReport'),
          meta:{requireAuth:true,bpath:6}
        },
        {
          path: '/storeEnterReport',
          name: '主页->业务报表->月度入库报表',
          component:()=>import('@/reports/storeEnterReport'),
          meta:{requireAuth:true,bpath:6}
        },
        {
          path: '/storeOutReport',
          name: '主页->业务报表->月度出库报表',
          component:()=>import('@/reports/storeOutReport'),
          meta:{requireAuth:true,bpath:6}
        },
        {
          path: '/storeCheckReport',
          name: '主页->业务报表->月度库存报表',
          component:()=>import('@/reports/storeCheckReport'),
          meta:{requireAuth:true,bpath:6}
        },
        {
          path: '/saleReport',
          name: '主页->业务报表->月度销售报表',
          component:()=>import('@/reports/saleReport'),
          meta:{requireAuth:true,bpath:6}
        }
      ]
    }
  ]
})
