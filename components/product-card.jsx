import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function ProductCard({ product, artisanName }) {
  return (
    <Card className='overflow-hidden'>
      <div className='relative aspect-square overflow-hidden'>
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          className='object-cover transition-transform hover:scale-105'
        />
        {product.isLimited && (
          <div className='absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full'>
            Limited Edition
          </div>
        )}
      </div>

      <CardContent className='p-4'>
        <div className='space-y-1'>
          <h3 className='font-medium line-clamp-1'>{product.name}</h3>
          {artisanName && (
            <p className='text-xs text-muted-foreground'>By {artisanName}</p>
          )}
          <p className='font-semibold'>₹{product.price.toLocaleString()}</p>
        </div>
      </CardContent>

      <CardFooter className='p-4 pt-0'>
        <Button variant='outline' size='sm' className='w-full gap-2'>
          <ShoppingCart className='h-4 w-4' />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
