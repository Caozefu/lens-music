<template>
    <div class="player">
        <div class="top-control">
            <i class="iconfont icon-arrow-lift"></i>
            <span>私人FM</span>
        </div>
        <div class="content">
            <img :src="imgUrl" alt="" width="200" height="200">
            <div class="music-info">
                <p class="music-name">{{currentMusicName}}</p>
                <p class="artist">{{artist}} ></p>
            </div>
        </div>
        <div class="bottom-control">
            <i class="iconfont icon-delete"></i>
            <i class="iconfont icon-collection" @click="like" :class="{'like': isLike}"></i>
            <i class="iconfont large" :class="[playStatus ? 'icon-play' : 'icon-timeout']" @click="playMusic"></i>
            <i class="iconfont icon-nextsong" @click="next"></i>
            <i class="iconfont icon-message"></i>
        </div>
<!--        <h2>热门评论</h2>-->
<!--        <div class="comment">-->
<!--            <ul>-->
<!--                <li v-for="(item, index) of hotComments" :key="index">-->
<!--                    <h3>-->
<!--                        <img class="pic" :src="item.user.avatarUrl" alt="">-->
<!--                        <span class="name-time">-->
<!--                            <span class="name">{{item.user.nickname}}</span>-->
<!--                            <span class="time">{{getTime(item.time)}}</span>-->
<!--                        </span>-->
<!--                    </h3>-->
<!--                    <p>{{item.content}}</p>-->
<!--                </li>-->
<!--            </ul>-->
<!--        </div>-->
<!--        <h2>最新评论</h2>-->
<!--        <div class="comment">-->
<!--            <ul>-->
<!--                <li v-for="(item, index) of comments" :key="index">-->
<!--                    <h3>-->
<!--                        <img class="pic" :src="item.user.avatarUrl" alt="">-->
<!--                        <span class="name-time">-->
<!--                            <span class="name">{{item.user.nickname}}</span>-->
<!--                            <span class="time">{{getTime(item.time)}}</span>-->
<!--                        </span>-->
<!--                    </h3>-->
<!--                    <p>{{item.content}}</p>-->
<!--                </li>-->
<!--            </ul>-->
<!--        </div>-->
        <div class="bg" :style="`background-image: url(${imgUrl})`">
            <div class="mask"></div>
        </div>
        <audio ref="player" :src="src" controls style="display: none"></audio>
    </div>
</template>

<script>
    export default {
        name: "player",
        data() {
            return {
                musicList: [],
                musicListNum: 0,
                currentMusicName: '',
                artist: '',
                imgUrl: '',
                src: '',
                logStatus: false,
                comments: [],
                hotComments: [],
                playStatus: false,
                isLike: false
            }
        },
        methods: {
            // 下一首
            next() {
                this.isLike = false;
                this.musicListNum++;
                if (this.musicListNum > 2) {
                    this.getPersonFM();
                    return;
                }
                if (!this.musicList[this.musicListNum] || !this.musicList[this.musicListNum].id) return;
                this.getMusic(this.musicList[this.musicListNum].id);
                this.getComments(this.musicList[this.musicListNum].id);
                this.currentMusicName = this.musicList[this.musicListNum].name;
                this.artist = this.musicList[this.musicListNum].artists[0].name;
                this.imgUrl = this.musicList[this.musicListNum].album.picUrl;
            },
            // 收藏音乐
            like() {
                if (!this.musicList[this.musicListNum] || !this.musicList[this.musicListNum].id) return;
                this.$http.get('/like?id=' + this.musicList[this.musicListNum].id + '&like=' + !this.isLike)
                    .then(data => {
                        if (data.data.code === 200) {
                            this.isLike = !this.isLike
                        }
                    })
            },
            // 获取登陆状态
            getLoginStatus() {
                this.$http.get('/login/status?timestamp=' + new Date().getTime())
                    .then((data) => {
                        if (data && data.data.code === 200) {
                            this.logStatus = true;
                        }
                    })
                    .catch(() => {
                        this.logStatus = false;
                        alert('请登录');
                    });
            },
            // 获取私人FM
            getPersonFM() {
                this.$http.get('/personal_fm?timestamp=' + new Date().getTime())
                    .then(data => {
                        this.musicList = data.data.data;
                    }).then(() => {
                    this.getMusic(this.musicList[0].id);
                    this.getComments(this.musicList[0].id);
                    this.musicListNum = 0;
                    this.currentMusicName = this.musicList[0].name;
                    this.artist = this.musicList[0].artists[0].name;
                    this.imgUrl = this.musicList[0].album.picUrl;
                })
            },
            getMusic(id) {
                this.$http.get('/song/url?id=' + id)
                    .then(data => {
                        this.src = data.data.data[0].url;
                    })
                    .then(() => {
                        this.playStatus = true;
                        this.$refs['player'].play();
                    })
            },
            getComments(id) {
                this.$http.get(`comment/music?id=${id}&limit=20`)
                    .then(data => {
                        this.comments = data.data.comments;
                        this.hotComments = data.data.hotComments;
                    })
            },
            getTime(time) {
                return new Date(time).toLocaleDateString();
            },
            // 播放音乐
            playMusic() {
                if (this.playStatus) {
                    this.$refs['player'].pause();
                    this.playStatus = false
                } else {
                    this.$refs['player'].play();
                    this.playStatus = true
                }
            }
        },
        created() {
            this.getLoginStatus();
            this.getPersonFM();
        },
        mounted() {
            // this.$refs['player'].play();
            let $vm = this;
            this.$refs['player'].addEventListener('ended', function () {
                this.src = '';
                $vm.next();
            })
        }
    }
</script>

<style scoped lang="less">
    @keyframes scale {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.4);
        }
        100% {
            transform: scale(1);
        }
    }
    .player {
        width: 100vw;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .top-control {
            height: 100px;
            line-height: 100px;
            font-size: 35px;
            font-weight: 600;
            padding: 0 20px;
            color: #fff;
            .iconfont {
                font-size: 50px;
                margin-right: 30px;
                vertical-align: middle;
                color: #fff;
            }
        }
        & > .content img {
            display: block;
            width: 90vw;
            height: 90vw;
            margin: 0 auto;
            /*margin-top: 100px;*/
        }
        .music-info {
            margin: 40px auto;
            text-align: center;
            color: #fff;
            .music-name {
                font-weight: 700;
            }
            .artist {
                margin-top: 10px;
                font-weight: lighter;
                font-size: 25px;
            }
        }
        .bottom-control {
            width: 100vw;
            height: 200px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            /*margin-top: 400px;*/
            .iconfont {
                color: #fff;
                font-size: 70px;
                font-weight: 200;
                transition: all 0.3s;
                &.large {
                    font-size: 130px;
                }
                &.like {
                    animation: scale 0.3s;
                    color: #f00;
                }
            }
        }
        .bg {
            width: 150vw;
            height: 150vh;
            background-size: cover;
            -webkit-filter: blur(200px);
            filter: blur(200px);
            position: absolute;
            left: -100px;
            top: -50px;
            z-index: -9999;
            .mask {
                width: 100vw;
                height: 100vh;
                position: absolute;
                left: 0;
                top: 0;
                background: linear-gradient(
                        rgba(0,0,0,1) 0%,
                        rgba(0,0,0,0) 50%,
                        rgba(0,0,0,1) 100%
                )
                /*background-color: rgba(0,0,0,0.5);*/
            }
        }
    }
    .comment {
        ul {

        }
        li {
            padding: 10px 20px;
            & > p {
                margin: 5px 0 0 65px;
                padding-bottom: 10px;
                border-bottom: 1px solid rgba(0,0,0,0.09);
                font-size: 22px;
                line-height: 40px;
            }
        }
        .pic {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: inline-block;
            vertical-align: top;
        }
        .name-time {
            display: inline-block;
            height: 50px;
            margin-left: 15px;
            span {
                display: block;
                height: 40px;
                font-size: 20px;
                font-weight: 500;
                margin-bottom: 2px;
                color: #999;
            }
        }
    }
</style>
