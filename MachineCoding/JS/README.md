# MachineCoding JS questions

Create a new question page and automatically add it to the gallery:

```sh
node MachineCoding/JS/new-question.mjs "Question Name"
```

Run the command from the repository root. The script creates a PascalCase HTML filename (for example, `Question Name` becomes `QuestionName.html`) with a small page layout, problem/example placeholders, a Run button, and an inline solution area. It also registers the question in `index.html` so it appears in the sidebar.

The generator does not implement the question. Fill in the problem details and write your solution in the generated page. Existing files and duplicate questions are left untouched.