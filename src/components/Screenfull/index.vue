<template>
    <div>
        <el-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="click">
            <Ticket />
        </el-icon>
        <!-- <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="click" /> -->

    </div>
</template>
<script>
import screenfull from 'screenfull'

import { showToast } from '@/utils/pageInteractive'
export default {
    data() {
        return {
            msg: 'screenfull',
            isFullscreen: false
        }
    },
    mounted() {
        this.init()
    },
    beforeDestroy() {
        this.destroy()
    },
    methods: {
        click() {
            /*
                vue2.0+ screenfull.Enabled
                vue3.0+ screenfull.isEnabled
            */
            if (!screenfull.isEnabled) {
                showToast({type:'warning',text:'you browser can not work'})
                return false
            }
            screenfull.toggle()
        },
        change() {
            this.isFullscreen = screenfull.isFullscreen
        },
        init() {
            if (screenfull.isEnabled) {
                screenfull.on('change', this.change)
            }


        },
        destroy() {
            if (screenfull.isEnabled) {
                screenfull.off('change', this.change)
            }
        }
    }
}
</script>
<style scoped>
.screenfull-svg {
    display: inline-block;
    cursor: pointer;
    fill: #5a5e66;
    ;
    width: 20px;
    height: 20px;
    vertical-align: 10px;
}
</style>