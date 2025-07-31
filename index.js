import express from "express";

const app = express();
app.use(express.json());

let blogs = [];

app.post("/blogs", (req, res) => {
  blogs.push({ ...req.body, id: blogs.length + 1 });
  console.log(req.body);
  return res.json({ message: "blog created successfully" });
});

app.get("/blogs", (req, res) => {
  let publidBlogs = blogs.filter((blog) => blog.draft == false);
  // let publidBlogs = blogs.filter(blog =>!blog.draft)
  return res.json({ publidBlogs });
});

app.get("/blogs/:id", (req, res) => {
  const { id } = req.params;
  let searchBlog = blogs.filter((blog) => blog.id == id);
  return res.json({ searchBlog });
});

app.put("/blogs/:id", (req, res) => {
  const { id } = req.params;
  //   let updatedBlog = blogs.findIndex(blog =>blog.id==id)
  //   blogs[index] = {...blogs[index],...req.body}
  let updatedBlog = blogs.map((blog) =>
    blog.id == id ? { ...blog, ...req.body } : blog
  );

  blogs = updatedBlog;
  return res.json({ message: "Blog updated successfully" }, updatedBlog);
});

app.delete("/blogs/:id", (req, res) => {});

app.listen(3000, (req, res) => {
  console.log("server was running in the port 3000");
});
