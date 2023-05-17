<template >
    <div class="navbar">
        <div class="navbar_left navbar_item">
            <Hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
            {{ sidebar.opened }}
            <div class="breadcrumb">面包屑</div>
        </div>
        <div class="navbar_right  navbar_item right-menu">
            <template v-if="device !== 'mobile'">
                <!-- <search id="header-search" class="right-menu-item" /> -->

                <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->
                <screenfull id="screenfull" class="right-menu-item hover-effect" />

                <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
                    <size-select id="size-select" class="right-menu-item hover-effect" />
                </el-tooltip> -->

            </template>

            <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar">
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/profile/index">
                        <el-dropdown-item>Profile</el-dropdown-item>
                    </router-link>
                    <router-link to="/">
                        <el-dropdown-item>Dashboard</el-dropdown-item>
                    </router-link>
                    <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
                        <el-dropdown-item>Github</el-dropdown-item>
                    </a>
                    <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
                        <el-dropdown-item>Docs</el-dropdown-item>
                    </a>
                    <el-dropdown-item divided @click.native="logout">
                        <span style="display:block;">Log Out</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> -->

            <el-dropdown class="avatar-container right-menu-item hover-effect">
                <div class="avatar-wrapper">
                    <img :src="userInfo.fs_avatar_url"
                        class="user-avatar">
                        {{userInfo.uc_name}}
                    <el-icon>
                        <CaretBottom />
                    </el-icon>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item divided @click.native="logout">
                            <span style="display:block;">Log Out</span>
                        </el-dropdown-item> 
                        <!-- <router-link to="/profile/index">
                            <el-dropdown-item>Profile</el-dropdown-item>
                        </router-link>
                        <router-link to="/">
                            <el-dropdown-item>Dashboard</el-dropdown-item>
                        </router-link>
                        <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
                            <el-dropdown-item>Github</el-dropdown-item>
                        </a>
                        <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
                            <el-dropdown-item>Docs</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided @click.native="logout">
                            <span style="display:block;">Log Out</span>
                        </el-dropdown-item> -->
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>
</template>
<script>

import { mapState, mapActions,mapStores } from 'pinia'
import { useAppInfoStore,useUserStore } from '@/stores'


import Hamburger from '@/components/Hamburger/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'


export default {
    data() {
        return {
            msg: 'Navbar',
        }

    },
    components: {
        Hamburger,
        Screenfull
    },
    computed: {

        ...mapStores(useAppInfoStore,useUserStore),
        ...mapState(useAppInfoStore, {
            sidebar: state => state.sidebar,
            device: state => state.device,
            size: state => state.size,
        }),
        ...mapState(useUserStore,{
            userInfo: state => state.userInfo
        })
    },
    mounted() {
        console.log("this.userInfo",this.userInfo)
    },
    methods: {
        toggleSideBar() {
            this.appInfoStore.changeSidebarOpened()
            // this.useAppInfoStore.changeSidebarOpened()
        },
        logout(){
            console.log("this=>",this)
            this.userStore.userLayout()
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)

        }
    }
}
</script>
<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .navbar_item {
        display: flex;
        align-items: center;
    }

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        // float: left;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, .025)
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background .3s;

                &:hover {
                    background: rgba(0, 0, 0, .025)
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                display: flex;
                align-items: center;
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>