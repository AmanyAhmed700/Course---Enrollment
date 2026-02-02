'use client';

export default function StudentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">My Courses</h2>
          <p className="text-gray-600">Your enrolled courses will appear here.</p>
        </div>
        
      
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Upcoming Assignments</h2>
          <p className="text-gray-600">Your upcoming assignments will appear here.</p>
        </div>
        
       
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-600">Your recent activity will appear here.</p>
        </div>
      </div>
    </div>
  );
}
