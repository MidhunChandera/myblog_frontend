import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Footer from "../src/components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [blogData, setBlogData] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const apiUrl = "https://myblog-backend-8s6s.onrender.com/api/blog/get";
  const navigate = useNavigate();

  // Fetching blog data from the server
  const fetchData = async () => {
    try {
      const response = await axios.post(apiUrl); // Fixed API method
      setBlogData(response.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  // Fetch blog data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Search function
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered blog data based on search and category
  const filteredBlogData = blogData.filter((item) => {
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    const matchesSearch = searchQuery
      ? item.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <div style={{ marginTop: "140px" }} className="container">
          <h1 className="text-center mt-5">
            Welcome to <span className="text-primary">MyBlogsIn</span> <br /> Your Source for Insightful Reads
          </h1>
          <p className="text-center">
            Discover engaging articles, expert insights, and the latest trends on topics that
            matter to you. Whether you're a tech enthusiast, a lifestyle lover, or just looking
            for new ideas, we've got you covered.
          </p>

        
          <input
            type="text"
            placeholder="Search blogs"
            className="form-control mb-3"
            value={searchQuery}
            onChange={handleSearch}
          />

          <div className="container mb-5 mt-3">
            <div className="row justify-content-center">
              <div className="col-md-8 d-flex justify-content-center gap-2 flex-wrap">
                {["All", "Technology", "Health & Fitness", "Personal Development", "Finance & Business", "Lifestyle"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`btn btn-sm ${categoryFilter === category ? "btn-primary" : "btn-dark"}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

         
          <div className="row mt-4">
            {filteredBlogData.length > 0 ? (
              filteredBlogData.map((blog, index) => (
                <div key={index} className="col-md-3 mb-4">
                  <Card className="rounded shadow h-100" style={{ width: "20rem" }}>
                    <Card.Img
                      className="p-3 rounded w-100 h-50"
                      variant="top"
                      src={`https://myblog-backend-8s6s.onrender.com/images/${blog.image}`}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{blog.title || "Untitled"}</Card.Title>
                      <Card.Text className="flex-grow-1">
                        {blog.content ? blog.content.substring(0, 50) + "..." : "No description available."}
                      </Card.Text>
                      <div>
                        <p>
                          <span style={{ fontWeight: "bold" }}>By</span> : {blog.author}
                        </p>
                        <p style={{ fontSize: "12px" }}>{blog.updatedAt}</p>
                      </div>
                      <div className="mt-auto">
                        <button onClick={() => navigate(`/postdetails/${blog._id}`)} className="btn btn-dark w-100">
                          Read More < FontAwesomeIcon className="ms-2" icon={faArrowRight} />
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No blog available</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
