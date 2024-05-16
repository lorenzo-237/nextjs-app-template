import TestSession from '@/components/auth/TestSession';
import React from 'react';

function HomePage() {
  return (
    <div className='relative flex h-fit flex-col bg-background text-foreground'>
      <TestSession />
    </div>
  );
}

export default HomePage;
