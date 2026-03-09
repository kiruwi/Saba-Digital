// src/components/GSCGallery/GSCGallery.tsx
import React, { useState } from 'react';
import { GraphicsDetailSubtitle } from '../../work/GraphicsElements';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';

// Interface for image data
interface ImageData {
  src: string;
  alt: string;
}

// Simple styled components defined here to avoid any conflicts
const GalleryContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
`;

const GalleryHeader = styled.div`
  margin-bottom: 2rem;
  text-align: left;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const GalleryItem = styled.div`
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: #1a1a1a;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0,0,0,0.3);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  transition: transform 0.3s ease;
  filter: saturate(1); /* Ensure normal saturation */
  image-rendering: auto;
  object-fit: cover;
  flex: 1;
  
  @media (min-width: 1200px) {
    /* Better quality on larger screens */
    image-rendering: -webkit-optimize-contrast;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 0;
  overflow: hidden;
`;

const ModalContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
  filter: saturate(1); /* Ensure normal saturation */
  image-rendering: auto;
  
  @media (min-width: 1200px) {
    /* Better quality on larger screens */
    image-rendering: -webkit-optimize-contrast;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  
  &.prev {
    left: 10px;
  }
  
  &.next {
    right: 10px;
  }
`;

const GSCGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  const imageData: ImageData[] = [
    {
      src: '/assets/projects/3d-graphics/gsc-images/gsc-logo.jpg',
      alt: 'GSC Hauling Logo',
    },
    {
      src: '/assets/projects/3d-graphics/gsc-images/gsc-AD.png',
      alt: 'GSC Hauling Advertisement',
    },
    {
      src: '/assets/projects/3d-graphics/gsc-images/gsc-water.jpg',
      alt: 'GSC Hauling Water Mark Design',
    }
  ];

  const openModal = (index: number): void => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (): void => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: number): void => {
    if (selectedImage !== null) {
      const newIndex = (selectedImage + direction + imageData.length) % imageData.length;
      setSelectedImage(newIndex);
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    // Only close if clicking the background, not the image
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <GalleryContainer>
      <GalleryHeader>
        <GraphicsDetailSubtitle>GSC Hauling Portfolio</GraphicsDetailSubtitle>
        <p>Brand identity and design work for a Seattle-based hauling service company</p>
      </GalleryHeader>
      
      <GalleryGrid>
        {imageData.map((image, index) => (
          <GalleryItem key={index} onClick={() => openModal(index)}>
            <ItemImage src={image.src} alt={image.alt} />
          </GalleryItem>
        ))}
      </GalleryGrid>

      {selectedImage !== null && (
        <ModalOverlay onClick={handleModalClick}>
          <ModalContent>
            <ModalImage 
              src={imageData[selectedImage].src} 
              alt={imageData[selectedImage].alt} 
              onClick={(e) => e.stopPropagation()}
            />
            <CloseButton onClick={closeModal}>
              <FaTimes />
            </CloseButton>
            <NavButton className="prev" onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}>
              <FaChevronLeft />
            </NavButton>
            <NavButton className="next" onClick={(e) => { e.stopPropagation(); navigateImage(1); }}>
              <FaChevronRight />
            </NavButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </GalleryContainer>
  );
};

export default GSCGallery;
