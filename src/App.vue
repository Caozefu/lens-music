<template>
    <div id="app">
        <div id="nav">
            <!--      <router-link to="/">Home</router-link> |-->
            <!--      <router-link to="/user">User</router-link> |-->
            <!--      <router-link to="/music">Music</router-link>-->
            <router-view @music="music" @playMusic="playMusic" :isPlay="isPlay"/>
            <audio :src="src" id="global-player" ref="global-player"></audio>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                musicInfo: {},
                src: '',
                player: '',
                isPlay: false
            }
        },
        methods: {
            music(data) {
                this.musicInfo = data;
                this.getMusic(data.id);
            },
            getMusic(id) {
                this.$http.get('/song/url?id=' + id)
                    .then(data => {
                        this.src = data.data.data[0].url;
                    })
            },
            playMusic() {
                return this.player.play()
            },
            pauseMusic() {
                return this.player.pause()
            }
        },
        mounted() {
            this.player = this.$refs['global-player'];
            let vm = this;
            this.player.addEventListener('canplay', function () {
                vm.playMusic().then(() => {
                    this.isPlay = true;
                })
            })
        }
    }
</script>

<style>
    body, html {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    #global-player {
        display: none;
    }
</style>
