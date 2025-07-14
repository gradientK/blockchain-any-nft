const quantity: number = 14
const perPage: number = 12

export function GetMockAllIds(): bigint[] {
  return [
    BigInt(1), BigInt(2), BigInt(3), BigInt(4), BigInt(5), BigInt(6), BigInt(7), 
    BigInt(8), BigInt(9), BigInt(10), BigInt(11), BigInt(12), BigInt(13), BigInt(14)
  ].slice(0, quantity)
}

export function GetMockTotalSale(): bigint {
  return BigInt(quantity)
}

export function GetMockTwelveIds(oneOrTwo: number): bigint[] {
  if (oneOrTwo === 1) {
    return GetMockAllIds().slice(0, 12)
  } else if (oneOrTwo === 2) {
    let append: bigint[] = []
    for (let i = 0; i < quantity - (quantity - perPage); i++) {
      append.push(BigInt(0))
    }
    return GetMockAllIds().slice(12, 24).concat(append)
  } else {
    return [BigInt(-1)]
  }
}

export function GetMockNftsData(indexes: bigint[]): [bigint[], string[], string[]] {
  const tmpPrices: bigint[] = []
  const tmpNames: string[] = []
  const tmpUris: string[] = []

  const mockPrices: bigint[] = [
    BigInt(1000000000000000000), BigInt(2000000000000000000), BigInt(3000000000000000000), BigInt(4000000000000000000),
    BigInt(5000000000000000000), BigInt(6000000000000000000), BigInt(7000000000000000000), BigInt(8000000000000000000),
    BigInt(9000000000000000000), BigInt(1000000000000000000), BigInt(1100000000000000000), BigInt(1200000000000000000),
    BigInt(1300000000000000000), BigInt(1400000000000000000)
  ]
  const mockNames: string[] = [
    "American SuperGirl", "Boy Fishing", "Bunny in Wonderland", "Castle in the Sky",
    "Cat in Space", "CyberPunk Girl", "Dancing in the Rain", "Gumball Dog",
    "Tripping Frog", "Smoking Hot Geisha", "The Mech Warrior", "Mushroom Fairies",
    "Icecream Penguins", "Spooky Ghost"
  ]
  const mockUris: string[] = [
    "https://www.dropbox.com/scl/fi/j1ajp8wtvoz2vyosf3u22/americansupergirl.jpg?rlkey=gqj61kefw3aderfab8v9wdu03&st=cqblirnv&raw=1",
    "https://www.dropbox.com/scl/fi/hlzd1n1urt32yac9wwnfb/boyfishingwithfox.jpg?rlkey=4cf6dewi2x3e0zlpz4lfeohid&st=oa2n97h9&raw=1",
    "https://www.dropbox.com/scl/fi/xfzaqxl1qytnj6r3ab8wu/bunnyalice.jpg?rlkey=lrenlybdt4skw280t75v7tds5&st=pqzfgye1&raw=1",
    "https://www.dropbox.com/scl/fi/5kc7t448vyg1o3z15diif/castleinthesky.jpg?rlkey=u6vfzgfyykivkza1d63nsr4u9&st=pyo1nksh&raw=1",
    "https://www.dropbox.com/scl/fi/4vaord3u3y8xno276xj46/catinspace.jpg?rlkey=jes15hupgepzkbmz7rm8cat7h&st=13es8no2&raw=1",
    "https://www.dropbox.com/scl/fi/5mqiz57z4g74uhf8qse58/cybergirl.jpg?rlkey=h31ia38du7kxbnq1dtkws8yzp&st=90e0525o&raw=1",
    "https://www.dropbox.com/scl/fi/oil7b4lpg1af0dwfedeg1/dancingintherain.jpg?rlkey=x5zko8ff2twinh9clbkkbbif6&st=ahfywcei&raw=1",
    "https://www.dropbox.com/scl/fi/ai4p7ynd0h931gqlk2l97/doggumballs.jpg?rlkey=wbf0jzlgxyn23v06rnevy0cbd&st=q8hojm65&raw=1",
    "https://www.dropbox.com/scl/fi/bdlrrcxmp954jzvkhomaj/frogtripping.jpg?rlkey=8rkavks48ho8l3ni7ek9jadn5&st=xrmoa84q&raw=1",
    "https://www.dropbox.com/scl/fi/zyeen1i16i6kuamc3j6ng/geishasmoking.jpg?rlkey=r71w3r1sn5d1zcass4xx1622k&st=h6cwbkej&raw=1",
    "https://www.dropbox.com/scl/fi/0p80rpxx36q6s7zr2en4c/mechwarrior.jpg?rlkey=9ud5shekzhio6wggzee3re61f&st=gmkc6lhm&raw=1",
    "https://www.dropbox.com/scl/fi/rzyyk5zi3tbu2bb57u19h/mushroomfairy.jpg?rlkey=910vtia52uk6l0zmyut8tch34&st=d3q3p8qs&raw=1",
    "https://www.dropbox.com/scl/fi/245ndewkelurl7pb52c69/origamipenguins.jpg?rlkey=njp9pk6tawpb4bd1b30irlzyu&st=c5o0oj8a&raw=1",
    "https://www.dropbox.com/scl/fi/3qlsmwwpl14kixst7rtp6/spookyghost.jpg?rlkey=hxzfaxlrc6ifyux1p5zfpg4jr&st=n1yitt6u&raw=1"
  ]

  for (let i = 0; i < indexes.length; i++) {
    tmpPrices.push(mockPrices.at(Number(indexes.at(i)) - 1) as bigint)
    tmpNames.push(mockNames.at(Number(indexes.at(i)) - 1) as string)
    tmpUris.push(mockUris.at(Number(indexes.at(i)) - 1) as string)
  }
  return [tmpPrices, tmpNames, tmpUris]
}