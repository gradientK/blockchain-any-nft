export default function Pagination ({ nftsPerPage, totalNfts, paginate }: { nftsPerPage: number, totalNfts: number, paginate: any }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNfts / nftsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(pageNumber => (
          <li key={pageNumber}>
            <a onClick={() => paginate(pageNumber)} href='#'>
              {pageNumber}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}