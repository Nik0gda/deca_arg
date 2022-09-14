import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let { guess }: { guess: string } = req.body;

  if (!['bird', 'birds'].includes(guess))
    res.status(200).json({ correct: false });

  res.status(200).json({
    correct: true,
    link: 'https://google.com',
  });
}
