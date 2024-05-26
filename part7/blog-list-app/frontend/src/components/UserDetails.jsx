import React, { useEffect, useState } from "react";

const UserDetails = ({ user }) => {
  const [isLoading, setIsLoading] = useState(!user);

  useEffect(() => {
    if (user) setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
