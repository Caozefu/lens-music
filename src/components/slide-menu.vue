<template>
    <div class="slide-menu">
        <div class="slide-menu-content" :class="{'active': showContent}">
            <div class="user-info">
                <template v-if="!loginStatus">
                    <p>登录享受更多功能</p>
                    <el-button round @click="toLogin">立即登录</el-button>
                </template>
                <template v-else>
                    <div class="avatarUrl">
                        <img :src="userInfo.profile.avatarUrl" alt="">
                    </div>
                    <div class="username">
                        <span>{{userInfo.profile.nickname}}</span>
                        <span class="level">Lv.{{userInfo.level}}</span>
                    </div>
                </template>
            </div>
            <div class="controls">
                <ul>
                    <li><i class="iconfont icon-set"></i>设置</li>
                    <li @click="logout" v-if="loginStatus"><i class="iconfont icon-sorting" style="transform: rotate(90deg)"></i>切换账号</li>
                </ul>
            </div>
        </div>
        <div class="mask" @click="close" @touchmove="close"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "slide-menu",
        data() {
            return {
                showContent: false,
            }
        },
        computed: {
            ...mapGetters(['userInfo', 'loginStatus'])
        },
        methods: {
            close() {
                this.showContent = false;
                setTimeout(() => {
                    this.$emit('close')
                }, 100);
            },
            toLogin() {
                this.$router.push('login')
            },
            logout() {
                this.$http.post('/logout')
                    .then(data => {
                        if (data && data.data.code === 200) {
                            this.$store.dispatch('logout')
                            this.$router.push('login')
                        }
                    })
                    .catch(() => {
                    })
            },
        },
        mounted() {
            setTimeout(() => {
                this.showContent = true
            }, 20);
        }
    }
</script>

<style scoped lang="less">
    .slide-menu {
        width: 100vw;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
        .slide-menu-content {
            width: 70%;
            height: 100vh;
            background-color: #fff;
            position: relative;
            z-index: 1001;
            transform: translateX(-100%);
            transition: all .2s;
            &.active {
                transform: translateX(0);
            }
            .user-info {
                height: 300px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding: 50px 0 50px 50px;
                box-sizing: border-box;
                border-bottom: 1px solid #DCDFE6;
                & > button {
                    margin-top: 50px;
                }
                .avatarUrl {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-bottom: 40px;
                    & > img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .username {
                    line-height: 30px;
                }
                .level {
                    display: inline-block;
                    color: rgb(119, 119, 119);
                    background-color: rgb(236, 236, 236);
                    line-height: 30px;
                    font-size: 20px;
                    padding: 0 20px;
                    border-radius: 20px;
                    margin-left: 20px;
                    vertical-align: middle;
                    font-weight: 500;
                    font-style: italic;
                }
            }
            .controls {
                padding-top: 30px;
                padding-left: 30px;
                ul > li {
                    margin: 30px 20px;
                    font-size: 28px;
                    .iconfont {
                        display: inline-block;
                        margin-right: 20px;
                    }
                }
            }
        }
        .mask {
            height: 100%;
            width: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 1000;
            position: absolute;
            left: 0;
            top: 0;
        }
    }
</style>
