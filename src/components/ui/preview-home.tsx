import PreviewHomeNft from "./preview-home-nft.tsx"

export default function PreviewHome(params: any) {
  const {
    id0, id1, id2, id3, id4, id5, id6, id7, id8, 
    price0, price1, price2, price3, price4, price5, price6, price7, price8,
    name0, name1, name2, name3, name4, name5, name6, name7, name8,
    uri0, uri1, uri2, uri3, uri4, uri5, uri6, uri7, uri8
  } = params

  // if owner does not have enough to fill 0-8
  // remainder of array will be duplicates of 0
  if (id1 === id0) { 
    return (
      <div>
        <PreviewHomeNft id={id0} price={price0} name={name0} uri={uri0} />
      </div>
    )
  } else if (id2 === id0) { 
    return (
      <div>
        <PreviewHomeNft id={id0} price={price0} name={name0} uri={uri0} />
        <PreviewHomeNft id={id1} price={price1} name={name1} uri={uri1} />
      </div>
    )
  } else if (id3 === id0) { 
    return (
      <div>
        <PreviewHomeNft id={id0} price={price0} name={name0} uri={uri0} />
        <PreviewHomeNft id={id1} price={price1} name={name1} uri={uri1} />
        <PreviewHomeNft id={id2} price={price2} name={name2} uri={uri2} />
      </div>
    ) 
  } else if (id4 === id0) { 
    return (
      <div>
        <PreviewHomeNft id={id0} price={price0} name={name0} uri={uri0} />
        <PreviewHomeNft id={id1} price={price1} name={name1} uri={uri1} />
        <PreviewHomeNft id={id2} price={price2} name={name2} uri={uri2} />
        <PreviewHomeNft id={id3} price={price3} name={name3} uri={uri3} />
      </div>
    ) 
  } else if (id5 === id0) { 
    return (
      <div>
        <PreviewHomeNft id={id0} price={price0} name={name0} uri={uri0} />
        <PreviewHomeNft id={id1} price={price1} name={name1} uri={uri1} />
        <PreviewHomeNft id={id2} price={price2} name={name2} uri={uri2} />
        <PreviewHomeNft id={id3} price={price3} name={name2} uri={uri3} />
        <PreviewHomeNft id={id4} price={price4} name={name4} uri={uri4} />
      </div>
    ) 
  } else if (id6 === id0) { 
    return (
      <div>
        <PreviewHomeNft id={id0} price={price0} name={name0} uri={uri0} />
        <PreviewHomeNft id={id1} price={price1} name={name1} uri={uri1} />
        <PreviewHomeNft id={id2} price={price2} name={name2} uri={uri2} />
        <PreviewHomeNft id={id3} price={price3} name={name2} uri={uri3} />
        <PreviewHomeNft id={id4} price={price4} name={name4} uri={uri4} />
        <PreviewHomeNft id={id5} price={price5} name={name5} uri={uri5} />
      </div>
    ) 
  } else if (id7 === id0) { 
    return (
      <div>
        <PreviewHomeNft id={id0} price={price0} name={name0} uri={uri0} />
        <PreviewHomeNft id={id1} price={price1} name={name1} uri={uri1} />
        <PreviewHomeNft id={id2} price={price2} name={name2} uri={uri2} />
        <PreviewHomeNft id={id3} price={price3} name={name2} uri={uri3} />
        <PreviewHomeNft id={id4} price={price4} name={name4} uri={uri4} />
        <PreviewHomeNft id={id5} price={price5} name={name5} uri={uri5} />
        <PreviewHomeNft id={id6} price={price6} name={name6} uri={uri6} />
      </div>
    ) 
  } else if (id8 === id0) { 
    return (
      <div>
        <PreviewHomeNft id={id0} price={price0} name={name0} uri={uri0} />
        <PreviewHomeNft id={id1} price={price1} name={name1} uri={uri1} />
        <PreviewHomeNft id={id2} price={price2} name={name2} uri={uri2} />
        <PreviewHomeNft id={id3} price={price3} name={name2} uri={uri3} />
        <PreviewHomeNft id={id4} price={price4} name={name4} uri={uri4} />
        <PreviewHomeNft id={id5} price={price5} name={name5} uri={uri5} />
        <PreviewHomeNft id={id6} price={price6} name={name6} uri={uri6} />
        <PreviewHomeNft id={id7} price={price7} name={name7} uri={uri7} />
      </div>
    ) 
  } else { 
    return (
      <div>
        <PreviewHomeNft id={id0} price={price0} name={name0} uri={uri0} />
        <PreviewHomeNft id={id1} price={price1} name={name1} uri={uri1} />
        <PreviewHomeNft id={id2} price={price2} name={name2} uri={uri2} />
        <PreviewHomeNft id={id3} price={price3} name={name2} uri={uri3} />
        <PreviewHomeNft id={id4} price={price4} name={name4} uri={uri4} />
        <PreviewHomeNft id={id5} price={price5} name={name5} uri={uri5} />
        <PreviewHomeNft id={id6} price={price6} name={name6} uri={uri6} />
        <PreviewHomeNft id={id7} price={price7} name={name7} uri={uri7} />
        <PreviewHomeNft id={id8} price={price8} name={name8} uri={uri8} />
      </div>
    ) 
  }
}