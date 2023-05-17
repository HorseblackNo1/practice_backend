<template >
    <div :class="{ 'has-logo': showLogo }">
        <Logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg"
                :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText"
                :collapse-transition="false" mode="vertical">

                <template v-for="(item, index) in routersArray" :key="index">
                    <template v-if="!item.hidden">
                        <template v-if="item.children && item.children.length > 1">
                            <el-sub-menu :index="index">
                                <template #title>
                                    <el-icon>
                                        <setting />
                                    </el-icon>
                                    <span>二级菜单{{ index }}</span>
                                </template>
                                <el-menu-item-group>
                                    <template v-for="(sub, subIndex) in item.children">
                                            <el-menu-item  @click="gotoPageSub(item,sub)"
                                                :index="index + '-' + subIndex">{{ sub.name }}</el-menu-item>
                                    </template>

                                </el-menu-item-group>
                            </el-sub-menu>
                        </template>
                        <template v-if="item.children && item.children.length == 1">
                            <el-menu-item :index="index" @click="gotoPageSub(item)">
                                <el-icon>
                                    <setting />
                                </el-icon>
                                <template #title v-if="item.children && item.children.length == 1">{{ item.children[0].name
                                }}</template>
                                <template #title v-else>{{ item.name }}</template>
                            </el-menu-item>
                        </template>
                    </template>

                </template>
                <!-- <router-link to="/dashboard">
                    <el-menu-item index="1">
                        <span>dashboard</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/documentation/index">
                    <el-menu-item index="2">
                        <span>documentation</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/guide/index">
                    <el-menu-item index="3">
                        <span>guide</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/profile">
                    <el-menu-item index="4">
                        <span>profile</span>
                    </el-menu-item>
                </router-link> -->

            </el-menu>
        </el-scrollbar>

    </div>
</template>
<script>
import variables from '@/styles/variables.module.scss'

// import { routes } from '@/router'



import Logo from './Logo.vue'
import { useAppInfoStore, useUserStore } from '@/stores'

import { mapState, mapStores } from 'pinia'

// getRouters

export default {
    data() {
        this.onlyOneChild = null
        return {
            msg: 'sideBar',
            showLogo: true, //需要全局存储

            routerArray: [],
            // routerStatic: [
            //     {
            //         path: '/redirect',
            //         component: Layout,
            //         hidden: true,
            //         children: [
            //             {
            //                 path: '/redirect/:path(.*)',
            //                 component: () => import('@/views/redirect/index')
            //             }
            //         ]
            //     },
            //     {
            //         path: '/login',
            //         component: () => import('@/views/login/index'),
            //         hidden: true
            //     },
            //     {
            //         path: '/auth-redirect',
            //         component: () => import('@/views/login/auth-redirect'),
            //         hidden: true
            //     },
            //     {
            //         path: '/404',
            //         component: () => import('@/views/error-page/404'),
            //         hidden: true
            //     },
            //     {
            //         path: '/401',
            //         component: () => import('@/views/error-page/401'),
            //         hidden: true
            //     },
            //     {
            //         path: '/',
            //         component: Layout,
            //         redirect: '/dashboard',
            //         children: [
            //             {
            //                 path: 'dashboard',
            //                 component: () => import('@/views/dashboard/index'),
            //                 name: 'Dashboard',
            //                 meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
            //             }
            //         ]
            //     },
            //     {
            //         path: '/documentation',
            //         component: Layout,
            //         children: [
            //             {
            //                 path: 'index',
            //                 component: () => import('@/views/documentation/index'),
            //                 name: 'Documentation',
            //                 meta: { title: 'Documentation', icon: 'documentation', affix: true }
            //             }
            //         ]
            //     },
            //     {
            //         path: '/guide',
            //         component: Layout,
            //         redirect: '/guide/index',
            //         children: [
            //             {
            //                 path: 'index',
            //                 component: () => import('@/views/guide/index'),
            //                 name: 'Guide',
            //                 meta: { title: 'Guide', icon: 'guide', noCache: true }
            //             }
            //         ]
            //     },
            //     {
            //         path: '/profile',
            //         component: Layout,
            //         redirect: '/profile/index',
            //         hidden: true,
            //         children: [
            //             {
            //                 path: 'index',
            //                 component: () => import('@/views/profile/index'),
            //                 name: 'Profile',
            //                 meta: { title: 'Profile', icon: 'user', noCache: true }
            //             }
            //         ]
            //     }

            // ]
        }
    },
    components: {
        Logo
    },
    computed: {
        ...mapState(useUserStore, ['routers']),
        ...mapState(useAppInfoStore, ['sidebar']),
        isCollapse() {
            return this.sidebar.opened
        },
        activeMenu() {
            // console.log("activeMenu=>", this.$route)

            return 2
        },
        variables() {
            return variables
        },
        routersArray() {
            return this.routers
        }


    },
    mounted() {
        console.log("routers=>", this.routers)
    },

    methods: {
        hasOneShowingChild(children = [], parent) {
            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false
                } else {
                    // Temp set(will be used if only has one showing child)
                    this.onlyOneChild = item
                    return true
                }
            })

            // When there is only one child router, the child router is displayed by default
            if (showingChildren.length === 1) {
                return true
            }

            // Show parent if there are no child router to display
            if (showingChildren.length === 0) {
                this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
                return true
            }

            return false
        },
        gotoPageSub(item, sub) {
            // console.log("item,sub=>", item, sub)
            let path ='';
            if(sub){
                path = `${item.path}/${sub.path}`
            }else{
                path = `${item.path}` 
            }
            console.log(path)
            this.$router.push({ path})

        },
        gotoPage(item){
             console.log("item=>", item) 
        }
    }
}
</script>
<style lang="scss" scoped></style>