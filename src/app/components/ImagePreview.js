// components/ImagePreview.js
// ❌ REMOVE THIS if present

import { useEffect, useState } from 'react';
// ❌ REMOVE THIS if present
// ❌ REMOVE THIS if present
import Image from 'next/image';
<Image 
  src="/images/example.jpg" 
  alt="Something" 
  width={600} 
  height={400}
/>

export default function ImagePreview({ file }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl); // clean memory
  }, [file]);

  return file ? (
   <Image 
  src="/images/example.jpg" 
  alt="Preview" 
  width={600}      // ✅ Use actual width
  height={400}     // ✅ Use actual height
  ></Image>
  ) : null;
}
