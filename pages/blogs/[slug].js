// pages/blogs/[slug].js

import { SlCalender } from "react-icons/sl";
import { CiRead } from "react-icons/ci";
import { RiFacebookFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import { BsCopy } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import axios from "axios";
import { useRouter } from "next/router";
import useFetchData from "@/hooks/useFetchData";
import { useEffect, useRef, useState } from "react";
import Spinner from "@/components/Spinner";
import Blogsearch from "@/components/Blogsearch";

const BlogPage = () => {
  const router = useRouter();
  const { slug } = router.query; // fetch the slug parameter from the router

  // hook for all data fetching
  const { alldata } = useFetchData("/api/blogs");
  const publishedblogs = alldata.filter((ab) => ab.status === "publish");

  const [searchInput, setSearchInput] = useState(false); // initialize blogs with fetched data

  const handleSearchOpen = () => {
    setSearchInput(!searchInput); // open the search input
  };

  const handleSearchClose = () => {
    setSearchInput(false); // close the search input
  };

  const [blogData, setBlogData] = useState({ blog: {}, comments: [] }); // intialize comments as an empty array
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    title: "",
    contentpera: "",
    maincomment: true,
    parent: null, // track parent comment id for replies
    parentName: "", // track parent comment name
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageOk, setMessageOk] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (slug) {
        try {
          const response = await axios.get(`/api/blogs/${slug}`);
          setBlogData(response.data);
          setLoading(false);
        } catch (error) {
          setError("Failed to fetch data. please try again later.");
          setLoading(false);
        }
      }
    };

    fetchBlogData();
  }, [slug]); // fetch data whenever slug changes

  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission
    try {
      const response = await axios.post(`/api/blogs/${slug}`, newComment);

      //check if its a reply (nested comment) or root comment
      if (newComment.parent) {
        // add the new comment to its parent's children array
        setBlogData((prevData) => {
          const updatedComments = prevData.comments.map((comment) => {
            if (comment._id === newComment.parent) {
              return {
                ...comment,
                children: [
                  ...(comment.children || []), // ensure children is an array
                  response.data, // add the new reply comment
                ],
              };
            } else if (comment.children && comment.children.length > 0) {
              return {
                ...comment,
                children: updateChildrenComments(
                  comment.children,
                  newComment.parent,
                  response.data
                ),
              };
            }
            return comment;
          });
          return { ...prevData, comments: updatedComments };
        });
      } else {
        // add the new comment to the root comments array
        setBlogData((prevData) => ({
          ...prevData,
          comments: [response.data, ...prevData.comments],
        }));
        console.log("New comment added to root comments", newComment);
      }

      setMessageOk("✅ Comment posted successfully!");
      setTimeout(() => {
        setMessageOk("");
      }, 5000); // clear message after 5 seconds

      // clear the form after successfully submission
      setNewComment({
        name: "",
        email: "",
        title: "",
        contentpera: "",
        maincomment: true,
        parent: null, // reset parent comment id
        parentName: "", // reset parent comment name
      });
    } catch (error) {
      console.log(error);
      setMessageOk("❌ Failed to post comment. Please try again.");
      setTimeout(() => {
        setMessageOk("");
      }, 5000); // clear message after 5 seconds
    }
  };

  // function to update children comments recursively
  const updateChildrenComments = (comments, parentId, newComment) => {
    return comments.map((comment) => {
      if (comment._id === parentId) {
        // add the new reply to the children of array of the parent comment
        return {
          ...comment,
          children: [...(comment.children || []), newComment],
        };
      } else if (comment.children && comment.children.length > 0) {
        // recursively update children comments
        return {
          ...comment,
          children: updateChildrenComments(
            comment.children,
            parentId,
            newComment
          ),
        };
      }
      return comment;
    });
  };

  // for scroll down to the comment form after posting a comment
  const replyFormRef = useRef(null);

  const handleRyply = (parentComment) => {
    setNewComment({
      ...newComment,
      maincomment: false, // set main comment to false for replies
      parent: parentComment._id,
      parentName: parentComment.name, // set parent comment name
    });
    if (replyFormRef.current) {
      replyFormRef.current.scrollIntoView({ behavior: "smooth" }); // scroll to the comment form
    }
  };

  const removreply = useRef(null);
  // function to handle removing the reply
  const handleRemoveReply = () => {
    setNewComment({
      ...newComment,
      parent: null,
      parentName: null,
      maincomment: true, // reset main comment to true
    });
    if (removreply.current) {
      removreply.current.scrollIntoView({ behavior: "smooth" }); // scroll to the comment form
    }
  };

  if (loading) {
    return (
      <div className="flex flex-center wh_100">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  ///////////////////date formatting////////////////////
  const createdAtDate = blogData.blog.createdAt
    ? new Date(blogData && blogData.blog.createdAt)
    : null;

  // function to format the date as '20 may 2024 14:11 pm'
  const formatDate = (date) => {
    // check if date if valid
    if (!date || isNaN(date)) {
      return ""; // or handle the error as needed
    }

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour12: true, // use 12-hour format
    };

    return new Intl.DateTimeFormat("en-UK", options).format(date);
  };

  //////////////////// URL for sharing the blog post/////////////////////
  const blogUrl = `http://localhost:3000/blogs/${slug}`;

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000); // reset copied state after 3 seconds
  };

  //////////////////////////// Code component for syntax highlighting and copy functionality //////////////
  const Code = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000); // reset copied state after 3 seconds
    };

    if (inline) {
      return <code>{children}</code>;
    } else if (match) {
      return (
        <div style={{ position: "relative" }}>
          <SyntaxHighlighter
            style={a11yDark}
            language={match[1]}
            PreTag="pre"
            {...props}
            codeTagProps={{
              style: {
                padding: "0",
                borderRadius: "5px",
                overflow: "auto",
                whiteSpace: "pre-wrap",
              },
            }}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
          <button
            onClick={handleCopy}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "1",
              background: "#3d3d3d",
              color: "#fff",
              padding: "10px",
            }}
          >
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>
      );
    } else {
      return (
        <code className="md-post-code" {...props}>
          {children}
        </code>
      );
    }
  };

  const renderComments = (comments) => {
    if (!comments) {
      return null; // handle case where comments are not yet available
    }

    // create a map to efficiently find children of each comment
    const commentsMap = new Map();
    comments.forEach((comment) => {
      if (comment.maincomment) {
        commentsMap.set(comment._id, []);
      }
    });

    // populate children comments into their respective parents
    comments.forEach((comment) => {
      if (!comment.maincomment && comment.parent) {
        if (commentsMap.has(comment.parent)) {
          commentsMap.get(comment.parent).push(comment);
        }
      }
    });

    // render the comments recursively
    return comments
      .filter((comment) => comment.maincomment)
      .map((parentComment) => {
        return (
          <div className="blogcomment" key={parentComment._id}>
            <h3>
              {parentComment.name}
              <span>{new Date(parentComment.createdAt).toLocaleString()}</span>
            </h3>
            <h4>
              Topic: <span>{parentComment.title}</span>{" "}
            </h4>
            <p>{parentComment.contentpera}</p>
            <button onClick={() => handleRyply(parentComment)}> Reply </button>
            {parentComment.parent && (
              <span className="repliedto">
                Reply to {parentComment.parentName}
              </span>
            )}

            <div className="children-comments">
              {commentsMap.get(parentComment._id).map((childComment) => {
                return (
                  <div className="child-comment" key={childComment._id}>
                    <h3>
                      {childComment.name}{" "}
                      <span>
                        {new Date(childComment.createdAt).toLocaleString()}
                      </span>{" "}
                    </h3>
                    <span className="">
                      Replied to {childComment.parentName}{" "}
                    </span>
                    <h4>
                      Topic: <span>{childComment.title}</span>{" "}
                    </h4>
                    <p>{childComment.contentpera}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      });
  };

  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>

      <div>
        {blogData && (
          <div className="blogslugpage">
            <div className="container">
              <div className="blogslugpagecont">
                <div className="leftsitedetails">
                  <div className="leftbloginfoimg">
                    <img
                      src={blogData.blog.images[0] || "/img/noimage.png"}
                      alt={blogData && blogData.title}
                    />
                  </div>
                  <div className="slugbloginfopub">
                    <div className="flex gap-2">
                      <div className="adminslug">
                        <img src="/img/2.jpg" alt="" />
                        <span>By Seaside</span>
                      </div>
                      <div className="adminslug">
                        <SlCalender />
                        <span>{formatDate(createdAtDate)}</span>
                      </div>
                      <div className="adminslug">
                        <CiRead />
                        <span>
                          Comments (
                          {blogData.comments ? blogData.comments.length : 0})
                        </span>
                      </div>
                    </div>

                    <div className="shareblogslug">
                      {/* copy url button */}
                      <div
                        title="Copy URL"
                        onClick={() => handleCopyUrl(blogUrl)}
                        style={{ cursor: "pointer" }}
                      >
                        <BsCopy /> <span>{copied ? "Copied" : ""}</span>
                      </div>

                      {/* social media button */}
                      <a
                        target="_blank"
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          blogUrl
                        )}`}
                        rel="noopener noreferrer"
                      >
                        <RiFacebookFill />
                      </a>
                      <a
                        target="_blank"
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          "Check out this blog post:" + blogUrl
                        )}`}
                        rel="noopener noreferrer"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        target="_blank"
                        href={`https://wa.me/?text=Check out this blog post: ${encodeURIComponent(
                          blogUrl
                        )}`}
                        rel="noopener noreferrer"
                      >
                        <RiWhatsappFill />
                      </a>
                      <a
                        target="_blank"
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          blogUrl
                        )}`}
                        rel="noopener noreferrer"
                      >
                        <BiLogoLinkedin />
                      </a>
                    </div>
                  </div>
                  <h1>{blogData.blog.title}</h1>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <div className="blogcontent">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code: Code,
                        }}
                      >
                        {blogData.blog.description}
                      </ReactMarkdown>
                    </div>
                  )}
                  <div className="blogslugtags">
                    <div className="blogstegs">
                      <h2>Tags:</h2>
                      <div className="flex flex-wrap gap-1">
                        {blogData &&
                          blogData.blog.tags.map((cat) => {
                            return <span key={cat}>{cat}</span>;
                          })}
                      </div>
                    </div>
                  </div>

                  <div className="blogusecomments" ref={removreply}>
                    <h2>Comments</h2>
                    {renderComments(blogData.comments)}
                  </div>
                  <div className="blogslogcomments" ref={replyFormRef}>
                    {newComment.parentName && (
                      <h2>
                        Leave a reply to{" "}
                        <span className="perentname">
                          {newComment.parentName}
                        </span>{" "}
                        <button
                          onClick={handleRemoveReply}
                          className="removereplybtn"
                        >
                          Remove Reply
                        </button>{" "}
                      </h2>
                    )}
                    {!newComment.parentName && <h2>Leave a comment </h2>}
                    <p>
                      Your email address will not be puplish. Required fileds
                      are marked *
                    </p>
                    <form
                      className="leaveareplyform"
                      onSubmit={handleCommentSubmit}
                    >
                      <div className="nameemailcomment">
                        <input
                          type="text"
                          placeholder="Enter Name"
                          value={newComment.name}
                          onChange={(e) =>
                            setNewComment({
                              ...newComment,
                              name: e.target.value,
                            })
                          }
                        />
                        <input
                          type="Email"
                          placeholder="Enter Email"
                          value={newComment.email}
                          onChange={(e) =>
                            setNewComment({
                              ...newComment,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Title"
                        value={newComment.title}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            title: e.target.value,
                          })
                        }
                      />
                      <textarea
                        name=""
                        rows={4}
                        placeholder="Enter Your Comment"
                        id="textcomment"
                        value={newComment.contentpera}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            contentpera: e.target.value,
                          })
                        }
                      />
                      <div className="flex gap-2">
                        <button type="submit">Post Comment</button>
                        <p>{messageOk}</p>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="rightsitedetails">
                  <div className="rightslugsearchbar">
                    <input
                      onClick={handleSearchOpen}
                      type="text"
                      placeholder="Search..."
                    />
                    <button>
                      {" "}
                      <FiSearch />{" "}
                    </button>
                  </div>
                  <div className="rightslugcategory">
                    <h2>CATEGORIES</h2>
                    <ul>
                      {alldata &&
                        ///////////////////////////////// NICE TRICK ///////////////////////////////////////
                        // map through alldata to get unique categories
                        [
                          ...new Set(
                            publishedblogs.map((ab) => ab.blogcategory).flat()
                          ),
                        ].map((cat) => (
                          <Link href={`/blogs/category/${cat}`} key={cat}>
                            <li>
                              {cat}{" "}
                              <span>
                                (
                                {
                                  publishedblogs.filter((ab) =>
                                    ab.blogcategory.includes(cat)
                                  ).length
                                }
                                )
                              </span>
                            </li>
                          </Link>
                        ))}
                    </ul>
                  </div>
                  <div className="rightrecentpost">
                    <h2>RECENT BLOGS</h2>
                    {alldata &&
                      alldata.slice(0, 3).map((blog) => (
                        <Link
                          href={`/blogs/${blog.slug}`}
                          key={blog._id}
                          className="rightrecentp"
                        >
                          <img
                            src={blog.images[0] || "/img/noimage.png"}
                            alt={blog.title}
                          />
                          <div className="ml-05">
                            <h3>{blog.title}</h3>
                            <h5 className="mt-05">
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </h5>
                            <h4 className="mt-1">
                              {blog.tags.slice(0, 3).map((tag, index) => (
                                <span key={index}>{tag}</span>
                              ))}
                            </h4>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {searchInput ? <Blogsearch cls={handleSearchClose} /> : null}
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPage;
