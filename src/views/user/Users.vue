<template>
    <div class="user">
        <h1>{{logStatus ? '已登陆' : '未登录'}}</h1>
        <button @click="getLoginStatus">login status</button>
        <form action="">
            <input type="text" v-model="username" placeholder="账号">
            <input type="password" v-model="password" placeholder="密码">
        </form>
        <button @click="login">登陆</button>
        <button @click="logout">logout</button>
    </div>
</template>

<script>
    export default {
        name: 'Users',
        data() {
            return {
                logStatus: false,
                username: '',
                password: '',
            }
        },
        methods: {
            getLoginStatus() {
                let start = '';
                let end = '';
                let cache = '';
                let timer = setInterval(() => {
                    this.$http.get('/personal_fm')
                        .then(data => {
                            if (!cache) {
                                start = new Date().getTime();
                                cache = data.data.data[0].name;
                            }
                            if (cache && data.data.data[0].name !== cache) {
                                cache = data.data.data[0].name;
                                end = new Date().getTime();
                            }
                        })

                    if (end) {
                        clearInterval(timer);
                        // console.log(start, end);
                    }
                }, 3000);

            },
            login() {
                this.$http.post('/login?email=' + this.username +'&password=' + this.password)
                    .then(data => {
                        if (data && data.data.code === 200) {
                            this.refreshStatus();
                        }
                    })
                    .catch(err => {
                        // console.log(err);
                    })
            },
            logout() {
                this.$http.post('/logout')
                    .then(data => {
                        if (data && data.data.code === 200) {
                            this.refreshStatus();
                        }
                    })
                    .catch(err => {
                        // console.log(err);
                    })
            },
            refreshStatus() {
                this.$http.get('/login/status?timestamp=' + new Date().getTime())
                    .then((data) => {
                        if (data && data.data.code === 200) {
                            this.logStatus = true;
                        }
                    })
                    .catch(() => {
                        this.logStatus = false;
                    });
            }
        },
        created() {
            this.refreshStatus();
        }
    }
</script>
