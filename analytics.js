// analytics.js
// Contains advanced calculation logic (operates on Student instances)

// Returns the average score of ALL students for a specific course
function calculateClassAverage(students, courseId) {
  // Find each student's grade in that course (if they took it)
  const grades = students
    .map((student) => student.courses.find((c) => c.courseId === courseId))
    .filter((course) => course !== undefined) // only students who took the course
    .map((course) => course.grade);

  if (grades.length === 0) return 0;

  const total = grades.reduce((sum, grade) => sum + grade, 0);
  return total / grades.length;
}

// Uses .reduce() to find the Student with the highest overall average
function findTopStudent(students) {
  return students.reduce((best, current) => {
    return current.getAverage() > best.getAverage() ? current : best;
  });
}

// Higher-order function: returns a new array of students for whom
// criteriaFn(student) returns true
function filterStudents(students, criteriaFn) {
  return students.filter((student) => criteriaFn(student));
}

export { calculateClassAverage, findTopStudent, filterStudents };
