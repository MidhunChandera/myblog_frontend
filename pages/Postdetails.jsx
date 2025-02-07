import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Postdetails() {
  const { blogid } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Fetch blog and comments based on blogid
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.post(`https://myblog-backend-8s6s.onrender.com/api/blog/single/${blogid}`);
        setBlog(response.data.blog);
        setComments(response.data.comments); 
      } catch (error) {
        setError(error.response?.data?.error || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogid]);


 

  const handleCommentSubmit = async () => {
    try {
     
      const token = localStorage.getItem('token');
      if (!token) {
        return alert("You need to log in to comment");
      }
  
      // Decode the token to get the user info
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; 
  

      const response = await axios.post("https://myblog-backend-8s6s.onrender.com/api/comment/add", {
        comment,
        user: userId,  
        blogid: blog._id
      });
  
      // Update comments list with the new comment
      setComments([...comments, response.data.comment]); 
      setComment(""); 
  

      toast.success("Comment submitted successfully!");
      window.location.reload()
    } catch (error) {
      setError("Failed to submit comment");
    }
  };
  
  console.log(comment);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ marginTop: '100px' }} className="container p-5">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="card w-100 p-4 shadow rounded">
              <h2 className="text-center">{blog.title}</h2>
              <img src={`https://myblog-backend-8s6s.onrender.com/images/${blog.image}`} alt={blog.title} style={{ width: '100%', height: 'auto' }} />
              <p className="p-3 mt-2">{blog.content}</p>
            </div>

            <div className="container">
              <h5 className='mt-3'>All Comments...</h5>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment._id} className="comment">
                    <p>{comment.user.username}</p>
                    <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                    <p className="p-3 border">{comment.comment}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet. Be the first to comment!</p>
              )}

              <h5>Leave a Comment</h5>
              <textarea
                className="form-control"
                id="content"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your opinion about this post.."
              ></textarea>
              <button className="w-100 btn btn-dark mt-3" onClick={handleCommentSubmit}>Submit</button>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Postdetails;
