import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function MyBlog() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null); // State to store selected blog for editing
  const [show, setShow] = useState(false); // Modal state
  const [image, setImage] = useState(null); // State to store selected image
  const [title, setTitle] = useState(''); // State to store title input
  const [content, setContent] = useState(''); // State to store content input
  const navigate = useNavigate();


  const fetchUserBlogs = async () => {
    try {
      const token = localStorage.getItem("token"); 
      console.log("Token:", token); // Debugging: Check if token exists
  
      if (!token) {
        throw new Error("No token found");
      }
  
      const response = await axios.post(
        "https://myblog-backend-3hlz.onrender.com/api/blog/user-blogs",
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      console.log("Fetched Blogs:", response.data); 
      setUserBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(error.response?.data?.message || "Unauthorized: Please log in again");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  const handleShow = (blog) => {
    setSelectedBlog(blog); // Set the selected blog for editing
    setTitle(blog.title); // Set the title of the selected blog in the modal
    setContent(blog.content); // Set the content of the selected blog in the modal
    setImage(null); // Reset the image
    setShow(true);
  };

  const handleClose = () => setShow(false);

  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); 
  };


  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  // Handle save changes (including uploading the new image)
  const handleSaveChanges = async () => {
    const formData = new FormData();
    
    // Append updated blog data and blogId to the form data
    formData.append('title', title);
    formData.append('content', content);
    formData.append('blogId', selectedBlog._id); // Pass blogId to the backend
  
    // Append the image if selected
    if (image) {
      formData.append('image', image); // Include the image in the form data
    } else {
      formData.append('image', selectedBlog.image); // Keep old image if no new image selected
    }
  
    try {
      const response = await axios.patch(`https://myblog-backend-3hlz.onrender.com/api/blog/update/${selectedBlog._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log("Response from backend:", response.data);
  
      // If the backend returns a new image URL, use it
      const updatedImage = response.data.updatedBlog.image || selectedBlog.image; // Get the image URL from the updated blog data
  
      // If successful, update the blog with new data
      const updatedBlog = { ...selectedBlog, title, content, image: updatedImage };
  
      // Update the userBlogs state to reflect the updated blog
      const updatedBlogs = userBlogs.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      );
  
      setUserBlogs(updatedBlogs); // Update the list of blogs
      setSelectedBlog(updatedBlog); // Update selected blog if necessary
      setShow(false); 

    toast.success("Blog updated successfully!");
    } catch (error) {
      console.error("Error updating blog:", error);
      setError('Error updating blog');
    }
  };
  
  const deleteBlog = async (blogid) => {
    try {
      const response = await axios.delete('https://myblog-backend-3hlz.onrender.com/api/blog/remove', {
        data: { id: blogid }
      });
  
      console.log(response.data); 
  
      if (response.data === "blog removed") {
        toast.info("Blog removed successfully");
        await fetchUserBlogs(); 
      } else {
        toast.error("Error removing blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog. Check console for details.");
    }
  };
  
  useEffect(() => {
    fetchUserBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div style={{ minHeight: '100vh' }}>
        <div style={{ marginTop: '170px' }} className="container">
          <h5 className="text-center">My Blogs</h5>
          <div className="row mt-4">
         
            {userBlogs.length > 0 ? (
              userBlogs.map((blog, index) => (
                <div key={index} className="col-md-3 mb-4">
                  <div className="card rounded shadow h-100 " style={{ width: '20rem' }}>
                    <img 
                      className="p-3 rounded w-100 h-50"
                      variant="top"
                      src={`https://myblog-backend-3hlz.onrender.com/images/${blog.image}`} 
                      alt={blog.title}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{blog.title}</h5>
                      <p className="card-text">
                        {blog.content ? blog.content.substring(0, 100) + "..." : "No description available."}
                      </p>
                      <div className="d-flex justify-content-between">
                     <div> <p><span style={{fontWeight:'bold'}}>By</span>:{blog.author}</p>
                      <p style={{fontSize:'12px'}}>{blog.updatedAt}</p></div>
                       
                      
                        
                  <span>      
                      <FontAwesomeIcon style={{color:'blue',cursor:'pointer'}}   onClick={() => handleShow(blog)}  icon={faPenToSquare} />

                  <FontAwesomeIcon  onClick={() => deleteBlog(blog._id)} style={{color:'red',cursor:'pointer'}} className='ms-2' icon={faTrash} />
                      </span>
                      </div>
                    </div>
                    <button
                          onClick={() => navigate(`/postdetails/${blog._id}`)}
                          className="btn btn-dark btn-sm"
                        >
                          Read More <FontAwesomeIcon className='ms-2' icon={faArrowRight} />
                        </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No blogs available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBlog && (
            <>
              <div>
                <h5>Title:</h5>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange} 
                  className="form-control mb-2"
                />
              </div>
              <div>
                <h5>Content:</h5>
                <textarea
                  value={content}
                  onChange={handleContentChange} 
                  className="form-control mb-2"
                  rows="5"
                />
              </div>
              <div>
                <h5>Change Image:</h5>
                <input
                  type="file"
                  className="form-control mb-2"
                  onChange={handleImageChange}
                />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyBlog;
