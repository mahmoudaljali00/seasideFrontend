import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { use, useState } from "react";

export default function Category() {
  const router = useRouter();
  const { category } = router.query;

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  const { alldata, loading } = useFetchData(
    `/api/blogs?blogcategory=${category}`
  );

  // filter blog category

  const filteredBlogs = alldata
    .filter((item) => item.category === item.category)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 20);

  const blogcategoryData = [...filteredBlogs].reverse();

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // filter all data based on search query
  const filteredBlogserch =
    searchQuery.trim() === ""
      ? filteredBlogs
      : filteredBlogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // Calculate the index of the First blog displayed on the current page
  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastblog = currentPage * perPage;

  const publishedblogs = filteredBlogserch.filter(
    (ab) => ab.status === "publish"
  );

  // Get the current pages blogs
  const currentBlogs = publishedblogs.slice(indexOfFirstBlog, indexOfLastblog);

  // total number of blogs
  const allblog = publishedblogs.length;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Head>
        <title>Blog category page</title>
      </Head>
      <div className="blogcategory">
        <section className="tophero">
          <div className="container">
            <div className="toptitle">
              <div className="toptitlecont flex">
                <h1>
                  category <span>{category}</span>
                </h1>
                <div className="subemail">
                  <form action="" className="flex">
                    <input
                      value={searchQuery}
                      onChange={(ev) => setSearchQuery(ev.target.value)}
                      type="text"
                      placeholder="Search blog here..."
                    />
                    {/* <button>Search</button> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="latestpostssec">
            <div className="container">
              <div className="border"></div>
              <div className="latestpostsdata">
                <div className="fetitle">
                  <h3>Next Js Articles :</h3>
                </div>
                <div className="latestposts">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      {currentBlogs.map((blog) => {
                        return (
                          <div className="lpost" key={blog._id}>
                            <div className="lpostimg">
                              <Link href={`/blogs/${blog.slug}`}>
                                <img src={blog.images[0]} alt={blog.title} />
                              </Link>
                            </div>
                            <div className="tegs">
                              {blog.blogcategory.map((cat, index) => {
                                return (
                                  <Link
                                    key={index}
                                    href={`/blogs/category/${cat}`}
                                    className="ai"
                                  >
                                    <span></span>
                                    {cat}
                                  </Link>
                                );
                              })}
                            </div>
                            <div className="lpostinfo">
                              <h3>
                                <Link href={`/blogs/${blog.slug}`}>
                                  {blog.title}
                                </Link>
                              </h3>
                              <p>{blog.description}</p>
                              <h4 className="flex">
                                <img src="/img/2.jpg" alt="" />
                                <span>By Seaside</span>
                              </h4>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
              {/* for pagination */}
              {publishedblogs.length === 0 ? (
                ""
              ) : (
                <div className="blogspaginationbtn flex flex-center mt-3">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {pageNumbers
                    .slice(
                      Math.max(currentPage - 3, 0),
                      Math.min(currentPage + 2, pageNumbers.length)
                    )
                    .map((number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`${currentPage === number ? "active" : ""}`}
                      >
                        {number}
                      </button>
                    ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={publishedblogs.length <= indexOfLastblog}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
