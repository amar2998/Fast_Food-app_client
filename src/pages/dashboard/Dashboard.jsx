import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const Dashboard = () => {
  // Sample Pie Chart Data
  const pieData = [
    { name: "Active Users", value: 400 },
    { name: "Inactive Users", value: 300 },
    { name: "Revenue Growth", value: 300 },
    { name: "Error Reports", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 flex-wrap">
        <h5 className="text-xl font-bold">Dashboard Overview</h5>
        <h5 className="text-xl font-bold">
          Total Metrics: <span className="text-blue-500">123</span>
        </h5>
      </div>

      {/* Table Section (First Row) */}
      <div className="mb-6">
        <div className="overflow-x-auto">
          <table className="table-auto w-full sm:w-[600px] md:w-[870px] border-collapse border border-gray-300 rounded-lg shadow-lg">
            {/* Table Head */}
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Metric Name</th>
                <th className="p-4 text-left">Value</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {[ 
                { id: 1, name: "Users", value: 230, status: "Active" },
                { id: 2, name: "Revenue", value: "$10K", status: "Stable" },
                { id: 3, name: "Errors", value: 5, status: "Critical" }
              ].map((metric, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 border-t border-gray-200"
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{metric.name}</td>
                  <td className="p-4">{metric.value}</td>
                  <td className="p-4">{metric.status}</td>
                  <td className="p-4">
                    <button className="btn btn-xs bg-orange-700 text-white p-1">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pie Chart Section (Second Row) */}
      <div className="flex justify-center items-center p-4 bg-white rounded-lg shadow-md">
        <PieChart width={window.innerWidth <= 768 ? 300 : 600} height={window.innerWidth <= 768 ? 200 : 400}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default Dashboard;
