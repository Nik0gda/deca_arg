import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.location.href =
      'https://foundation.app/collection/rcsc?sortOrder=DEFAULT';
  }, []);
  return <div>Redirecting...</div>;
}
