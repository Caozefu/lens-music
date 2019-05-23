<template>
    <div class="player">
        <div class="bg" :style="`background-image: url(${musicInfo.album.picUrl})`"></div>
        <div class="title">
            <span class="back" @click="back"></span>
            <div class="music-name">
                <p class="name">{{musicInfo.name}}</p>
                <p class="artist">{{musicInfo.artists[0].name}}</p>
            </div>
            <span class="share"></span>
        </div>
        <div class="pic">
            <div :class="[isPlay ? 'play' : 'pause']">
                <img :src="musicInfo.album.picUrl" alt="">
            </div>
        </div>
        <div class="top-control">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="music-time-control">
            <span class="start-time">{{getPlayTime}}</span>
            <div class="time-line">
                <span class="line-has-gone" :style="changeLine"></span>
                <span class="line"></span>
            </div>
            <span class="end-time">{{duration}}</span>
        </div>
        <div class="bottom-control">
            <span class="play-type"></span>
            <span class="prev"></span>
            <span :class="[isPlay ? 'pause' : 'play']" @click="play"></span>
            <span class="next"></span>
            <span class="more"></span>
        </div>
    </div>
</template>

<script>
    import utils from '@/utils/index'

    export default {
        name: "new-player",
        props: {
            isPlay: Boolean,
            playTime: Number
        },
        data() {
            return {
                musicInfo: {},
                duration: '',
                originRouter: '',
                lineDefaultStyle: 'width: 0'
            }
        },
        computed: {
            getPlayTime() {
                let min = parseInt(this.playTime / 60);
                let sec = min > 0 ? this.playTime - min * 60 : this.playTime;
                return (min >= 10 ? min : '0' + min) + ':' + (sec >= 10 ? sec : '0' + sec);
            },
            changeLine() {
                let allTime = this.musicInfo.duration / 1000;
                let res = this.playTime * 65 / allTime;
                return `width: ${res}vw`;
            }
        },
        methods: {
            getMusicDuration() {
                let sec = parseInt(this.musicInfo.duration / 1000);
                let min = parseInt(sec / 60) >= 10 ? parseInt(sec / 60) : '0' + parseInt(sec / 60);
                this.duration = min + ':' + (sec % 60 > 10 ? sec % 60 : '0' + sec % 60);
            },
            back() {
                this.$router.push(this.originRouter);
            },
            play() {
                this.isPlay ?
                    this.$emit('pauseMusic') :
                    this.$emit('playMusic');
            }
        },
        created() {
            let data = this.$route.params;
            if (data.name) {
                utils.setLocalStorage('musicInfo', JSON.stringify(data));
            } else {
                data = JSON.parse(utils.getLocalStorage('musicInfo'));
            }
            this.musicInfo = data;
            this.getMusicDuration();

            this.$emit('music', this.musicInfo);
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                // console.log(vm.$router);
                vm.originRouter = from.path;
            });
        }
    }
</script>

<style scoped lang="less">
    @keyframes picRotate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .player .bg {
        position: absolute;
        top: -10vh;
        left: -10vw;
        z-index: -999;
        width: 120vw;
        height: 120vh;
        filter: blur(20px);
        background-image: url('http://p1.music.126.net/n41bSTrQwG_lQzkXz7cygg==/109951163892182787.jpg');
        background-size: 100% 100%;
    }

    .title {
        height: 5vh;
        display: flex;
        align-items: center;
        padding: 2vh 8vw;

        .back {
            display: inline-block;
            height: 3vh;
            width: 3vh;
            background-image: url('../../assets/image/back-white.png');
            background-size: 100%;
        }

        .share {
            display: inline-block;
            height: 3vh;
            width: 3vh;
            background-image: url('../../assets/image/share.png');
            background-size: 100%;
            position: absolute;
            right: 8vw;
        }

        .music-name {
            margin-left: 8vw;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: #fff;

            .name {
                font-size: 1.2rem;
                font-weight: 700;
            }

            .artist {
                font-size: 0.5rem;
            }
        }
    }

    .pic {
        height: 55vh;
        display: flex;
        justify-content: center;
        align-items: center;
        &>.play {
            animation-play-state: running;
        }
        &>.pause {
            animation-play-state: paused;
        }
        & > div {
            width: 33vh;
            height: 33vh;
            border-radius: 50%;
            border: 4vh solid rgba(255, 255, 255, .1);
            box-sizing: border-box;
            animation: picRotate 40s linear infinite;

            & > img {
                display: block;
                width: 100%;
                height: 101%;
                border-radius: 50%;
            }
        }
    }

    .top-control {
        height: 6vw;
        padding: 0 8vw;
        display: flex;
        justify-content: space-around;

        span {
            display: block;
            width: 6vw;
            height: 6vw;
            background-image: url('../../assets/image/love.png');
            background-size: 100%;
        }
    }

    .music-time-control {
        padding: 5vh 6vw;
        color: #fff;
        font-size: 0.1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .time-line {
            position: relative;
            .line, .line-has-gone {
                display: block;
                height: 2px;
                width: 65vw;
                background-color: rgba(255, 255, 255, 0.3);
            }
            .line-has-gone {
                background-color: #fff;
                position: absolute;
                left: 0;
                transition: all 0.2s;
            }
            .line-has-gone:after {
                content: '';
                display: block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: #fff;
                position: absolute;
                right: -2px;
                top: -2px;
            }
        }
    }
    .bottom-control {
        height: 6vh;
        padding: 0 2vw;
        display: flex;
        justify-content: space-around;
        align-items: center;
        span {
            width: 5vh;
            height: 5vh;
            display: block;
            background-size: 100%;
        }
        .play {
            width: 6vh;
            height: 6vh;
            background-image: url('../../assets/image/play.png');
        }
        .pause {
            width: 6vh;
            height: 6vh;
            background-image: url('../../assets/image/pause.png');
        }
        .prev {
            background-image: url('../../assets/image/prev.png');
        }
        .next {
            background-image: url('../../assets/image/next.png');
        }
        .play-type {
            background-image: url('../../assets/image/play-type-cycle.png');
        }
        .more {
            background-image: url('../../assets/image/more.png');
        }
    }
</style>
