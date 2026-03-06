//การเชื่อมโยง
<script setup>
import Sidebar_UI from './Sidebar_UI.vue'
import { useSidebarLogic } from './useSidebarLogic'
// นำเข้าไอคอนจาก Assets
import homeIcon from '../../assets/home.png'
import pimIcon from '../../assets/pim.png'
import leaveIcon from '../../assets/leave.png'
import financeIcon from '../../assets/finance.png'
const props = defineProps(['activeMenu', 'collapsed'])
const emit = defineEmits(['change-menu', 'logout', 'toggle-collapse'])
// เรียกใช้ Logic (สมอง)
const { isCollapsed, openMenus, toggleSidebar, toggleMenu } = useSidebarLogic(props, emit)
// รวมไอคอนเป็นก้อนเดียวส่งให้ UI
const icons = { homeIcon, pimIcon, leaveIcon, financeIcon }
</script>

<template>
  <Sidebar_UI 
    :isCollapsed="isCollapsed"
    :openMenus="openMenus"
    :activeMenu="activeMenu"
    :icons="icons"
    @toggle-sidebar="toggleSidebar"
    @toggle-menu="toggleMenu"
    @change-menu="$emit('change-menu', $event)"
    @logout="$emit('logout')"
  />
</template>