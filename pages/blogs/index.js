import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { FreeMode } from "swiper/modules";
import Head from "next/head";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import Blogsearch from "@/components/Blogsearch";

export default function blogs() {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);

  // search
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchOpen = () => {
    setSearchInput(!searchInput); // open the search input
  };

  const handleSearchClose = () => {
    setSearchInput(false);
  };

  const [searchInput, setSearchInput] = useState(false); // initialize blogs with fetched data

  // fetch blog data
  const { alldata, loading } = useFetchData("/api/blogs");

  // function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // filter all data based on search query
  const filteredBlogs =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

  // Calculate the index of the First blog displayed on the current page
  const indexOfFirstBlog = (currentPage - 1) * perPage;
  const indexOfLastblog = currentPage * perPage;

  const publishedblogs = filteredBlogs.filter((ab) => ab.status === "publish");

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
        <title>Blogs</title>
      </Head>
      <div className="blogpage">
        <section className="tophero">
          <div className="container">
            <div className="toptitle">
              <div className="toptitlecont flex">
                <h1>
                  Welcome to <span>Seaside Blogs!</span>
                </h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Nostrum harum aliquam totam atque tempore ad ducimus magni
                  architecto at. Natus ipsam excepturi iste rem, quos ratione
                  incidunt! Magnam, odit atque?
                </p>
                <div className="subemail">
                  <form action="" className="flex">
                    <input
                      onClick={handleSearchOpen}
                      type="text"
                      placeholder="Search blog here..."
                    />
                    <button>Search</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="featured">
              <div className="container">
                <div className="border">
                  <div className="featuredposts">
                    <div className="fetitle flex">
                      <h3>Featcured Posts :</h3>
                    </div>
                    <div className="feposts flex">
                      <Swiper
                        slidesPerView={"auto"}
                        freeMode={true}
                        spaceBetween={30}
                        className="mySwiper"
                        modules={[FreeMode]}
                      >
                        {loading ? (
                          <Spinner />
                        ) : (
                          <>
                            {publishedblogs.slice(0, 6).map((blog) => {
                              return (
                                <SwiperSlide key={blog._id}>
                                  <div className="fpost" key={blog._id}>
                                    <Link href={`/blogs/${blog.slug}`}>
                                      <img
                                        src={blog.images[0]}
                                        alt={blog.title}
                                      />
                                    </Link>
                                    <div className="fpostinfo">
                                      <Swiper
                                        slidesPerView={"auto"}
                                        freeMode={true}
                                        spaceBetween={30}
                                        className="mySwiper"
                                        modules={[FreeMode]}
                                      >
                                        <SwiperSlide>
                                          <div className="tegs flex ">
                                            {blog.blogcategory.map(
                                              (cat, index) => {
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
                                              }
                                            )}
                                          </div>
                                        </SwiperSlide>
                                      </Swiper>
                                      <h2>
                                        <Link href={`/blogs/${blog.slug}`}>
                                          {blog.title}
                                        </Link>
                                      </h2>
                                      <div className="fpostby flex">
                                        <img
                                          src="/img/2.jpg"
                                          alt={blog.title}
                                        />
                                        <p>By Seaside</p>
                                      </div>
                                    </div>
                                  </div>
                                </SwiperSlide>
                              );
                            })}
                          </>
                        )}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {searchInput ? <Blogsearch cls={handleSearchClose} /> : null}
        </section>
        <section className="populartegssec">
          <div className="container">
            <div className="border"></div>
            <div className="populartegsdata">
              <div className="fetitle">
                <h3>Popular Tags</h3>
              </div>
              <div className="poputegs">
                <Link href="/blog/category/Next Js" className="pteg">
                  <img src="/img/source.gif" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Next Js
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/Node Js" className="pteg">
                  <img src="/img/source.gif" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>Node Js
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/React Js" className="pteg">
                  <img src="/img/source.gif" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>React Js
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/Next Js" className="pteg">
                  <img src="/img/source.gif" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>React Js
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/Next Js" className="pteg">
                  <img src="/img/source.gif" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>React Js
                    </div>
                  </div>
                </Link>
                <Link href="/blog/category/Next Js" className="pteg">
                  <img src="/img/source.gif" alt="" />
                  <div className="tegs">
                    <div className="apps">
                      <span></span>React Js
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="latestpostsec">
          <div className="container">
            <div className="border"></div>
            <div className="latestpostsdata">
              <div className="fetitle">
                <h3>Latest Articles</h3>
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
                          <div className="ltegs">
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
        </section>
      </div>
    </>
  );
}
