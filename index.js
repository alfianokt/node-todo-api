const polka = require("polka");
const app = polka();
const { json } = require("body-parser");
const { v4: uuid } = require("@lukeed/uuid");
const PORT = process.env.PORT || 3000;
const todos = [];

// body parser
app.use(json());

// allow cors
app.use((req, res, next) => {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("content-type", "application/json");
  next();
});

// get all todos
app.get("/", (req, res) => {
  res.end(
    JSON.stringify({
      status: true,
      msg: "Data berhasil didapatkan",
      todos,
    })
  );
});

// add todos
app.post("/", (req, res) => {
  const { title = "-", done = false } = req.body;

  todos.push({
    id: uuid(),
    title,
    done,
  });

  res.end(
    JSON.stringify({
      status: true,
      msg: "Data berhasil didapatkan",
      todos,
    })
  );
});

// update todos
app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title = "-", done = false } = req.body;

  const index = todos.findIndex((todo) => todo.id == id);

  if (index !== -1) {
    todos[index] = {
      ...todos[index],
      title,
      done,
    };

    res.end(
      JSON.stringify({
        status: true,
        msg: "Data berhasil diubah",
      })
    );
  } else {
    res.end(
      JSON.stringify({
        status: false,
        msg: "Data gagal diubah",
      })
    );
  }
});

// delete todos
app.delete("/:id", (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id == id);

  if (index !== -1) {
    todos.splice(index, 1);

    res.end(
      JSON.stringify({
        status: true,
        msg: "Data berhasil dihapus",
      })
    );
  } else {
    res.end(
      JSON.stringify({
        status: false,
        msg: "Data gagal dihapus",
      })
    );
  }
});

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log("App run on port", PORT);
});
