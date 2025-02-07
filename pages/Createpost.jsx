import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CreatePost() {
  const [blogdetails, setBlogDetails] = useState({
    title: "",
    content: "",
    author: "", 
    category: "",
    image: null, 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blogdetails.title);
    formData.append("content", blogdetails.content);
    formData.append("author", blogdetails.author);
    formData.append("category", blogdetails.category);
    formData.append("image", blogdetails.image);

    const token = localStorage.getItem("token"); // Get token

    if (!token) {
        toast.error("Authentication failed. Please log in.");
        return;
    }

    try {
        const response = await axios.post(
            "https://myblog-backend-3hlz.onrender.com/api/blog/add",
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`, // Correct way to send token
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (response.data.message === "Blog added successfully") {
            toast.success("Blog added successfully!");
            setBlogDetails({
                title: "",
                content: "",
                author: "",
                category: "",
                image: null,
            });
        }
    } catch (error) {
        console.error("Error adding blog:", error);
        toast.error(error.response?.data?.error || "Failed to add blog. Please try again.");
    }
};


  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ marginTop: '170px' }} className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <h5>Create Blog</h5>
            <input
              value={blogdetails.title}
              onChange={(e) => setBlogDetails({ ...blogdetails, title: e.target.value })}
              type="text"
              className='form-control'
              placeholder="Title"
            />
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                className="form-select"
                id="category"
                value={blogdetails.category}
                onChange={(e) => setBlogDetails({ ...blogdetails, category: e.target.value })}
              >
                <option value="" disabled>Select category</option>
                <option value="Technology">Technology</option>
                <option value="Health & Fitness">Health & Fitness</option>
                <option value="Personal Development">Personal Development</option>
                <option value="Finance & Business">Finance & Business</option>
                <option value="Lifestyle">Lifestyle</option>
             
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea
                className="form-control"
                id="content"
                rows="3"
                value={blogdetails.content}
                onChange={(e) => setBlogDetails({ ...blogdetails, content: e.target.value })}
                placeholder="Enter the content"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                value={blogdetails.author}
                onChange={(e) => setBlogDetails({ ...blogdetails, author: e.target.value })}
                placeholder="Enter author's name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(e) => setBlogDetails({ ...blogdetails, image: e.target.files[0] })}
              />
            </div>
            <div className="text-center">
              <button onClick={handleSubmit} className="btn btn-dark mt-3 w-100">
                Add Blog
              </button>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
