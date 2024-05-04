import React, { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";

const HomeHolster = styled.div`
  grid-area: 2 /2 /2 /3;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 20px;
`;

export const Home = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("offered_img", file);

      const response = await fetch("/api/create-offers", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    },
    onSuccess: (data) => {
      setImageSrc(URL.createObjectURL(data));
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (file) {
      mutate();
    }
  };

  return (
    <>
      <HomeHolster>
        <form onSubmit={handleSubmit}>
          <label htmlFor="file">
            what do u want bufo to offer?
            <br />
            <input type="file" accept="image/*" id="file" onChange={handleFileChange} />
          </label>
          <hr />
          <label>
            what filename should it have? (this is what slack will turn into the :filename:)
            <br />
            <input
              type="text"
              placeholder="desired file name"
              onChange={(e) => {
                e.preventDefault();
                setFileName(e.currentTarget.value);
              }}
              value={fileName}
            />
          </label>
          <hr />
          <button type="submit" disabled={isLoading}>
            Upload Image
          </button>
        </form>
        {isError && <p>Error: {(error as any).message}</p>}
        {imageSrc && (
          <a href={imageSrc} download={fileName || "default_filename.png"}>
            click 'save link as' to get the filename
            <br />
            <img src={imageSrc} alt="bufo-offers" />
          </a>
        )}
      </HomeHolster>
    </>
  );
};
