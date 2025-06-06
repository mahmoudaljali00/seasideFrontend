import Head from "next/head";
import Link from "next/link";
import { BiDownload } from "react-icons/bi";
import {
  FaCalendarDays,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { LiaBasketballBallSolid } from "react-icons/lia";
import { GoArrowUpRight } from "react-icons/go";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { LuMedal } from "react-icons/lu";

export default function Home() {
  // active service backround color
  const [activeIndex, setActiveIndex] = useState(0);

  const handleHover = (index) => {
    setActiveIndex(index);
  };

  const handleMouseOut = () => {
    setActiveIndex(0); // set the first item as active when mouse leaves
  };

  // services data
  const services = [
    {
      title: "Web Development",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi explicabo enim optio! Eum rem atque ipsa a dolore debitis quasi soluta nam, ab minus delectus autem illum, explicabo molestiae nemo!",
    },
    {
      title: "Mobile Development",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi explicabo enim optio! Eum rem atque ipsa a dolore debitis quasi soluta nam, ab minus delectus autem illum, explicabo molestiae nemo!",
    },
    {
      title: "Digital Marketing(SEO)",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi explicabo enim optio! Eum rem atque ipsa a dolore debitis quasi soluta nam, ab minus delectus autem illum, explicabo molestiae nemo!",
    },
    {
      title: "Content Creator",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi explicabo enim optio! Eum rem atque ipsa a dolore debitis quasi soluta nam, ab minus delectus autem illum, explicabo molestiae nemo!",
    },
  ];

  const [loading, setLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [allwork, setAllwork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, blogsResponse] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/blogs"),
        ]);

        const projectData = await projectResponse.json();
        const blogsData = await blogsResponse.json();

        setAlldata(projectData);
        setAllwork(blogsData);
      } catch (error) {
        console.error("Error Fetching Data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // filter project based on selectedcategory
    if (selectedCategory === "All") {
      setFilteredProjects(alldata.filter((pro) => pro.status === "publish"));
    } else {
      setFilteredProjects(
        alldata.filter(
          (pro) =>
            pro.status === "publish" &&
            pro.projectcategory[0] === selectedCategory
        )
      );
    }
  }, [selectedCategory, alldata]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

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

  return (
    <>
      <Head>
        <title>Seaside</title>
        <meta name="description" content="Seaside" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* hero section */}
      <section className="hero">
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              className="animate-stroke"
            >
              WELCOME
            </text>
          </svg>
        </div>
        <div className="container">
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title">Welcome seaside</span>
              <h1 className="hero_title">
                Web Development + <br />{" "}
                <span className="typed-text">Ui Desgner</span>
              </h1>
              <div className="hero_img_box heroimgbox">
                <img src="/img/me.png" alt="seaside" />
              </div>
              <div className="lead">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos nostrum officiis animi quidem quasi rem accusantium.
              </div>
              <div className="hero_btn_box">
                <Link href="/" download={"/img/me.png"} className="download_cv">
                  Download Our Project <BiDownload />
                </Link>
                <ul className="hero_social">
                  <li>
                    <a href="/">
                      <LiaBasketballBallSolid />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <FaFacebook />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <FaYoutube />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* rightside image section */}
            <div className="heroimageright">
              <div className="hero_img_box">
                <img src="/img/me.png" alt="" />
              </div>
            </div>
          </div>
          <div className="funfect_area flex flex-sb">
            <div className="funfect_item">
              <h3>7+</h3>
              <h4>
                Year of <br />
                Experience
              </h4>
            </div>
            <div className="funfect_item">
              <h3>20+</h3>
              <h4>
                Projects <br />
                Complated
              </h4>
            </div>
            <div className="funfect_item">
              <h3>12+</h3>
              <h4>
                OpenSource <br />
                Library
              </h4>
            </div>
            <div className="funfect_item">
              <h3>25+</h3>
              <h4>
                Happy <br />
                Customers
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services">
        <div className="container">
          <div className="services_titles">
            <h2>Our Quality Services</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
              accusantium neque expedita aperiam repellat magnam repellendus
              modi esse rerum aut itaque ab iste,
            </p>
          </div>
          <div className="services_menu">
            {services.map((service, index) => (
              <div
                key={index}
                className={`services_item ${
                  activeIndex === index ? "sactive" : ""
                }`}
                onMouseOver={() => handleHover(index)}
                onMouseOut={handleMouseOut}
              >
                <div className="left_s_box">
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <div className="right_s_box">
                  <p>{service.description}</p>
                </div>
                <GoArrowUpRight />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="projects">
        <div className="container">
          <div className="project_titles">
            <h2>Our Recent Works</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consequatur repellendus mollitia illum quos, itaque laudantium,
            </p>
          </div>
          <div className="project_buttons">
            <button
              className={selectedCategory === "All" ? "active" : ""}
              onClick={() => handleCategoryChange("All")}
            >
              All
            </button>
            <button
              className={
                selectedCategory === "Wibsite Development" ? "active" : ""
              }
              onClick={() => handleCategoryChange("Wibsite Development")}
            >
              Website
            </button>
            <button
              className={selectedCategory === "App Development" ? "active" : ""}
              onClick={() => handleCategoryChange("App Development")}
            >
              Apps
            </button>
            <button
              className={selectedCategory === "E-commerce Site" ? "active" : ""}
              onClick={() => handleCategoryChange("E-commerce Site")}
            >
              Digital
            </button>
            <button
              className={
                selectedCategory === "Prefomance Evaluation" ? "active" : ""
              }
              onClick={() => handleCategoryChange("Prefomance Evaluation")}
            >
              Content
            </button>
          </div>
          <div className="projects_cards">
            {loading ? (
              <div className="flex flex-center wh_50">
                <Spinner />
              </div>
            ) : filteredProjects.length === 0 ? (
              <h1>No Project Found</h1>
            ) : (
              filteredProjects.slice(0, 6).map((pro) => (
                <Link href="/" key={pro._id} className="procard">
                  <div className="proimgbox">
                    <img src={pro.images[0]} alt={pro.title} />
                  </div>
                  <div className="procontentbox">
                    <h2>{pro.title}</h2>
                    <GoArrowUpRight />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Experience study */}
      <section className="exstudy">
        <div className="container flex flex-left flex-sb">
          <div className="experience">
            <div className="experience_title flex gap-1">
              <LuMedal />
              <h2>Our Experience</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card">
                <span>2020 - Present</span>
                <h3>DVTECH IT SOLUTION</h3>
                <p>Full Stack Mobile Developer</p>
              </div>
              <div className="exper_card">
                <span>2018 - 2020</span>
                <h3>BICKDRIMS LLC</h3>
                <p>Front-end Developer (internship)</p>
              </div>
              <div className="exper_card">
                <span>2021 - 2023</span>
                <h3>DVTECH IT SOLUTION</h3>
                <p>Full-Stack Mobile Developer</p>
              </div>
              <div className="exper_card">
                <span>2021 - 2025</span>
                <h3>LEAD DEVELOPER</h3>
                <p>Full Stack Mobile Developer</p>
              </div>
            </div>
          </div>
          <div className="education">
            <div className="experience_title flex gap-1">
              <h2>ـــــــــــــــــــــــــــــــــــــــــــ</h2>
            </div>
            <div className="exper_cards">
              <div className="exper_card">
                <span>2020 - Present</span>
                <h3>DVTECH IT SOLUTION</h3>
                <p>Full Stack Mobile Developer</p>
              </div>
              <div className="exper_card">
                <span>2018 - 2020</span>
                <h3>BICKDRIMS LLC</h3>
                <p>Front-end Developer (internship)</p>
              </div>
              <div className="exper_card">
                <span>2021 - 2023</span>
                <h3>DVTECH IT SOLUTION</h3>
                <p>Full-Stack Mobile Developer</p>
              </div>
              <div className="exper_card">
                <span>2021 - 2025</span>
                <h3>LEAD DEVELOPER</h3>
                <p>Full Stack Mobile Developer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Customer */}
      <section className="myskills">
        <div className="container">
          <div className="myskills_title">
            <h2>Our Customers</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
              quia ut dolor quod blanditiis, molestiae incidunt, ea eius eaque
              beatae voluptate soluta a in fugit accusamus delectus explicabo
              quibusdam sapiente.
            </p>
          </div>
          <div className="myskils_cards">
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/python.svg" alt="python" />
                <h3>2020</h3>
              </div>
              <p className="text-center">Python</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/python.svg" alt="python" />
                <h3>2020</h3>
              </div>
              <p className="text-center">Python</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/python.svg" alt="python" />
                <h3>2020</h3>
              </div>
              <p className="text-center">Python</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/python.svg" alt="python" />
                <h3>2020</h3>
              </div>
              <p className="text-center">Python</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/python.svg" alt="python" />
                <h3>2020</h3>
              </div>
              <p className="text-center">Python</p>
            </div>
            <div className="mys_card">
              <div className="mys_inner">
                <img src="/img/python.svg" alt="python" />
                <h3>2020</h3>
              </div>
              <p className="text-center">Python</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="recentblogs">
        <div className="container">
          <div className="myskills_title">
            <h2>Recent Blogs</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas
              animi id, architecto iure veritatis voluptatum reprehenderit in
              aut obcaecati culpa impedit nesciunt autem odio nulla. Cum quam
              laborum voluptatem ex!
            </p>
          </div>
          <div className="recent_blogs">
            {allwork
              .filter((blog) => blog.status === "publish")
              .slice(0, 3)
              .map((blog) => {
                return (
                  <Link
                    href={`/blogs/${blog.slug}`}
                    key={blog._id}
                    className="re_blog"
                  >
                    <div className="re_blogimg">
                      <img
                        src={blog.images[0] || "/img/noimage.png"}
                        alt={blog.title}
                      />
                      <span>{blog.blogcategory[0]}</span>
                    </div>
                    <div className="re_bloginfo">
                      <div className="re_topdate flex gap-1">
                        <div className="res_date">
                          <FaCalendarDays />{" "}
                          <span>{formatDate(new Date(blog.createdAt))}</span>
                        </div>
                      </div>
                      <h2>{blog.title}</h2>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
