# Morphara Data Schema

> Furniture e-commerce web application

---

## Entities

### User

| Field | Type | Description |
|---|---|---|
| `user_id` | UUID | Primary key |
| `name` | string | Full name |
| `email` | string | Unique email |
| `password_hash` | string | Hashed password |
| `profile_photo_url` | string (URL) | |
| `created_at` | datetime | |

---

### Address

| Field | Type | Description |
|---|---|---|
| `address_id` | UUID | Primary key |
| `user_id` | UUID (FK → User) | |
| `label` | string | e.g. `"Home"`, `"Office"` |
| `recipient_name` | string | |
| `phone` | string | |
| `street` | string | |
| `city` | string | |
| `province` | string | |
| `postal_code` | string | |
| `is_default` | boolean | |

---

### Category

| Field | Type | Description |
|---|---|---|
| `category_id` | UUID | Primary key |
| `name` | string | e.g. `"Sofa"`, `"Table"`, `"Lighting"`, `"Chair"` |
| `slug` | string | URL-friendly name |
| `image_url` | string (URL) | |

---

### Product

| Field | Type | Description |
|---|---|---|
| `product_id` | UUID | Primary key |
| `name` | string | |
| `description` | text | |
| `category_id` | UUID (FK → Category) | |
| `brand` | string | |
| `price` | float | In USD |
| `stock_count` | integer | |
| `dimensions` | JSON | `{"width_cm": 80, "height_cm": 75, "depth_cm": 60}` |
| `weight_kg` | float | |
| `material` | string | e.g. `"Oak Wood"`, `"Linen"` |
| `color_variants` | list\<string\> | Color names or hex |
| `image_urls` | list\<string (URL)\> | Multiple angles |
| `rating_avg` | float | Computed from reviews |
| `rating_count` | integer | |
| `is_active` | boolean | |
| `created_at` | datetime | |

---

### Cart

| Field | Type | Description |
|---|---|---|
| `cart_id` | UUID | Primary key |
| `user_id` | UUID (FK → User) | |
| `created_at` | datetime | |
| `updated_at` | datetime | |

---

### CartItem

| Field | Type | Description |
|---|---|---|
| `cart_item_id` | UUID | Primary key |
| `cart_id` | UUID (FK → Cart) | |
| `product_id` | UUID (FK → Product) | |
| `color` | string | Selected color variant |
| `quantity` | integer | |
| `added_at` | datetime | |

---

### Order

| Field | Type | Description |
|---|---|---|
| `order_id` | UUID | Primary key |
| `user_id` | UUID (FK → User) | |
| `status` | enum | `pending`, `paid`, `processing`, `on_the_way`, `delivered`, `cancelled`, `returned` |
| `items` | list\<OrderItem\> | |
| `subtotal` | float | |
| `shipping_cost` | float | |
| `total_price` | float | |
| `shipping_address_id` | UUID (FK → Address) | |
| `shipping_method` | string | |
| `payment_method` | string | |
| `payment_status` | enum | `unpaid`, `paid`, `refunded` |
| `created_at` | datetime | |
| `updated_at` | datetime | |

**OrderItem:**

| Field | Type | Description |
|---|---|---|
| `product_id` | UUID (FK → Product) | |
| `product_name` | string | Snapshot at time of purchase |
| `color` | string | |
| `quantity` | integer | |
| `unit_price` | float | Price at time of purchase |

---

### OrderTracking

| Field | Type | Description |
|---|---|---|
| `tracking_id` | UUID | Primary key |
| `order_id` | UUID (FK → Order) | |
| `status` | enum | `pending`, `paid`, `processing`, `on_the_way`, `delivered` |
| `description` | string | e.g. `"Package picked up by courier"` |
| `timestamp` | datetime | |

---

### Review

| Field | Type | Description |
|---|---|---|
| `review_id` | UUID | Primary key |
| `product_id` | UUID (FK → Product) | |
| `user_id` | UUID (FK → User) | |
| `order_id` | UUID (FK → Order) | |
| `rating` | integer | 1–5 |
| `comment` | text | |
| `image_urls` | list\<string (URL)\> | Optional review photos |
| `created_at` | datetime | |

---

### Wishlist

| Field | Type | Description |
|---|---|---|
| `wishlist_id` | UUID | Primary key |
| `user_id` | UUID (FK → User) | |
| `product_id` | UUID (FK → Product) | |
| `added_at` | datetime | |

---

### Transaction

| Field | Type | Description |
|---|---|---|
| `transaction_id` | UUID | Primary key |
| `order_id` | UUID (FK → Order) | |
| `user_id` | UUID (FK → User) | |
| `amount` | float | |
| `payment_method` | string | |
| `status` | enum | `pending`, `success`, `failed` |
| `timestamp` | datetime | |

---

## Sample Data

### User

```json
{
  "user_id": "usr-001",
  "name": "Yasmine Rich",
  "email": "yasmine@example.com",
  "password_hash": "$2b$12$...",
  "profile_photo_url": "https://cdn.morphara.com/users/usr-001.jpg",
  "created_at": "2024-08-01T09:00:00Z"
}
```

### Product

```json
{
  "product_id": "prd-001",
  "name": "Oslo Lounge Chair",
  "description": "Minimalist Scandinavian lounge chair with solid oak legs and linen upholstery.",
  "category_id": "cat-003",
  "brand": "Morphara Originals",
  "price": 349.00,
  "stock_count": 18,
  "dimensions": { "width_cm": 75, "height_cm": 82, "depth_cm": 70 },
  "weight_kg": 12.5,
  "material": "Oak Wood, Linen",
  "color_variants": ["Natural", "Charcoal", "Cream"],
  "image_urls": [
    "https://cdn.morphara.com/products/prd-001-front.jpg",
    "https://cdn.morphara.com/products/prd-001-side.jpg"
  ],
  "rating_avg": 4.7,
  "rating_count": 134,
  "is_active": true,
  "created_at": "2024-07-15T00:00:00Z"
}
```

### Order

```json
{
  "order_id": "ord-0041",
  "user_id": "usr-001",
  "status": "on_the_way",
  "items": [
    {
      "product_id": "prd-001",
      "product_name": "Oslo Lounge Chair",
      "color": "Natural",
      "quantity": 1,
      "unit_price": 349.00
    }
  ],
  "subtotal": 349.00,
  "shipping_cost": 25.00,
  "total_price": 374.00,
  "shipping_address_id": "adr-007",
  "shipping_method": "Standard Delivery",
  "payment_method": "Credit Card",
  "payment_status": "paid",
  "created_at": "2025-03-10T11:00:00Z",
  "updated_at": "2025-03-12T08:30:00Z"
}
```
