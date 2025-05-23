
export default function NftPreview({ tokenId, name }: { tokenId: bigint, name: string }) {

  const idString: string | undefined = tokenId.toString()
  return (
    <div>
      <p>IDddd is {idString}</p>
      <p>nameeee is {name}</p>

    </div>
  )
}