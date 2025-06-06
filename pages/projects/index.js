import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";

export default function projects() {
  const { alldata, loading } = useFetchData("/api/projects");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

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

  return (
    <>
      <Head>
        <title>Project</title>
      </Head>
      <div className="projectpage">
        <div className="projects">
          <div className="container">
            <div className="project_titles">
              <h2>My Recent Works</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
                similique sint repellendus nobis quod fuga!
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
                className={
                  selectedCategory === "App Development" ? "active" : ""
                }
                onClick={() => handleCategoryChange("App Development")}
              >
                Apps
              </button>
              <button
                className={
                  selectedCategory === "E-commerce Site" ? "active" : ""
                }
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
                filteredProjects.map((pro) => (
                  <Link
                    href={`/projects/${pro.slug}`}
                    key={pro._id}
                    className="procard"
                  >
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
        </div>
      </div>
    </>
  );
}
