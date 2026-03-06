// Logic Login
export const loginUser = async (username, password) => {

  // ตัวอย่าง mock login
  if(username === "admin" && password === "1234"){
    return { success: true }
  }

  return { success: false }

}