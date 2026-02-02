'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  description: string;
  schedule: string;
  image: string;
}

export default function InstructorDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState({ title: '', description: '', schedule: '', image: '' });

  const fetchCourses = async () => {
    const res = await fetch('/api/instructor/courses');
    setCourses(await res.json());
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const addCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/instructor/courses', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });
    setForm({ title: '', description: '', schedule: '', image: '' });
    fetchCourses();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto mt-30">
      <h1 className="text-2xl font-bold mb-6 text-center">Instructor Dashboard</h1>
      <form onSubmit={addCourse} className="bg-white p-6 shadow rounded-lg mb-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="course name" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="border p-2 rounded" required />
          <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 rounded" />
        </div>
        <textarea placeholder="description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="border p-2 w-full rounded" required />
        <input type="text" placeholder="Time&&days" value={form.schedule} onChange={e => setForm({...form, schedule: e.target.value})} className="border p-2 w-full rounded" required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">Add Course</button>
      </form>

      <div className="grid gap-4">
        {courses.map((course: Course) => (
          <div key={course.id} className="flex bg-white p-4 shadow rounded items-center gap-4">
            {course.image && (
              <Image
                src={course.image}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded"
                alt="course"
                unoptimized
              />
            )}
            <div className="flex-1">
              <h3 className="font-bold">{course.title}</h3>
              <p className="text-sm text-gray-500">{course.schedule}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}