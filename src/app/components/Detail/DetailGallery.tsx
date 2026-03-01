'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageItem {
  originimgurl: string;
  imgname?: string;
}

interface DetailGalleryProps {
  mainImage: string;
  images?: ImageItem[];
}

const DetailGallery = ({ mainImage, images = [] }: DetailGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const galleryImages = images.filter((img) => img.originimgurl);

  if (!mainImage && galleryImages.length === 0) {
    return null;
  }

  const displayImages =
    galleryImages.length > 0 ? galleryImages : [{ originimgurl: mainImage, imgname: '' }];
  const currentImage = displayImages[selectedImageIndex]?.originimgurl || mainImage;

  return (
    <div className="mb-6">
      <div className="bg-gray-200 relative mb-4 h-96 w-full overflow-hidden rounded-lg">
        <Image
          src={currentImage}
          alt="Gallery"
          fill
          className="object-cover"
          priority
          onError={(e) => {
            e.currentTarget.src = mainImage;
          }}
        />
      </div>

      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                selectedImageIndex === index ? 'border-blue-500' : 'border-gray-300'
              }`}
            >
              <Image
                src={img.originimgurl || mainImage}
                alt={`Gallery ${index}`}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = mainImage;
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailGallery;
