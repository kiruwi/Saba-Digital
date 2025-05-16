// src/components/ProjectCard/index.js
import React from 'react';
import {
  CardContainer,
  ImageWrapper,
  ProjectImage,
  ContentWrapper,
  ProjectTitle,
  ProjectDescription,
  ProjectTags,
  Tag
} from './ProjectCardElements';

const ProjectCard = ({ project }) => {
  const { id, title, shortDescription, image, tags, category } = project;

  return (
    <CardContainer to={`/work/${category}/${id}`}>
      <ImageWrapper>
        <ProjectImage src={image} alt={title} />
      </ImageWrapper>
      <ContentWrapper>
        <ProjectTitle>{title}</ProjectTitle>
        <ProjectDescription>{shortDescription}</ProjectDescription>
        <ProjectTags>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </ProjectTags>
      </ContentWrapper>
    </CardContainer>
  );
};

export default ProjectCard;
