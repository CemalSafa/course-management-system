# University Course Management System

## File Organization

- **models.js** — Defines the `Student` class. The `id` property is set with `Object.defineProperty()` (`writable: false`, `configurable: false`) so it cannot be changed or deleted after creation. Includes `addCourse()` and `getAverage()` methods.
- **database.js** — Simulates a slow database connection. `fetchStudents(callback)` uses `setTimeout` to mimic a 2-second network delay, then passes raw student data to the callback.
- **analytics.js** — Pure calculation functions that operate on arrays of `Student` instances:
  - `calculateClassAverage(students, courseId)` — average grade for one course across all students who took it.
  - `findTopStudent(students)` — uses `.reduce()` to find the student with the highest overall average.
  - `filterStudents(students, criteriaFn)` — generic higher-order function; returns students for whom `criteriaFn` returns `true`.
- **main.js** — Entry point. Calls `fetchStudents`, converts the raw data into `Student` instances inside the callback, tests that `id` is truly immutable, and prints the analytics report.

## How to Run

```bash
node main.js
```

(Requires `"type": "module"` in `package.json`, since the project uses ES module `import`/`export` syntax.)

## Challenges Faced

- **Immutability under strict mode**: ES modules run in strict mode by default, so `students[0].id = 999` doesn't fail silently — it throws a `TypeError`. The assignment is wrapped in a `try/catch` in `main.js` so the program can continue and print the final (unchanged) ID.
- **Only counting students who took the course**: `calculateClassAverage` filters out students who don't have a record for the given `courseId` before averaging, so the result isn't skewed if not everyone is enrolled in every course.
- **Choosing between default and named exports**: `models.js` uses a default export (single class), while `analytics.js` uses named exports (multiple helper functions) — matching the data each file is responsible for.
