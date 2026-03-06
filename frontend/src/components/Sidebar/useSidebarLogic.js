//การยุบ/ขยาย และการเปิด Sub-menu
import { ref, watch } from 'vue'
export function useSidebarLogic(props, emit) {
  // สร้างสถานะภายในที่ซิงค์กับ props
  const isCollapsed = ref(props.collapsed)
  const openMenus = ref({ personnel: true, leave: false, finance: false })
  // คอยดูว่าถ้า App.vue สั่งพับ Sidebar จากข้างนอก ให้ตัวแปรข้างในเปลี่ยนตาม
  watch(() => props.collapsed, (newVal) => {
    isCollapsed.value = newVal
  })
  const toggleSidebar = () => {
    isCollapsed.value = !isCollapsed.value
    emit('toggle-collapse', isCollapsed.value)
    // ถ้าพับ Sidebar ให้ปิดเมนูย่อยที่กางอยู่ทิ้งไปด้วยเพื่อความสวยงาม
    if (isCollapsed.value) {
      Object.keys(openMenus.value).forEach(key => openMenus.value[key] = false)
    }
  }
  const toggleMenu = (menuName) => {
    if (isCollapsed.value) {
      isCollapsed.value = false
      emit('toggle-collapse', false)
    }
    openMenus.value[menuName] = !openMenus.value[menuName]
  }
  return { isCollapsed, openMenus, toggleSidebar, toggleMenu }
}