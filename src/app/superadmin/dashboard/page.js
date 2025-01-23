// const Dashboard = () => {
//     return (
//         <div className="text-black">
//             Dashboard page
//         </div>
//     );
// }
// export default Dashboard;

import SuperAdminDashboard from "@/Components/SuperAdmin/SuperAdminDashboard";
export const metadata = {
    title: "SuperAdmin Dashboard",
    description: "This is Super Admin Dashboard", 
  }
const Dashboard = () => {
    return <SuperAdminDashboard/>
}
export default Dashboard;
