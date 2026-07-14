# ================================================================
# BREW & BLISS CAFÉ — Vercel Environment Variables Guide
# Add these in: Vercel Dashboard → Project → Settings → Environment Variables
# ================================================================

## ✅ REQUIRED — Add these in Vercel Dashboard:

| Variable Name             | Value                                                                                                          |
|---------------------------|----------------------------------------------------------------------------------------------------------------|
| DATABASE_URL              | postgresql://neondb_owner:npg_MT2hoai5uJtm@ep-mute-wave-atsw7to5-pooler.c-9.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require |
| DATABASE_URL_UNPOOLED     | postgresql://neondb_owner:npg_MT2hoai5uJtm@ep-mute-wave-atsw7to5.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require |
| PGHOST                    | ep-mute-wave-atsw7to5-pooler.c-9.us-east-1.aws.neon.tech                                                     |
| PGHOST_UNPOOLED           | ep-mute-wave-atsw7to5.c-9.us-east-1.aws.neon.tech                                                            |
| PGUSER                    | neondb_owner                                                                                                   |
| PGPASSWORD                | npg_MT2hoai5uJtm                                                                                               |
| PGDATABASE                | neondb                                                                                                         |
| POSTGRES_URL              | postgresql://neondb_owner:npg_MT2hoai5uJtm@ep-mute-wave-atsw7to5-pooler.c-9.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require |
| POSTGRES_URL_NON_POOLING  | postgresql://neondb_owner:npg_MT2hoai5uJtm@ep-mute-wave-atsw7to5.c-9.us-east-1.aws.neon.tech/neondb?channel_binding=require&sslmode=require |
| POSTGRES_USER             | neondb_owner                                                                                                   |
| POSTGRES_HOST             | ep-mute-wave-atsw7to5-pooler.c-9.us-east-1.aws.neon.tech                                                     |
| POSTGRES_PASSWORD         | npg_MT2hoai5uJtm                                                                                               |
| POSTGRES_DATABASE         | neondb                                                                                                         |
| POSTGRES_URL_NO_SSL       | postgresql://neondb_owner:npg_MT2hoai5uJtm@ep-mute-wave-atsw7to5-pooler.c-9.us-east-1.aws.neon.tech/neondb  |
| POSTGRES_PRISMA_URL       | postgresql://neondb_owner:npg_MT2hoai5uJtm@ep-mute-wave-atsw7to5-pooler.c-9.us-east-1.aws.neon.tech/neondb?channel_binding=require&connect_timeout=15&sslmode=require |
| NODE_ENV                  | production                                                                                                     |

## 🖼️ Cloudinary (For hosting & optimizing food/cafe images)
| Variable Name             | Description / Placeholder Value                                                                                |
|---------------------------|----------------------------------------------------------------------------------------------------------------|
| CLOUDINARY_CLOUD_NAME     | your_cloudinary_cloud_name                                                                                     |
| CLOUDINARY_API_KEY        | your_cloudinary_api_key                                                                                        |
| CLOUDINARY_API_SECRET     | your_cloudinary_api_secret                                                                                     |
| CLOUDINARY_URL            | cloudinary://your_api_key:your_api_secret@your_cloud_name                                                     |

## 💳 Payment Gateways (For real transactions)
### Razorpay (Recommended for India)
| Variable Name             | Description / Placeholder Value                                                                                |
|---------------------------|----------------------------------------------------------------------------------------------------------------|
| RAZORPAY_KEY_ID           | rzp_test_xxxxxxxxxxxxx (Test Key) / rzp_live_xxxxxxxxxxxxx (Production)                                        |
| RAZORPAY_KEY_SECRET       | your_razorpay_key_secret                                                                                       |

### Stripe (For Global Payments)
| Variable Name             | Description / Placeholder Value                                                                                |
|---------------------------|----------------------------------------------------------------------------------------------------------------|
| STRIPE_PUBLISHABLE_KEY    | pk_test_YOUR_STRIPE_PUBLISHABLE_KEY                                                                            |
| STRIPE_SECRET_KEY         | sk_test_YOUR_STRIPE_SECRET_KEY                                                                                 |

## 📧 Email Integration (For booking notifications & newsletters)
| Variable Name             | Description / Placeholder Value                                                                                |
|---------------------------|----------------------------------------------------------------------------------------------------------------|
| SMTP_HOST                 | smtp.gmail.com (or your email service provider host)                                                           |
| SMTP_PORT                 | 587                                                                                                            |
| SMTP_USER                 | your_email_username@gmail.com                                                                                  |
| SMTP_PASSWORD             | your_app_specific_password                                                                                     |
| CONTACT_EMAIL             | hello@brewandblisscafe.in (Receiver email for contact form)                                                   |

## 🔒 Security & Authentication
| Variable Name             | Description / Placeholder Value                                                                                |
|---------------------------|----------------------------------------------------------------------------------------------------------------|
| JWT_SECRET                | your_jwt_token_signing_secret_key                                                                              |
| SESSION_SECRET            | a_secure_random_session_secret_passphrase                                                                      |

