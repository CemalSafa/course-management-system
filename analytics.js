function calculateClassAverage(students, courseId) {
  const grades = students
    .map((student) => student.courses.find((c) => c.courseId === courseId))
    .filter((course) => course !== undefined)
    .map((course) => course.grade);

  if (grades.length === 0) return 0;

  const total = grades.reduce((sum, grade) => sum + grade, 0);
  return total / grades.length;
}

function findTopStudent(students) {
  return students.reduce((best, current) => {
    return current.getAverage() > best.getAverage() ? current : best;
  });
}

function filterStudents(students, criteriaFn) {
  return students.filter((student) => criteriaFn(student));
}

export { calculateClassAverage, findTopStudent, filterStudents };
