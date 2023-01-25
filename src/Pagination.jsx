import React from "react";
import { useState } from "react";
import styled from "styled-components";
import "./styles/Pagination.css";

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }

  position: relative;
  transform: translateX(-40%);
`;

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const [num, setNum] = useState();
  const [a, setA] = useState(currentPage);
  return (
    <>
      <nav>
        <div className="pagination">
          {pageNumbers.map((number) => (
            <div key={number} className="page-item">
              {currentPage == number ? (
                <PageSpan
                  onClick={() => {
                    paginate(number);
                    setNum(number);
                    setA("");
                  }}
                  className="page-link"
                  id={number}
                  style={{
                    color: currentPage == number && "#D5C67A",
                    backgroundColor:
                      currentPage == number && "rgba(5, 47, 95, 1)",
                  }}
                >
                  {number}
                </PageSpan>
              ) : (
                <PageSpan
                  onClick={() => {
                    paginate(number);
                    setNum(number);
                    setA("");
                  }}
                  className="page-link"
                  id={number}
                >
                  {number}
                </PageSpan>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Pagination;
