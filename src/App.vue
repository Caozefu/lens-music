<template>
    <div id="app">
        <div id="nav">
            <!--      <router-link to="/">Home</router-link> |-->
            <!--      <router-link to="/user">User</router-link> |-->
            <!--      <router-link to="/music">Music</router-link>-->
            <router-view @music="music"
                         @playMusic="playMusic"
                         @pauseMusic="pauseMusic"
                         :isPlay="isPlay" :playTime="playTime"/>
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
                isPlay: false,
                playTime: 0
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
                this.player.play();
                this.isPlay = true;
            },
            pauseMusic() {
                this.player.pause();
                this.isPlay = false;
            }
        },
        mounted() {
            this.player = this.$refs['global-player'];
            let vm = this;
            this.player.addEventListener('canplay', function () {
                vm.playMusic();
                vm.isPlay = true;
            });
            this.player.addEventListener('timeupdate', function () {
                vm.playTime = parseInt(this.currentTime);
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
