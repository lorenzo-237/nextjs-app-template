'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

function TestSession() {
  const session = useSession();

  if (!session.data) return <p>Not connected</p>;

  return <p>{session.data?.user.email}</p>;
}

export default TestSession;
