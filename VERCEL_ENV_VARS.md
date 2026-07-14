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
