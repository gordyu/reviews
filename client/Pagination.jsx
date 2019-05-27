import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Pagination from 'react-paginating';
import { totalmem } from 'os';
import Typography from '@material-ui/core/Typography';
import { Icon, InlineIcon } from '@iconify/react';
import baselineChevronRight from '@iconify/react/ic/baseline-chevron-right';
import twotoneChevronLeft from '@iconify/react/ic/twotone-chevron-left';


var PaginationComponent = ({
  total,
  resultsPerPage,
  pageCount,
  currentPage,
  handlePageChange,
}) => {
  return (
    <Pagination
      total={total}
      limit={resultsPerPage}
      pageCount={pageCount}
      currentPage={currentPage}
      resultsPerPage={Math.ceil(resultsPerPage)}
    >
      {({
        pages,
        currentPage,
        hasNextPage,
        hasPreviousPage,
        previousPage,
        nextPage,
        totalPages,
        getPageItemProps
      }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "300px"
            }}
          >
            {hasPreviousPage && (
              <Icon icon={twotoneChevronLeft}
              style={{
                border: "1px solid #008489 ",
                borderRadius: "50%",
                color: "#008489"
              }}
              {...getPageItemProps({
                pageValue: previousPage,
                onPageChange: handlePageChange
              })}
              />
            )}
            {pages.map(page => {
              let activePage = { color: "#008489", cursor: "pointer" };
              if (currentPage === page) {
                activePage = {
                  border: "1px solid #008489 ",
                  borderRadius: "50%",
                  color: "#008489",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#008489",
                  color: "white"
                };
              }
              if (
                page < currentPage + 3 &&
                page > currentPage - 3 &&
                page != totalPages
              ) {
                return (
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    key={page}
                    style={activePage}
                    {...getPageItemProps({
                      pageValue: page,
                      onPageChange: handlePageChange
                    })}
                  >
                    {page}
                  </Typography>
                );
              }
            })}
            <span>...</span>
            {pages.map(page => {
              let activePage = null;
              if (currentPage === page) {
                activePage = {
                  border: "1px solid #008489 ",
                  borderRadius: "50%",
                  color: "#008489",
                  cursor: "pointer"
                };
              }
              if (page > totalPages - 1) {
                return (
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    key={page}
                    style={activePage}
                    style={{
                      color: "#008489",
                      cursor: "pointer"
                    }}
                    {...getPageItemProps({
                      pageValue: page,
                      onPageChange: handlePageChange
                    })}
                  >
                    {page}
                  </Typography>
                );
              }
            })}
            {hasNextPage && ( 
              <Icon icon={baselineChevronRight}  {...getPageItemProps({
                pageValue: nextPage,
                onPageChange: handlePageChange
              })}
              style={{
                border: "1px solid #008489 ",
                borderRadius: "50%",
                color: "#008489",
                cursor: "pointer"
              }}/>
            )}
          </div>
        </div>
      )}
    </Pagination>
  );
};


export default PaginationComponent;
