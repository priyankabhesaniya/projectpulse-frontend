// import React from 'react';
// import { Bar, Pie } from 'react-chartjs-2'; // Example using react-chartjs-2

// const Charts = ({ projects, tasks }) => {
//   const projectData = {
//     labels: projects?.map((project) => project.name),
//     datasets: [
//       {
//         label: 'Project Completion',
//         data: projects.map((project) => project.completion),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//     ],
//   };

//   const taskData = {
//     labels: ['Completed', 'In Progress', 'Pending'],
//     datasets: [
//       {
//         label: 'Task Status',
//         data: [
//           tasks?.filter((task) => task.status === 'Completed').length,
//           tasks?.filter((task) => task.status === 'In Progress').length,
//           tasks?.filter((task) => task.status === 'Pending').length,
//         ],
//         backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
//       },
//     ],
//   };

//   return (
//     <div className="charts">
//       <div className="chart">
//         <h3>Projects Progress</h3>
//         <Bar data={projectData} />
//       </div>
//       <div className="chart">
//         <h3>Task Status</h3>
//         <Pie data={taskData} />
//       </div>
//     </div>
//   );
// };

// export default Charts;
