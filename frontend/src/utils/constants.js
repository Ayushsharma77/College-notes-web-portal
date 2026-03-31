export const BRANCHES = [
  { code: "CSE",     name: "Computer Science & Engineering" },
  { code: "CSE-AI",  name: "CSE — Artificial Intelligence" },
  { code: "CSE-DS",  name: "CSE — Data Science" },
  { code: "CSE-IoT", name: "CSE — Internet of Things" },
  { code: "ECE",     name: "Electronics & Communication" },
  { code: "EE",      name: "Electrical Engineering" },
  { code: "MECH",    name: "Mechanical Engineering" },
  { code: "CIVIL",   name: "Civil Engineering" },
  { code: "IT",      name: "Information Technology" },
];

export const YEARS = [1, 2, 3, 4];

export const SEMESTERS_BY_YEAR = {
  1: [1, 2],
  2: [3, 4],
  3: [5, 6],
  4: [7, 8],
};

export const NOTE_TYPES = [
  { value: "notes",      label: "📄 Notes",       color: "bg-blue-500/20 text-blue-300" },
  { value: "paper",      label: "📝 Past Paper",  color: "bg-purple-500/20 text-purple-300" },
  { value: "assignment", label: "✏️ Assignment",   color: "bg-green-500/20 text-green-300" },
  { value: "book",       label: "📚 Book / Ref",  color: "bg-amber-500/20 text-amber-300" },
];

export const TYPE_COLOR = {
  notes:      "bg-blue-500/20 text-blue-300 border-blue-500/30",
  paper:      "bg-purple-500/20 text-purple-300 border-purple-500/30",
  assignment: "bg-green-500/20 text-green-300 border-green-500/30",
  book:       "bg-amber-500/20 text-amber-300 border-amber-500/30",
};
