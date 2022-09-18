import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let { guesses }: { guesses: string[][] } = req.body;
  const answers = [
    [
      '2009Block0',
      'https://deca.art/sq/teztheszn/3gKAyEDO',
      'xxxxxxxxxxxxxxxxxxrxxxxxxxxxxxxxx',
    ],
    [
      'waleedshah',
      'https://deca.art/sq/teztheszn/LgjA6OMo',
      'https://deca.art/sq/teztheszn/pMYLBEDZ',
    ],
    [
      'hilbertspace',
      'https://deca.art/sq/teztheszn/mDXnyVg0',
      'xxxxxxxxxxxxxxxxxxxgxxxxxxxgxxxxxx',
    ],
    [
      'Deca',
      'https://deca.art/sq/teztheszn/0xA083g8',
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxwexxxx',
    ],
    [
      'NiftyFifty',
      'https://deca.art/sq/teztheszn/0MwzWeDV',
      'xxxxxxxxxxxxxxxxxxxxxxxxfdsxxxxxxxx',
    ],
  ];

  let correct = [false, false, false, false, false];

  for (let i = 0; i < 5; i++) {
    if (
      guesses[i][0].toLowerCase() === answers[i][0].toLowerCase() &&
      (guesses[i][1].toLowerCase() === answers[i][1].toLowerCase() ||
        guesses[i][1].toLowerCase() === answers[i][2])
    )
      correct[i] = true;
  }

  console.log(guesses, correct);

  res.status(200).json({
    correct,
    link: correct.includes(false) ? '' : '/urovmznv_rh_riivovezmg',
  });
}
