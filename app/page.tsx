'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function Home() {
  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  
  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };
  
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };
  
  const calculateWinner = (squares: Array<string | null>) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return squares.every((square) => square !== null) ? 'Tie' : null;
  };
  
  const winner = calculateWinner(board);
  const status = winner
  ? `Winner: ${winner}`
  : winner === 'Tie'
  ? "Its's a Tie"
  : `Next player: ${isXNext ? 'X' : 'O'}`;
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  });

  if (!mounted) return null;
  return (
    <div className='w-full h-screen flex flex-col justify-center gap-y-5 items-center mx-auto bg-gray-800 p-5'>
      <div className='text-white text-lg mb-4'>{status}</div>
      <div className='grid grid-cols-3 gap-2'>
        {board.map((value, index) => (
          <button
            key={index}
            className='bg-white text-black font-bold py-8 px-10 rounded' 
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <Button variant='outline' onClick={handleRestart}>
        Restart game
      </Button>
    </div>
  );
}
