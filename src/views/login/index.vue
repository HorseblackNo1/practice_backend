<template >
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
            label-position="left">
            <div class="title-container">
                <h3 class="title">Login Form</h3>
            </div>

            <el-form-item prop="username">
                <span class="svg-container">
                    <!-- <svg-icon icon-class="user" /> -->
                    <el-icon>
                        <House />
                    </el-icon>
                </span>
                <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text"
                    tabindex="1" autocomplete="on" />
            </el-form-item>

            <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                <el-form-item prop="password">
                    <span class="svg-container">
                        <!-- <svg-icon icon-class="password" /> -->
                        <el-icon>
                            <Aim />
                        </el-icon>
                    </span>
                    <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                        placeholder="Password" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock"
                        @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
                    <span class="show-pwd" @click="showPwd">
                        <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
                        <el-icon v-if="passwordType === 'password'">
                            <Setting />
                        </el-icon>
                        <el-icon v-else>
                            <Link />
                        </el-icon>
                    </span>
                </el-form-item>
            </el-tooltip>

            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                @click.native.prevent="handleLogin">Login</el-button>
            <div style="position:relative">
                <div class="tips">
                    <span>Username : admin</span>
                    <span>Password : any</span>
                </div>
                <div class="tips">
                    <span style="margin-right:18px;">Username : editor</span>
                    <span>Password : any</span>
                </div>

                <el-button class="thirdparty-button" type="primary" @click="showDialog = true">
                    Or connect with
                </el-button>
            </div>

        </el-form>


    </div>
</template>
<script>
import { validUsername } from '@/utils/validate'

import { mapStores } from 'pinia'
import { useUserStore } from '@/stores'


import { isDeubg } from '@/utils/config'
import { userLogin } from '@/api/user.js'
import { thumbProps } from 'element-plus'
import { showToast } from '@/utils/pageInteractive';

export default {
    name: 'Login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        return {
            msg: "login",
            loginForm: {
                username: 'admin',
                password: '111111'
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            passwordType: 'password',
            capsTooltip: false,
            loading: false,
            showDialog: false,
            redirect: undefined,
            otherQuery: {}
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    created() {

    },
    mounted() {
        if (this.loginForm.username === '') {
            this.$refs.username.focus()
        } else if (this.loginForm.password === '') {
            this.$refs.password.focus()
        }
    },
    unmounted() { },
    methods: {
        checkCapslock(e) {
            const { key } = e
            this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
        },
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.getUserInfo()
                    //替换跳转
                    // this.$store.dispatch('user/login', this.loginForm)
                    //     .then(() => {
                    //         this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
                    //         this.loading = false
                    //     })
                    //     .catch(() => {
                    //         this.loading = false
                    //     })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        async getUserInfo() {
            try {
                let loginResult = await userLogin({
                    username: this.loginForm.username,
                    password: this.loginForm.password
                })
                //全局存储Token
                this.userStore.setToken({
                    token: loginResult.data.token
                })

                // //全局存储userInfo
                // this.userStore.setUserInfo({
                //     userInfo:loginResult.data
                // })

                this.loading = false

                    this.$nextTick(() => {
                        this.$router.push('/')
                    })
                //跳转首页



            } catch (e) {
                this.loading = false
                showToast({ type: 'error', text: '登录出错了' })
            }
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
                if (cur !== 'redirect') {
                    acc[cur] = query[cur]
                }
                return acc
            }, {})
        }
    },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        .el-input__wrapper {
            width: 100%;
            box-shadow: none;
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }

    .thirdparty-button {
        position: absolute;
        right: 0;
        bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
        .thirdparty-button {
            display: none;
        }
    }
}
</style>