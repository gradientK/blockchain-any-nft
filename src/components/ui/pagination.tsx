import { useState, useEffect } from "react"

interface PaginationProps {
  nftsPerPage: number
  totalNfts: number
  paginate: (pageNumber: number) => void
  currentPage?: number
}

export default function Pagination({ 
  nftsPerPage, 
  totalNfts, 
  paginate,
  currentPage = 1
}: PaginationProps) {
  const [activePage, setActivePage] = useState(currentPage)
  
  const totalPages = Math.ceil(totalNfts / nftsPerPage)
  
  useEffect(() => {
    setActivePage(currentPage)
  }, [currentPage])

  const handlePageClick = (pageNumber: number) => {
    setActivePage(pageNumber)
    paginate(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisiblePages = 7 // Show max 7 page buttons
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)
      
      if (activePage > 3) {
        pages.push('ellipsis-start')
      }
      
      // Show pages around current page
      const startPage = Math.max(2, activePage - 1)
      const endPage = Math.min(totalPages - 1, activePage + 1)
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
      
      if (activePage < totalPages - 2) {
        pages.push('ellipsis-end')
      }
      
      // Always show last page
      pages.push(totalPages)
    }
    
    return pages
  }

  if (totalPages <= 1) {
    return null // Don't show pagination if only 1 page
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="pagination-container">
      <nav>
        <ul className="pagination">
          <li>
            <button
              onClick={() => handlePageClick(activePage - 1)}
              disabled={activePage === 1}
              className="nav-button"
              aria-label="Previous page"
            >
              ←
            </button>
          </li>

          {pageNumbers.map((page, index) => {
            if (typeof page === 'string') {
              return (
                <li key={`${page}-${index}`}>
                  <button className="ellipsis" disabled>
                    ...
                  </button>
                </li>
              )
            }
            
            return (
              <li key={page}>
                <button
                  onClick={() => handlePageClick(page)}
                  className={activePage === page ? 'active' : ''}
                  aria-label={`Page ${page}`}
                  aria-current={activePage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              </li>
            )
          })}

          <li>
            <button
              onClick={() => handlePageClick(activePage + 1)}
              disabled={activePage === totalPages}
              className="nav-button"
              aria-label="Next page"
            >
              →
            </button>
          </li>

          <li className="page-info">
            Page {activePage} of {totalPages}
          </li>
        </ul>
      </nav>
    </div>
  )
}