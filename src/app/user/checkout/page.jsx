'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  CreditCard,
  Truck,
  CheckCircle,
  Info,
  Shield,
  Clock,
  HelpCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

// Sample cart items
const cartItems = [
  {
    id: 'p1',
    name: 'Golden Muga Silk Mekhela Chador with Traditional Motifs',
    price: 15000,
    quantity: 1,
    image: '/placeholder.svg?height=80&width=80',
    artisan: 'Lakshmi Devi',
  },
  {
    id: 'p7',
    name: 'Longpi Black Pottery Serving Bowl Set',
    price: 3800,
    quantity: 1,
    image: '/placeholder.svg?height=80&width=80',
    artisan: 'Thangi Muivah',
  },
];

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState('shipping');

  // Calculate order summary
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 250;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <div className='container mx-auto px-4 py-8'>
      <Link
        href='/cart'
        className='inline-flex items-center text-muted-foreground hover:text-foreground mb-6'
      >
        <ChevronLeft className='h-4 w-4 mr-1' />
        Back to Cart
      </Link>

      <h1 className='text-3xl font-bold mb-8'>Checkout</h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Order Summary (Left Panel) */}
        <div className='lg:col-span-1 space-y-6'>
          <div className='bg-muted/30 rounded-lg border p-6'>
            <h2 className='text-xl font-semibold mb-4'>Order Summary</h2>

            <div className='space-y-4 mb-6'>
              {cartItems.map((item) => (
                <div key={item.id} className='flex gap-4'>
                  <div className='relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border'>
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-sm font-medium line-clamp-2'>
                      {item.name}
                    </h3>
                    <p className='text-xs text-muted-foreground'>
                      By {item.artisan}
                    </p>
                    <div className='flex justify-between mt-1'>
                      <p className='text-sm'>Qty: {item.quantity}</p>
                      <p className='text-sm font-medium'>
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='space-y-2 text-sm'>
              <div className='flex justify-between'>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className='flex justify-between'>
                <span>Shipping</span>
                <span>₹{shipping.toLocaleString()}</span>
              </div>
              <div className='flex justify-between'>
                <span>Tax (18% GST)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
            </div>

            <Separator className='my-4' />

            <div className='flex justify-between font-semibold'>
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <div className='mt-6'>
              <div className='flex items-center gap-2 mb-2'>
                <Label htmlFor='promo' className='text-sm'>
                  Promo Code
                </Label>
                <Button variant='link' className='text-xs p-0 h-auto'>
                  Have a code?
                </Button>
              </div>
              <div className='flex gap-2'>
                <Input id='promo' placeholder='Enter code' className='h-9' />
                <Button variant='outline' size='sm' className='h-9'>
                  Apply
                </Button>
              </div>
            </div>
          </div>

          <div className='bg-muted/30 rounded-lg border p-6 space-y-4'>
            <div className='flex items-start gap-3'>
              <Shield className='h-5 w-5 text-primary mt-0.5' />
              <div>
                <h3 className='text-sm font-medium'>Secure Checkout</h3>
                <p className='text-xs text-muted-foreground'>
                  All transactions are encrypted and secure
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <Truck className='h-5 w-5 text-primary mt-0.5' />
              <div>
                <h3 className='text-sm font-medium'>Shipping Policy</h3>
                <p className='text-xs text-muted-foreground'>
                  Free shipping on orders above ₹2,000
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <Clock className='h-5 w-5 text-primary mt-0.5' />
              <div>
                <h3 className='text-sm font-medium'>Delivery Timeline</h3>
                <p className='text-xs text-muted-foreground'>
                  7-10 business days for handcrafted items
                </p>
              </div>
            </div>
          </div>

          <div className='text-center'>
            <Button variant='link' className='text-sm gap-2'>
              <HelpCircle className='h-4 w-4' />
              Need help with your order?
            </Button>
          </div>
        </div>

        {/* Checkout Steps (Right Panel) */}
        <div className='lg:col-span-2'>
          <Tabs value={activeStep} className='w-full'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger
                value='shipping'
                onClick={() => setActiveStep('shipping')}
                disabled={activeStep === 'confirmation'}
              >
                Shipping
              </TabsTrigger>
              <TabsTrigger
                value='payment'
                onClick={() => setActiveStep('payment')}
                disabled={
                  activeStep === 'shipping' || activeStep === 'confirmation'
                }
              >
                Payment
              </TabsTrigger>
              <TabsTrigger
                value='confirmation'
                disabled={activeStep === 'shipping' || activeStep === 'payment'}
              >
                Confirmation
              </TabsTrigger>
            </TabsList>

            {/* Shipping Information */}
            <TabsContent value='shipping' className='mt-6'>
              <div className='bg-white rounded-lg border p-6'>
                <h2 className='text-xl font-semibold mb-6'>
                  Shipping Information
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                  <div>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input id='firstName' className='mt-1' />
                  </div>
                  <div>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input id='lastName' className='mt-1' />
                  </div>
                </div>

                <div className='mb-4'>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input id='email' type='email' className='mt-1' />
                </div>

                <div className='mb-4'>
                  <Label htmlFor='phone'>Phone Number</Label>
                  <Input id='phone' className='mt-1' />
                </div>

                <div className='mb-4'>
                  <Label htmlFor='address'>Street Address</Label>
                  <Input id='address' className='mt-1' />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                  <div>
                    <Label htmlFor='city'>City</Label>
                    <Input id='city' className='mt-1' />
                  </div>
                  <div>
                    <Label htmlFor='state'>State</Label>
                    <Select>
                      <SelectTrigger id='state' className='mt-1'>
                        <SelectValue placeholder='Select state' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='assam'>Assam</SelectItem>
                        <SelectItem value='manipur'>Manipur</SelectItem>
                        <SelectItem value='meghalaya'>Meghalaya</SelectItem>
                        <SelectItem value='nagaland'>Nagaland</SelectItem>
                        <SelectItem value='tripura'>Tripura</SelectItem>
                        <SelectItem value='arunachal'>
                          Arunachal Pradesh
                        </SelectItem>
                        <SelectItem value='mizoram'>Mizoram</SelectItem>
                        <SelectItem value='sikkim'>Sikkim</SelectItem>
                        <SelectItem value='other'>Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor='pincode'>PIN Code</Label>
                    <Input id='pincode' className='mt-1' />
                  </div>
                </div>

                <div className='flex items-center space-x-2 mb-6'>
                  <Checkbox id='saveAddress' />
                  <Label htmlFor='saveAddress' className='text-sm font-normal'>
                    Save this address for future orders
                  </Label>
                </div>

                <div className='bg-muted/30 rounded-lg p-4 mb-6'>
                  <h3 className='text-sm font-medium mb-2'>Shipping Method</h3>
                  <RadioGroup defaultValue='standard'>
                    <div className='flex items-center justify-between space-x-2 p-2'>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='standard' id='standard' />
                        <Label htmlFor='standard' className='font-normal'>
                          Standard Shipping (7-10 days)
                        </Label>
                      </div>
                      <span className='text-sm'>₹250</span>
                    </div>
                    <div className='flex items-center justify-between space-x-2 p-2'>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='express' id='express' />
                        <Label htmlFor='express' className='font-normal'>
                          Express Shipping (3-5 days)
                        </Label>
                      </div>
                      <span className='text-sm'>₹450</span>
                    </div>
                  </RadioGroup>
                </div>

                <div className='flex justify-end'>
                  <Button onClick={() => setActiveStep('payment')}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Payment Options */}
            <TabsContent value='payment' className='mt-6'>
              <div className='bg-white rounded-lg border p-6'>
                <h2 className='text-xl font-semibold mb-6'>Payment Method</h2>

                <div className='mb-6'>
                  <RadioGroup defaultValue='card'>
                    <div className='flex items-center space-x-2 p-4 border rounded-lg mb-3'>
                      <RadioGroupItem value='card' id='card' />
                      <Label
                        htmlFor='card'
                        className='font-medium flex items-center gap-2'
                      >
                        <CreditCard className='h-4 w-4' />
                        Credit/Debit Card
                      </Label>
                    </div>

                    <div className='flex items-center space-x-2 p-4 border rounded-lg mb-3'>
                      <RadioGroupItem value='upi' id='upi' />
                      <Label htmlFor='upi' className='font-medium'>
                        UPI Payment
                      </Label>
                    </div>

                    <div className='flex items-center space-x-2 p-4 border rounded-lg mb-3'>
                      <RadioGroupItem value='netbanking' id='netbanking' />
                      <Label htmlFor='netbanking' className='font-medium'>
                        Net Banking
                      </Label>
                    </div>

                    <div className='flex items-center space-x-2 p-4 border rounded-lg'>
                      <RadioGroupItem value='paypal' id='paypal' />
                      <Label htmlFor='paypal' className='font-medium'>
                        PayPal
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className='p-4 border rounded-lg mb-6'>
                  <h3 className='text-sm font-medium mb-4'>Card Details</h3>

                  <div className='mb-4'>
                    <Label htmlFor='cardName'>Name on Card</Label>
                    <Input id='cardName' className='mt-1' />
                  </div>

                  <div className='mb-4'>
                    <Label htmlFor='cardNumber'>Card Number</Label>
                    <Input
                      id='cardNumber'
                      placeholder='XXXX XXXX XXXX XXXX'
                      className='mt-1'
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='expiry'>Expiry Date</Label>
                      <Input id='expiry' placeholder='MM/YY' className='mt-1' />
                    </div>
                    <div>
                      <Label htmlFor='cvv'>CVV</Label>
                      <Input id='cvv' placeholder='XXX' className='mt-1' />
                    </div>
                  </div>
                </div>

                <div className='flex items-center space-x-2 mb-6'>
                  <Checkbox id='saveCard' />
                  <Label htmlFor='saveCard' className='text-sm font-normal'>
                    Save this card for future payments
                  </Label>
                </div>

                <div className='bg-muted/30 rounded-lg p-4 mb-6 flex items-start gap-3'>
                  <Info className='h-5 w-5 text-muted-foreground mt-0.5' />
                  <p className='text-sm text-muted-foreground'>
                    Your payment information is encrypted and secure. We never
                    store your full card details.
                  </p>
                </div>

                <div className='flex justify-between'>
                  <Button
                    variant='outline'
                    onClick={() => setActiveStep('shipping')}
                  >
                    Back to Shipping
                  </Button>
                  <Button onClick={() => setActiveStep('confirmation')}>
                    Place Order
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Order Confirmation */}
            <TabsContent value='confirmation' className='mt-6'>
              <div className='bg-white rounded-lg border p-6 text-center'>
                <div className='mb-6'>
                  <div className='mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4'>
                    <CheckCircle className='h-8 w-8 text-primary' />
                  </div>
                  <h2 className='text-2xl font-semibold mb-2'>
                    Order Confirmed!
                  </h2>
                  <p className='text-muted-foreground'>
                    Thank you for your order. Your order number is{' '}
                    <span className='font-medium text-foreground'>
                      #NE12345
                    </span>
                  </p>
                </div>

                <div className='max-w-md mx-auto mb-8 p-4 bg-muted/30 rounded-lg border text-left'>
                  <h3 className='text-sm font-medium mb-2'>Order Details</h3>
                  <div className='space-y-1 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Order Date:</span>
                      <span>March 17, 2025</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>
                        Payment Method:
                      </span>
                      <span>Credit Card</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>
                        Shipping Method:
                      </span>
                      <span>Standard Shipping</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>
                        Estimated Delivery:
                      </span>
                      <span>March 24-27, 2025</span>
                    </div>
                  </div>
                </div>

                <div className='mb-8 p-6 border border-dashed rounded-lg max-w-md mx-auto'>
                  <h3 className='text-lg font-medium mb-3'>
                    A Note from the Artisans
                  </h3>
                  <p className='text-sm text-muted-foreground italic'>
                    "Thank you for supporting traditional craftsmanship. Each
                    piece you've ordered carries with it centuries of cultural
                    heritage and the dedication of skilled artisans from
                    Northeast India."
                  </p>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Link href='/account/orders'>
                    <Button variant='outline'>Track My Order</Button>
                  </Link>
                  <Link href='/products'>
                    <Button>Continue Shopping</Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* FAQ Section */}
          <div className='mt-8'>
            <h3 className='text-lg font-medium mb-4'>
              Frequently Asked Questions
            </h3>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='item-1'>
                <AccordionTrigger>
                  How long will shipping take?
                </AccordionTrigger>
                <AccordionContent>
                  Most handcrafted items take 7-10 business days to deliver.
                  Each piece is made to order by our artisans, ensuring the
                  highest quality and attention to detail.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-2'>
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We accept returns within 14 days of delivery for items in
                  their original condition. Please note that custom-made items
                  cannot be returned unless damaged or defective.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value='item-3'>
                <AccordionTrigger>
                  Are these products authentic?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, all products are handcrafted by verified artisans from
                  Northeast India. Each piece comes with a certificate of
                  authenticity and information about the artisan who created it.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
