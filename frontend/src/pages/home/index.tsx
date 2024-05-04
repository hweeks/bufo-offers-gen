import React, { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

const HomeHolster = styled.div`
  grid-area: 2 /2 /2 /3;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 20px;
`;

export const Home = () => {
  const [file, setFile] = useState("");
  const [imageSrc, setImageSrc] = useState('');

  // Handle file changes
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  // React Query mutation for file upload
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append('offered_img', file);

      const response = await fetch('/api/create-offers', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    },
    onSuccess: (data) => {
      // Create a URL for the blob object
      setImageSrc(URL.createObjectURL(data));
    }
  });

  // Handle form submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (file) {
      mutate();
    }
  };

  return (
    <HomeHolster>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={isLoading}>Upload Image</button>
      </form>
      {isError && <p>Error: {(error as any).message}</p>}
      {imageSrc && <img src={imageSrc} alt="Uploaded" />}
    </HomeHolster>
  );
};
