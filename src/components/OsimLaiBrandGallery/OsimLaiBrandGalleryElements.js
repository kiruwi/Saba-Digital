// src/components/OsimLaiBrandGallery/OsimLaiBrandGalleryElements.js
import styled from 'styled-components';

export const GalleryContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  background: #0c0c0c;
  color: #fff;
  opacity: 1;
  transform: translateY(0);
  animation: galleryAppear 0.8s forwards;
  
  @keyframes galleryAppear {
    from { opacity: 0.8; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const GalleryHeader = styled.div`
  text-align: left;
  margin-bottom: 2rem;
  border-left: 4px solid #2db670;
  padding-left: 1.5rem;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: #b8b8b8;
    font-size: 1.1rem;
  }
`;

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  border-radius: 0px;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  animation: imageContainerAppear 0.8s forwards;
  animation-delay: 0.2s;
  
  /* Always make content visible, not just on hover */
  transform: translateY(0);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transform: translateY(-5px);
  }
  
  &:after {
    content: '${props => props.caption}';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.75rem;
    background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
    color: white;
    opacity: 1; /* Always visible */
    transition: opacity 0.3s ease;
  }
  
  @keyframes imageContainerAppear {
    from { opacity: 0.7; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const DetailImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: transform 0.5s ease;
  image-rendering: -webkit-optimize-contrast; /* Improves image sharpness in Chrome */
  image-rendering: crisp-edges; /* Improves image sharpness in Firefox */
  transform: scale(1.02); /* Slightly scaled by default for better visibility */
  animation: detailImageAppear 1s forwards;
  
  @keyframes detailImageAppear {
    from { opacity: 0.7; transform: scale(1); }
    to { opacity: 1; transform: scale(1.02); }
  }
  
  ${ImageContainer}:hover & {
    transform: scale(1.05);
  }
`;

export const ImageCaption = styled.p`
  position: ${({fullscreen}) => fullscreen ? 'absolute' : 'relative'};
  bottom: ${({fullscreen}) => fullscreen ? '30px' : 'auto'};
  left: ${({fullscreen}) => fullscreen ? '50%' : 'auto'};
  transform: ${({fullscreen}) => fullscreen ? 'translateX(-50%)' : 'none'};
  background: ${({fullscreen}) => fullscreen ? 'rgba(0, 0, 0, 0.7)' : '#1a1a1a'};
  color: #fff;
  padding: 0.75rem 1rem;
  font-size: ${({fullscreen}) => fullscreen ? '1rem' : '0.9rem'};
  width: ${({fullscreen}) => fullscreen ? 'auto' : '100%'};
  text-align: center;
  margin: 0;
  border-bottom-left-radius: ${({fullscreen}) => fullscreen ? '5px' : '0'};
  border-bottom-right-radius: ${({fullscreen}) => fullscreen ? '5px' : '0'};
`;

export const FullscreenOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const FullscreenImage = styled.img`
  max-width: 90%;
  max-height: 85vh;
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  
  &:hover {
    color: #2db670;
  }
`;

export const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ left }) => left ? 'left: 20px;' : ''}
  ${({ right }) => right ? 'right: 20px;' : ''}
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 1000;
  
  &:hover {
    background: rgba(45, 182, 112, 0.8);
  }
`;

export default {};
