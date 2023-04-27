<template>
  <div class="container">
    <el-card class="card">
      <div v-if="!isRegister">
        <h2>登录</h2>
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-width="80px"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
        <p>
          没有账号？
          <a href="#" @click="isRegister = true">点击注册</a>
        </p>
      </div>
      <div v-else>
        <h2>注册</h2>
        <el-form
          :model="registerForm"
          :rules="registerRules"
          ref="registerForm"
          label-width="80px"
        >
          <el-form-item label="账号" prop="username">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="registerForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              type="password"
              v-model="registerForm.confirmPassword"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
        <p>
          已有账号？
          <a href="#" @click="isRegister = false">点击登录</a>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { userLogin, userRegister } from "@/uitls";
import { Message } from "element-ui";
export default {
  data() {
    return {
      isRegister: false,
      loginForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      loginRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      registerRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 处理登录逻辑
          userLogin(this.loginForm.username, this.loginForm.password).finally(
            () => {
              this.$router.push("/home");
            }
          );
        } else {
          return false;
        }
      });
    },
    register() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // 处理注册逻辑
          userRegister(
            this.registerForm.username,
            this.registerForm.password
          ).finally(() => {
            Message.success("注册成功");
            this.register = true;
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  position: absolute;
  margin-top: 200px;
  left: 50%;
  width: 40vw;
  height: 100%;
  transform: translate(-50%, -50%);
}
</style>
