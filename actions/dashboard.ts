import axios from "axios";
const BASE_URL = process.env.MAIN_URL ?? "http://localhost:3000";
export async function getDashBoardData() {
  try {
    const dashboardResponse = await axios.get(
      `${BASE_URL}/api/dashboard`
    );
    const data = dashboardResponse.data;
    return data;
  } catch (error) {
    console.log("ดึงข้อมูลไม่ได้");

    return "ดึงข้อมูลไม่ได้";
  }
}
