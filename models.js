// models.js
// Defines the data structure (Classes)

class Student {
  constructor(id, name, courses) {
    // Immutability requirement: id must be read-only and non-configurable
    Object.defineProperty(this, 'id', {
      value: id,
      writable: false,
      configurable: false,
      enumerable: true, // still show up in console.log / JSON.stringify
    });

    this.name = name;
    this.courses = courses || []; // array of { courseId, grade }
  }

  // Adds a new course record to the student's list
  addCourse(courseId, grade) {
    this.courses.push({ courseId, grade });
  }

  // Returns the student's average grade across all their courses
  getAverage() {
    if (this.courses.length === 0) return 0;
    const total = this.courses.reduce((sum, course) => sum + course.grade, 0);
    return total / this.courses.length;
  }
}

export default Student;
