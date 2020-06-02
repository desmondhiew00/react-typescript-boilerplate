/* eslint-disable react/destructuring-assignment, react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

// styles
const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 2.5s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }

  @keyframes ellipsis {
    0% {
      content: '';
    }
    20% {
      content: '.';
    }
    40% {
      content: '..';
    }
    60% {
      content: '...';
    }
    80% {
      content: '....';
    }
    100% {
      content: '';
    }
  }
`;

export const LoadingDots = props => <Dots {...props}>{props.children}</Dots>;

export default LoadingDots;

// 0% {
//   content: '.';
// }
// 33% {
//   content: '..';
// }
// 66% {
//   content: '...';
// }
