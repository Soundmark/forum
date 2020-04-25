import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import SignUp from '@/view/sign-up'
import SignIn from '@/view/sign-in'
import IndexData from '@/view/index-data'
import User from '@/view/user'
import UserData from '@/view/user/user-data'
import UserPost from '@/view/user/user-post'
import UserFavor from '@/view/user/user-favor'
import UserMessage from '@/view/user/user-message'
import Detail from '@/view/detail'
import Edit from '@/view/edit'
import Sort from '@/view/sort'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'home',
          name: 'IndexData',
          meta: {
            needSignIn: false
          },
          component: IndexData
        },
        {
          path: 'sort',
          name: 'Sort',
          meta: {
            needSignIn: false
          },
          component: Sort
        },
        {
          path: 'detail',
          name: 'Detail',
          meta: {
            needSignIn: false
          },
          component: Detail
        },
        {
          path: 'edit',
          name: 'Edit',
          meta: {
            needSignIn: true
          },
          component: Edit
        },
        {
          path: 'sign-up',
          name: 'SignUp',
          meta: {
            needSignIn: false
          },
          component: SignUp
        },
        {
          path: 'sign-in',
          name: 'SignIn',
          meta: {
            needSignIn: false
          },
          component: SignIn
        },
        {
          path: 'user',
          name: 'User',
          component: User,
          meta: {
            needSignIn: true
          },
          children: [
            {
              path: 'data',
              name: 'UserData',
              meta: {
                needSignIn: true
              },
              component: UserData
            },
            {
              path: 'post',
              name: 'UserPost',
              meta: {
                needSignIn: true
              },
              component: UserPost
            },
            {
              path: 'favor',
              name: 'UserFavor',
              meta: {
                needSignIn: true
              },
              component: UserFavor
            },
            {
              path: 'message',
              name: 'UserMessage',
              meta: {
                needSignIn: true
              },
              component: UserMessage
            }
          ]
        }
      ]
    }
  ]
})
