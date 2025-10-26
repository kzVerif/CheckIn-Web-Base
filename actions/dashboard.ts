import axios from "axios";
export async function getDashBoardData() {
  try {
    const dashboardResponse = await axios.get(
      "http://localhost:3000/api/dashboard"
    );
    const data = dashboardResponse.data;
    return data;
  } catch (error) {
    console.log("ดึงข้อมูลไม่ได้");

    return "ดึงข้อมูลไม่ได้";
  }
}
