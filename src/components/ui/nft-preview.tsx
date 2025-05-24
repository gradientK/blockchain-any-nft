
export default function NftPreview({ tokenId, price, saleIndex, name, description, uri }: { tokenId: bigint, price: bigint, saleIndex: bigint, name: string, description: string, uri: string }) {

  const idString: string | undefined = tokenId as unknown as string
  const priceString: string | undefined = price as unknown as string
  const saleIndexString: string | undefined = saleIndex as unknown as string
  return (
    <div>
      <p>Token ID is {idString}</p>
      <p>Price is {priceString}</p>
      <p>Sale index is {saleIndexString}</p>
      <p>Name is {name}</p>
      <p>Description is {description}</p>
      <p>Image URI is {uri}</p>
    </div>
  )
}