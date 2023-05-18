<template >
    <div :class="classObj" class="app-wrapper">
        <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        <Sidebar class="sidebar-container" />
        <div :class="{ hasTagsView: needTagsView }" class="main-container">
            <div :class="{ 'fixed-header': fixedHeader }">
                <Navbar />
                <!-- v-if="needTagsView" -->
                <!-- <Tags-view /> -->
            </div>
            <div class="app-main">
                <router-view></router-view>
            </div>
            
            <!-- <App-main /> -->
            <!-- v-if="showSettings" -->
            <!-- <Setting /> -->
        </div>
    </div>
</template>
<script>
import { useAppInfoStore,useUserStore } from '@/stores'
import { mapState,mapStores} from 'pinia'
import { Sidebar, Navbar, TagsView, AppMain, Setting } from './components'

export default {
    data() {
        return {
            msg: "layout",
            needTagsView: true
        }
    },
    computed: {
        ...mapStores(useUserStore),
        ...mapState(useAppInfoStore, {
            sidebar: state => state.sidebar,
            device: state => state.device,
            size: state => state.size

        }),
        classObj() {
            return {
                hideSidebar: this.sidebar.opened,
                openSidebar: !this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device == 'mobile',
            }
        }
    },
    components: {
        Sidebar,
        Navbar,
        TagsView,
        AppMain,
        Setting,
    },

    mounted() {
        console.log("this=>", this)
       
        // window.addEventListener('beforeunload', e =>this.test(e))
    },
    methods:{
        test(e){
            // this.userStore.userLayout()
            console.log('刷新或关闭')

        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.module.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px)
}

.mobile .fixed-header {
    width: 100%;
}
.app-main{
    width: 100%;
    height: 800px;
    background:rgba($color: #000000, $alpha: 0.1);
}
</style>