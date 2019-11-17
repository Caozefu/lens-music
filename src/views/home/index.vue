<template>
    <div>
        <nav>
            <i class="iconfont icon-category" @click="showMenu = true"></i>
            <div class="nav-bar">
                <ul>
                    <li class="active">我的</li>
                    <li>发现</li>
                    <li>云村</li>
                    <li>视频</li>
                </ul>
            </div>
            <i class="iconfont icon-search"></i>
        </nav>
        <transition name="el-fade-in-linear">
            <slide-menu v-if="showMenu" @close="showMenu = false"></slide-menu>
        </transition>
        <router-view></router-view>
    </div>
</template>

<script>
    import slideMenu from '../../components/slide-menu'
    export default {
        name: "index",
        data() {
            return {
                showMenu: false
            }
        },
        components: {
            slideMenu
        },
        methods: {
            // 刷新登录状态
            refreshStatus() {
                this.$http.get('/login/status?timestamp=' + new Date().getTime())
                    .then((data) => {
                        if (data && data.data.code === 200) {
                            this.$store.dispatch('refreshLoginStatus', true);
                            this.$http.get('/user/detail?uid=' + data.data.profile.userId)
                                .then(res => {
                                    if (data && data.data.code === 200) {
                                        this.$store.dispatch('updateUserInfo', res.data)
                                    }
                                })
                        }
                    })
                    .catch(() => {
                        this.$store.dispatch('refreshLoginStatus', false);
                    });
            }
        },
        created() {
            this.$router.push('/my');
            this.refreshStatus()
        }
    }
</script>

<style scoped lang="less">
nav {
    height: 100px;
    line-height: 100px;
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    .iconfont {
        font-size: 50px;
    }
    .nav-bar ul {
        width: 400px;
        display: flex;
        justify-content: space-between;
        & > li {
            font-size: 30px;
            color: #999;
            &.active {
                font-size: 40px;
                color: #000;
                font-weight: 900;
            }
        }
    }
}
</style>
