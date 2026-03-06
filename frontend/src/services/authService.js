export const loginUser = async (username, password) => {

  if(username === "admin" && password === "1234"){
    return { success: true }
  }

  return { success: false }

}