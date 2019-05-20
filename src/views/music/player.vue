<template>
    <div>
        <img :src="imgUrl" alt="" width="200" height="200">
        <h1>{{currentMusicName}} - {{artist}}</h1>
        <audio ref="player" :src="src" controls autoplay></audio>
        <button @click="next">Next</button>
        <button @click="like">Like</button>
        <h2>热门评论</h2>
        <div class="comment">
            <ul>
                <li v-for="(item, index) of hotComments" :key="index">
                    <h3>
                        <img class="pic" :src="item.user.avatarUrl" alt="">
                        <span class="name-time">
                            <span class="name">{{item.user.nickname}}</span>
                            <span class="time">{{getTime(item.time)}}</span>
                        </span>
                    </h3>
                    <p>{{item.content}}</p>
                </li>
            </ul>
        </div>
        <h2>最新评论</h2>
        <div class="comment">
            <ul>
                <li v-for="(item, index) of comments" :key="index">
                    <h3>
                        <img class="pic" :src="item.user.avatarUrl" alt="">
                        <span class="name-time">
                            <span class="name">{{item.user.nickname}}</span>
                            <span class="time">{{getTime(item.time)}}</span>
                        </span>
                    </h3>
                    <p>{{item.content}}</p>
                </li>
            </ul>
        </div>
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
                hotComments: []
            }
        },
        methods: {
            // 下一首
            next() {
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
                this.$http.get('/like?id=' + this.musicList[this.musicListNum].id)
                    .then(data => {
                        if (data.data.code === 200) {
                            alert('like success');
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
    h3 {
        margin: 0;
        padding: 0;
    }
    .comment {
        ul {
            height: 50vh;
        }
        li {
            padding: 10px 20px;
            &>p {
                margin: 5px 0 0 45px;
                padding-bottom: 10px;
                border-bottom: 1px solid rgba(0,0,0,0.09);
                font-size: 15px;
                line-height: 1.6;
            }
        }
        .pic {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: inline-block;
            vertical-align: top;
        }
        .name-time {
            display: inline-block;
            height: 30px;
            margin-left: 15px;
            span {
                display: block;
                height: 15px;
                font-size: 12px;
                font-weight: 500;
                margin-bottom: 2px;
                color: #999;
            }
        }
    }
</style>
