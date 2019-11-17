<template>
    <div class="login">
        <div class="logo">
            <img src="../../assets/logo.png" alt="">
        </div>
        <div class="input-area">
            <div class="user-name">
                <p>用户名/手机号</p>
                <input type="text" v-model="username">
            </div>
            <div class="password">
                <p>密码</p>
                <input type="password" v-model="password">
            </div>
        </div>
        <div class="login-btn">
            <button @click="login">登 录</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            login() {
                this.$http.post('/login?email=' + this.username +'&password=' + this.password)
                    .then(data => {
                        if (data && data.data.code === 200) {
                            this.$router.push('/')
                        }
                    })
                    .catch(() => {
                    })
            },
            checkFields() {
                let flag = true;
                if (!this.username) {
                    flag = false;
                }
                if (!this.password) {
                    flag = false;
                }
                return flag;
            }
        }
    }
</script>

<style lang="less" scoped>
    input {
        margin: 0;
        padding: 0;
        outline: none;
        border: 0;
    }
    .login {
        .logo {
            width: 30vw;
            margin: 15vh auto;
            border-radius: 20px;
            img {
                width: 100%;
                display: block;
            }
        }
        .input-area {
            margin-top: 30px;
            & > div {
                width: 75vw;
                margin: 50px auto;
                p {
                    color: rgb(123, 123, 123);
                    font-size: 25px;
                }
                input {
                    width: 100%;
                    border-bottom: 1px solid rgb(236, 236, 236);
                    font-size: 30px;
                    display: block;
                    line-height: 40px;
                    &[type='password'] {
                        letter-spacing: 1em;
                    }
                    margin-top: 20px;
                }
            }
        }
        .login-btn {
            width: 70vw;
            margin: 0 auto;
            button {
                border: 0;
                outline: none;
                display: block;
                width: 100%;
                height: 60px;
                border-radius: 30px;
                background-color: #3e79f6;
                color: #fff;
                font-size: 25px;
            }
        }
    }
</style>
