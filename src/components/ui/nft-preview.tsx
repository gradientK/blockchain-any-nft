export default function NftPreview(params: any) {
  const { uri0, uri1, uri2, uri3, uri4, uri5, uri6, uri7, uri8, uri9 } = params

  return (
    <div>
      <img
          src={uri0}
          alt={uri0}
          style={{ maxWidth: '200px', height: '200', width: '200', display: 'block' }}
        />
    </div>
  )
}