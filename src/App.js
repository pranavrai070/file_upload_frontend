import React, { useState } from "react";

function FileUploader() {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (event) => {
    console.log(event.target);
    setSelectedFiles(event.target.files);
  };

  const handleUpload = () => {
    if (selectedFiles) {
      const formData = new FormData();

      console.log("getting file in console", selectedFiles);

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("data", JSON.stringify({ in_user_id: "105" }));
        formData.append("file", selectedFiles[i]);
        // Use an API endpoint to handle file uploads
        fetch("http://localhost:7000/uploadMedia/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Files uploaded successfully:", data);
          })
          .catch((error) => {
            console.error("Error uploading files:", error);
          });
      }
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Files</button>
    </div>
  );
}

export default FileUploader;
