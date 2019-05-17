<template>
    <div class="home">
        <h1>每日推荐</h1>
        <ul style="text-align: left" class="music-list">
            <li v-for="(item, index) in musicList" :key="index">
                <p>{{item.name}}</p>
                <span>{{item.artists[0].name}} - {{item.alias[0]}}</span>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: 'home',
        data() {
            return {
                musicList: []
            }
        },
        created() {
            this.$http.get('/recommend/songs')
                .then(data => {
                    this.musicList = data.data.recommend;
                })
        }
    }
</script>

<style>
    body, div, ul, li, h1, p {
        margin: 0;
        padding: 0;
    }
    ul {
        list-style: none;
    }
    .music-list li {
        padding: 10px;
    }
    .music-list li p {
        font-weight: 900;
    }
    .music-list li span {
        font-size: 14px;
        color: #999;
    }
</style>
