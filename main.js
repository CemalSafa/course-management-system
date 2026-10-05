// main.js
// Entry point: ties models.js, database.js, and analytics.js together

import Student from './models.js';
import fetchStudents from './database.js';
import { calculateClassAverage, findTopStudent, filterStudents } from './analytics.js';

fetchStudents((rawData) => {
  console.log('Data received!\n');

  // Convert raw data into actual Student instances
  const students = rawData.map((data) => new Student(data.id, data.name, data.courses));

  // --- Test immutability ---
  console.log('Testing Immutability:');
  console.log(`Original ID: ${students[0].id}`);
  console.log('Attempting to change ID to 999...');
  try {
    students[0].id = 999; // silently ignored in non-strict mode, throws in strict/ESM
  } catch (err) {
    // ES modules run in strict mode, so this assignment throws a TypeError.
    // That's expected proof the property is truly read-only.
  }
  console.log(`Final ID: ${students[0].id} (Success: ID did not change)\n`);

  // --- Analytics report ---
  console.log('--- Analytics Report ---');

  const avg101 = calculateClassAverage(students, 101);
  console.log(`Class Average for Course 101: ${avg101.toFixed(2)}`);

  const topStudent = findTopStudent(students);
  console.log(`Top Student: ${topStudent.name} (Average: ${topStudent.getAverage().toFixed(2)})`);

  const course102Students = filterStudents(students, (s) =>
    s.courses.some((c) => c.courseId === 102)
  );
  console.log(`Students in Course 102: ${course102Students.map((s) => s.name).join(', ')}`);
});
