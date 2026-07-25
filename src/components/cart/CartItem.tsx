'use client'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import QuantitySelector from '@/components/product/QuantitySelector'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/lib/store/cart'
import type { CartItem as CartItemType } from '@/lib/store/cart'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <div className="flex gap-4 p-4 items-start rounded-xl border border-border-soft bg-white hover:border-accent/20 transition-colors">
      <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden bg-bg-soft shrink-0 border border-border-soft">
        <Image
          src={item.imageUrl || '/placeholder-product.svg'}
          alt={item.name}
          fill
          className="object-contain p-2"
          sizes="96px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-text-heading text-sm leading-relaxed line-clamp-2 mb-1">
          {item.name}
        </h3>
        <p className="text-text-muted text-xs mb-3">
          واحد: {formatPrice(item.price)}
        </p>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <QuantitySelector
            value={item.quantity}
            onChange={(qty) => updateQuantity(item.product_id, qty)}
          />
          <p className="font-bold text-primary text-base">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="text-text-muted hover:text-error hover:bg-error-light shrink-0 rounded-lg focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2"
        onClick={() => removeItem(item.product_id)}
        aria-label={`حذف ${item.name} از سبد`}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
