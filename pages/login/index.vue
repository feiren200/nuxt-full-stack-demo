<template>
  <div class="login-layout">
    <h1 class="title">欢迎使用</h1>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="登录" name="login">
        <el-card class="card">
          <el-form
            ref="loginFormRef"
            :model="form"
            label-position="left"
            :rules="rules"
            label-width="80"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password" show-password />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onLogin(loginFormRef)"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <el-card class="card">
          <el-form
            ref="registerFormRef"
            :model="form"
            :rules="rules"
            label-position="left"
            label-width="80"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="form.password" show-password />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                type="password"
                v-model="form.confirmPassword"
                show-password
              />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onRegister(registerFormRef)"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <el-button @click="getUser">userInfo</el-button>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash'
import type { FormInstance, FormRules } from 'element-plus'
import { regEmail, regPhone } from '~/utils'
import { useUserStore } from '~/store/user'
import type { IUser } from '~/server/models/userModel'
export interface User extends IUser {
  token: string
}
const userStore = useUserStore()
definePageMeta({ layout: 'login' })
interface RuleForm {
  username: string
  password: string
  confirmPassword?: string
  phone: string
  email?: string
}
const loginFormRef = ref<FormInstance>()
const registerFormRef = ref<FormInstance>()
const activeName = ref('login')
const form = reactive<RuleForm>({
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  email: '',
})

const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== form.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (regPhone(value)) {
          return callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      },
    },
  ],
  email: [
    {
      validator: (rule, value, callback) => {
        if (!value || regEmail(value)) {
          return callback()
        } else {
          return callback(new Error('请输入正确的邮箱'))
        }
      },
    },
  ],
})
const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      console.log(form)
      const data = await http<User>('/api/login', {
        method: 'POST',
        data: {
          username: form.username,
          password: encryptPassword(form.password),
        },
      })
      console.log(data)
      userStore.setUserInfo(data.data)
    }
  })
}
const onRegister = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      console.log(form)
      const formData = _.cloneDeep(form)
      formData.password = encryptPassword(formData.password) as string
      delete formData.confirmPassword
      const data = await http('/api/user', {
        method: 'POST',
        data: formData,
      })
      console.log(data)
    }
  })
}
const getUser = async () => {
  const data = await http<User>('/api/user', {
    method: 'GET',
  })
  console.log(data)
}
</script>

<style scoped lang="scss">
.login-layout {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-top: 200px;
  .card {
    width: 500px;
  }
}
</style>
