'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Eye, Share2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ProductCard({
  product,
  artisanName,
  showQuickView = false,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.image);

  return (
    <Card className='overflow-hidden group'>
      <div className='relative aspect-square overflow-hidden'>
        <Image
          src={currentImage || '/placeholder.svg'}
          alt={product.name}
          fill
          className='object-cover transition-transform group-hover:scale-105'
          onMouseEnter={() =>
            product.additionalImages?.[0] &&
            setCurrentImage(product.additionalImages[0])
          }
          onMouseLeave={() => setCurrentImage(product.image)}
        />

        {/* Product Badges */}
        <div className='absolute top-2 left-2 flex flex-col gap-2'>
          {product.isLimited && (
            <Badge className='bg-red-500 hover:bg-red-600 text-white border-0'>
              Limited Edition
            </Badge>
          )}
          {product.isEcoFriendly && (
            <Badge className='bg-green-500 hover:bg-green-600 text-white border-0'>
              Eco-Friendly
            </Badge>
          )}
          {product.isAwardWinning && (
            <Badge className='bg-amber-500 hover:bg-amber-600 text-white border-0'>
              Award Winning
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className='absolute top-2 right-2 flex flex-col gap-2'>
          <Button
            variant='ghost'
            size='icon'
            className='bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90'
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </Button>

          <Button
            variant='ghost'
            size='icon'
            className='bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90'
          >
            <Share2 className='h-5 w-5 text-gray-600' />
          </Button>
        </div>

        {/* Quick View & Add to Cart Overlay */}
        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3'>
          {showQuickView && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='secondary' size='sm' className='gap-2'>
                  <Eye className='h-4 w-4' />
                  Quick View
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[800px]'>
                <DialogHeader>
                  <DialogTitle>{product.name}</DialogTitle>
                  <DialogDescription>
                    {artisanName && `Crafted by ${artisanName}`}
                  </DialogDescription>
                </DialogHeader>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='relative aspect-square'>
                    <Image
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      className='object-cover rounded-md'
                    />
                  </div>
                  <div className='flex flex-col justify-between'>
                    <div className='space-y-4'>
                      <div>
                        <h3 className='font-semibold text-xl'>
                          {product.name}
                        </h3>
                        <p className='text-muted-foreground text-sm'>
                          {product.category}
                        </p>
                      </div>

                      <p className='font-semibold text-xl'>
                        ₹{product.price.toLocaleString()}
                      </p>

                      <div className='flex flex-wrap gap-2'>
                        {product.isLimited && (
                          <Badge
                            variant='outline'
                            className='bg-red-50 text-red-700 border-red-200'
                          >
                            Limited Edition
                          </Badge>
                        )}
                        {product.isEcoFriendly && (
                          <Badge
                            variant='outline'
                            className='bg-green-50 text-green-700 border-green-200'
                          >
                            Eco-Friendly
                          </Badge>
                        )}
                      </div>

                      <p className='text-sm'>{product.description}</p>

                      {product.culturalSignificance && (
                        <div className='bg-muted/50 p-3 rounded-md'>
                          <h4 className='text-sm font-medium'>
                            Cultural Significance
                          </h4>
                          <p className='text-xs text-muted-foreground'>
                            {product.culturalSignificance}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className='space-y-3 mt-6'>
                      <Button className='w-full gap-2'>
                        <ShoppingCart className='h-4 w-4' />
                        Add to Cart
                      </Button>
                      <Button
                        variant='outline'
                        className='w-full'
                        onClick={() => setIsFavorite(!isFavorite)}
                      >
                        {isFavorite
                          ? 'Remove from Wishlist'
                          : 'Add to Wishlist'}
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          <Button variant='default' size='sm' className='gap-2'>
            <ShoppingCart className='h-4 w-4' />
            Add to Cart
          </Button>
        </div>
      </div>

      <Link href={`/products/item/${product.id}`}>
        <CardContent className='p-4'>
          <div className='space-y-1'>
            <h3 className='font-medium line-clamp-1'>{product.name}</h3>
            {artisanName && (
              <p className='text-xs text-muted-foreground'>By {artisanName}</p>
            )}
            <p className='font-semibold'>₹{product.price.toLocaleString()}</p>
            <p className='text-sm text-muted-foreground line-clamp-2'>
              {product.shortDescription}
            </p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
