import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {
  // if authenticated, connect to mongodb
  await mongooseConnect();
  const {method} = req;

  if (method === "GET") {
      if (req.query?.id) {
        // fetch a single Blog by id
        const BlogS = await Blog.findById(req.query.id);
        res.json(BlogS);
      } else if (req.query?.tags) {
        // fetch Blog by tags
        const BlogS = await Blog.find({
          tags: req.query.tags,
        });
        res.json(BlogS);
      }else if (req.query?.blogcategory) {
        // fetch Blog by category
        const BlogS = await Blog.find({
          blogcategory: req.query.blogcategory,
        });
        res.json(BlogS);
      } else if (req.query?.slug) {
        // feetch Blog by slug
        const BlogS = await Blog.find({ slug: req.query.slug });
        res.json(BlogS.reverse());
      } else {
        // fetch all Blog
        const BlogS = await Blog.find();
        res.json(BlogS.reverse());
      }
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
}