// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   UsersRound,
//   LucideCode,
//   Presentation,
//   UsersIcon,
//   School,
// } from "lucide-react";

// const EventDashboard = () => {
//   // States for storing data
//   const [overviewData, setOverviewData] = useState({
//     totalUsers: 0,
//     usersRegistered: 0,
//     technicalEvents: 0,
//     nonTechnicalEvents: 0,
//     workshops: 0,
//   });

//   const [selectedDepartment, setSelectedDepartment] = useState("CSE");
//   const [departmentData, setDepartmentData] = useState({
//     students: 0,
//     technicalRegistrations: 0,
//     nonTechnicalRegistrations: 0,
//     workshopRegistrations: 0,
//     eventDistribution: [],
//   });

//   // Mock API calls (replace with actual API endpoints)
//   const fetchOverviewData = async () => {
//     // Simulate API call
//     try {
//       // In a real implementation, replace with actual fetch call
//       // const response = await fetch('/api/overview-data');
//       // const data = await response.json();

//       // Simulated data for demonstration
//       const data = {
//         totalUsers: 1250,
//         usersRegistered: 875,
//         technicalEvents: 520,
//         nonTechnicalEvents: 310,
//         workshops: 280,
//       };

//       setOverviewData(data);
//     } catch (error) {
//       console.error("Error fetching overview data:", error);
//     }
//   };

//   const fetchDepartmentData = async (dept) => {
//     // Simulate API call
//     try {
//       // In a real implementation, replace with actual fetch call
//       // const response = await fetch(`/api/department-data?dept=${dept}`);
//       // const data = await response.json();

//       // Simulated data for demonstration
//       const mockData = {
//         CSE: {
//           students: 350,
//           technicalRegistrations: 210,
//           nonTechnicalRegistrations: 90,
//           workshopRegistrations: 140,
//           eventDistribution: [
//             { name: "Hackathon", count: 85 },
//             { name: "Code Challenge", count: 70 },
//             { name: "Tech Quiz", count: 55 },
//             { name: "Workshop", count: 140 },
//             { name: "Cultural", count: 40 },
//             { name: "Debate", count: 50 },
//           ],
//         },
//         ECE: {
//           students: 280,
//           technicalRegistrations: 150,
//           nonTechnicalRegistrations: 80,
//           workshopRegistrations: 70,
//           eventDistribution: [
//             { name: "Circuit Design", count: 75 },
//             { name: "Tech Quiz", count: 45 },
//             { name: "IoT Workshop", count: 70 },
//             { name: "Cultural", count: 35 },
//             { name: "Debate", count: 45 },
//           ],
//         },
//         EEE: {
//           students: 220,
//           technicalRegistrations: 130,
//           nonTechnicalRegistrations: 60,
//           workshopRegistrations: 50,
//           eventDistribution: [
//             { name: "Power Systems", count: 55 },
//             { name: "Tech Quiz", count: 35 },
//             { name: "EV Workshop", count: 50 },
//             { name: "Cultural", count: 30 },
//             { name: "Debate", count: 30 },
//           ],
//         },
//         CIVIL: {
//           students: 180,
//           technicalRegistrations: 90,
//           nonTechnicalRegistrations: 50,
//           workshopRegistrations: 40,
//           eventDistribution: [
//             { name: "Structure Design", count: 40 },
//             { name: "Tech Quiz", count: 25 },
//             { name: "CAD Workshop", count: 40 },
//             { name: "Cultural", count: 25 },
//             { name: "Debate", count: 25 },
//           ],
//         },
//         MECH: {
//           students: 200,
//           technicalRegistrations: 110,
//           nonTechnicalRegistrations: 60,
//           workshopRegistrations: 45,
//           eventDistribution: [
//             { name: "CAD Challenge", count: 45 },
//             { name: "Tech Quiz", count: 30 },
//             { name: "3D Printing", count: 45 },
//             { name: "Cultural", count: 30 },
//             { name: "Debate", count: 30 },
//           ],
//         },
//         AIDS: {
//           students: 170,
//           technicalRegistrations: 100,
//           nonTechnicalRegistrations: 40,
//           workshopRegistrations: 60,
//           eventDistribution: [
//             { name: "ML Challenge", count: 55 },
//             { name: "Tech Quiz", count: 25 },
//             { name: "Data Workshop", count: 60 },
//             { name: "Cultural", count: 20 },
//             { name: "Debate", count: 20 },
//           ],
//         },
//       };

//       setDepartmentData(mockData[dept]);
//     } catch (error) {
//       console.error(`Error fetching data for department ${dept}:`, error);
//     }
//   };

//   // Effect to fetch data initially and set up interval for refreshing
//   useEffect(() => {
//     // Initial data fetch
//     fetchOverviewData();
//     fetchDepartmentData(selectedDepartment);

//     // Set up auto-refresh interval (every 5 minutes)
//     const refreshInterval = setInterval(() => {
//       fetchOverviewData();
//       fetchDepartmentData(selectedDepartment);
//       console.log("Data refreshed");
//     }, 5 * 60 * 1000); // 5 minutes in milliseconds

//     // Clean up interval on component unmount
//     return () => clearInterval(refreshInterval);
//   }, []);

//   // Effect to fetch department data when selection changes
//   useEffect(() => {
//     fetchDepartmentData(selectedDepartment);
//   }, [selectedDepartment]);

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">
//           Technical Event Registration Dashboard
//         </h1>
//         <div className="text-sm text-gray-500">
//           Auto-refreshes every 5 minutes • Last updated:{" "}
//           {new Date().toLocaleTimeString()}
//         </div>
//       </div>

//       {/* Overview Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//             <UsersRound className="h-4 w-4 text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{overviewData.totalUsers}</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               Registered Users
//             </CardTitle>
//             <UsersIcon className="h-4 w-4 text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {overviewData.usersRegistered}
//             </div>
//             <p className="text-xs text-gray-500">
//               {Math.round(
//                 (overviewData.usersRegistered / overviewData.totalUsers) * 100
//               )}
//               % of total
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">
//               Technical Events
//             </CardTitle>
//             <LucideCode className="h-4 w-4 text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {overviewData.technicalEvents}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Non-Technical</CardTitle>
//             <Presentation className="h-4 w-4 text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {overviewData.nonTechnicalEvents}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium">Workshops</CardTitle>
//             <School className="h-4 w-4 text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{overviewData.workshops}</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Department Data Section */}
//       <Card className="mt-6">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle>Department Statistics</CardTitle>
//             <Select
//               value={selectedDepartment}
//               onValueChange={setSelectedDepartment}
//             >
//               <SelectTrigger className="w-40">
//                 <SelectValue placeholder="Select Department" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="CSE">CSE</SelectItem>
//                 <SelectItem value="ECE">ECE</SelectItem>
//                 <SelectItem value="EEE">EEE</SelectItem>
//                 <SelectItem value="CIVIL">CIVIL</SelectItem>
//                 <SelectItem value="MECH">MECH</SelectItem>
//                 <SelectItem value="AIDS">AIDS</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <CardDescription>
//             Registration statistics for {selectedDepartment} department
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue="overview">
//             <TabsHeader>
//               <TabsTrigger value="overview">Department Overview</TabsTrigger>
//               <TabsTrigger value="events">Event Distribution</TabsTrigger>
//             </TabsHeader>

//             <TabsContent value="overview" className="mt-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <Card>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-sm font-medium">
//                       Total Students
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">
//                       {departmentData.students}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-sm font-medium">
//                       Technical Events
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">
//                       {departmentData.technicalRegistrations}
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       {Math.round(
//                         (departmentData.technicalRegistrations /
//                           departmentData.students) *
//                           100
//                       )}
//                       % participation
//                     </p>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-sm font-medium">
//                       Non-Technical
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">
//                       {departmentData.nonTechnicalRegistrations}
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       {Math.round(
//                         (departmentData.nonTechnicalRegistrations /
//                           departmentData.students) *
//                           100
//                       )}
//                       % participation
//                     </p>
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader className="pb-2">
//                     <CardTitle className="text-sm font-medium">
//                       Workshops
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">
//                       {departmentData.workshopRegistrations}
//                     </div>
//                     <p className="text-xs text-gray-500">
//                       {Math.round(
//                         (departmentData.workshopRegistrations /
//                           departmentData.students) *
//                           100
//                       )}
//                       % participation
//                     </p>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>

//             <TabsContent value="events" className="mt-4">
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={departmentData.eventDistribution}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="count" fill="#8884d8" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// const TabsHeader = ({ children }) => (
//   <TabsList className="grid w-full grid-cols-2">{children}</TabsList>
// );

// export default EventDashboard;

"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  UsersRound,
  LucideCode,
  Presentation,
  UsersIcon,
  School,
} from "lucide-react";

const EventDashboard = () => {
  // States for storing data
  const [overviewData, setOverviewData] = useState({
    totalUsers: 0,
    usersRegistered: 0,
    technicalEvents: 0,
    nonTechnicalEvents: 0,
    workshops: 0,
  });

  const [selectedDepartment, setSelectedDepartment] = useState("CSE");
  const [departmentData, setDepartmentData] = useState({
    students: 0,
    technicalRegistrations: 0,
    nonTechnicalRegistrations: 0,
    workshopRegistrations: 0,
    eventDistribution: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Real API calls
  const fetchOverviewData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/dashboard/overview");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setOverviewData(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (error) {
      console.error("Error fetching overview data:", error);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDepartmentData = async (dept) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/dashboard/department?dept=${dept}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDepartmentData(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (error) {
      console.error(`Error fetching data for department ${dept}:`, error);
      setError(
        `Failed to load data for ${dept} department. Please try again later.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to fetch data initially and set up interval for refreshing
  useEffect(() => {
    // Initial data fetch
    fetchOverviewData();
    fetchDepartmentData(selectedDepartment);

    // Set up auto-refresh interval (every 5 minutes)
    const refreshInterval = setInterval(() => {
      fetchOverviewData();
      fetchDepartmentData(selectedDepartment);
      console.log("Data refreshed");
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  // Effect to fetch department data when selection changes
  useEffect(() => {
    fetchDepartmentData(selectedDepartment);
  }, [selectedDepartment]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Technical Event Registration Dashboard
        </h1>
        <div className="text-sm text-gray-500">
          Auto-refreshes every 5 minutes • Last updated:{" "}
          {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <UsersRound className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overviewData.totalUsers}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Registered Users
                </CardTitle>
                <UsersIcon className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overviewData.usersRegistered}
                </div>
                <p className="text-xs text-gray-500">
                  {overviewData.totalUsers > 0
                    ? Math.round(
                        (overviewData.usersRegistered /
                          overviewData.totalUsers) *
                          100
                      )
                    : 0}
                  % of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Technical Events
                </CardTitle>
                <LucideCode className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overviewData.technicalEvents}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Non-Technical
                </CardTitle>
                <Presentation className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overviewData.nonTechnicalEvents}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Workshops</CardTitle>
                <School className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overviewData.workshops}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Data Section */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Department Statistics</CardTitle>
                <Select
                  value={selectedDepartment}
                  onValueChange={setSelectedDepartment}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="ECE">ECE</SelectItem>
                    <SelectItem value="EEE">EEE</SelectItem>
                    <SelectItem value="CIVIL">CIVIL</SelectItem>
                    <SelectItem value="MECH">MECH</SelectItem>
                    <SelectItem value="AIDS">AIDS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                Registration statistics for {selectedDepartment} department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsHeader>
                  <TabsTrigger value="overview">
                    Department Overview
                  </TabsTrigger>
                  <TabsTrigger value="events">Event Distribution</TabsTrigger>
                </TabsHeader>

                <TabsContent value="overview" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Students
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {departmentData.students}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Technical Events
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {departmentData.technicalRegistrations}
                        </div>
                        <p className="text-xs text-gray-500">
                          {departmentData.students > 0
                            ? Math.round(
                                (departmentData.technicalRegistrations /
                                  departmentData.students) *
                                  100
                              )
                            : 0}
                          % participation
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Non-Technical
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {departmentData.nonTechnicalRegistrations}
                        </div>
                        <p className="text-xs text-gray-500">
                          {departmentData.students > 0
                            ? Math.round(
                                (departmentData.nonTechnicalRegistrations /
                                  departmentData.students) *
                                  100
                              )
                            : 0}
                          % participation
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Workshops
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {departmentData.workshopRegistrations}
                        </div>
                        <p className="text-xs text-gray-500">
                          {departmentData.students > 0
                            ? Math.round(
                                (departmentData.workshopRegistrations /
                                  departmentData.students) *
                                  100
                              )
                            : 0}
                          % participation
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="events" className="mt-4">
                  {departmentData.eventDistribution.length > 0 ? (
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={departmentData.eventDistribution}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-64">
                      <p className="text-gray-500">
                        No event data available for this department.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

const TabsHeader = ({ children }) => (
  <TabsList className="grid w-full grid-cols-2">{children}</TabsList>
);

export default EventDashboard;
