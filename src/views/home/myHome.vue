<template>
    <div class="home">
        <div class="top-area">
            <ul>
                <li class="icon-part" @click="personalFm">
                    <div class="icon">
                        <img src="../../assets/image/my/fm.png" alt="">
                    </div>
                    <p>私人FM</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-home",
        methods: {
            personalFm() {
                this.$router.push('/music')
            }
        }
    }
</script>

<style scoped lang="less">
    .top-area {
        height: 150px;
        margin: 0 10px;
        padding: 0 20px;
        border-bottom: 1px solid rgb(242, 242, 242);
        display: flex;
        align-items: center;
        .icon-part {
            width: 120px;
            height: 120px;
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon {
                width: 70px;
                height: 70px;
                background-color: #ff4462;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 10px;
                & > img {
                    width: 80%;
                    height: 80%;
                }
            }
            & > p {
                font-size: 20px;
                font-weight: 500;
                color: rgb(170, 170, 170);
            }
        }
    }
</style>
