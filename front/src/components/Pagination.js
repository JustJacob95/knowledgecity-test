import React from 'react';
import '../styles/pagination.css'


function Pagination({currentPage, totalPages, changePage}) {
  return(<div className="pagination">
    {currentPage !== 1 && <div onClick={() => changePage(currentPage - 1)}>
      {'<'}
    </div>}
    {[...Array(totalPages).keys()].map((page, index) => {
      const className = (page + 1) === currentPage ? "current" : "";
      return(<>
        <div key={index} onClick={() => changePage(page + 1)} className={className}>{page + 1}</div>
      </>)
    })}
    {currentPage !== totalPages && <div onClick={() => changePage(currentPage + 1)}>
      {'>'}
    </div>}
  </div>)
}

export default Pagination;