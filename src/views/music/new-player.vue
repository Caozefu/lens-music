<template>
    <div class="player">
        <div class="title"></div>
        <div class="pic">
            <div>
                <img src="http://p1.music.126.net/n41bSTrQwG_lQzkXz7cygg==/109951163892182787.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "new-player"
    }
</script>

<style scoped lang="less">
    .title {
        height: 5vh;
    }
    .pic {
        height: 64vh;
        display: flex;
        justify-content: center;
        align-items: center;
        &>div {
            width: 33vh;
            height: 33vh;
            border-radius: 50%;
            border: 4vh solid #ccc;
            box-sizing: border-box;
            &>img {
                display: block;
                width: 100%;
                height: 101%;
                border-radius: 50%;
            }
        }
    }
</style>
