import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { createPolarCore } from "@polar-sh/sdk/2026-10";

import { db } from "~/server/db";

// SDK client (renamed so it doesn't clash with the auth-client plugin)
const polarSdk = createPolarCore({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  environment: "sandbox", // while learning
});

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }), // reuse `db`, not a 2nd PrismaClient

  emailAndPassword: { enabled: true },

  plugins: [
    polar({
      client: polarSdk,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            { productId: "8de8147c-e9a8-431a-b560-90e668387252", slug: "large" },
            { productId: "797ee720-1a01-48fa-9cb2-5674c7eeec5d", slug: "medium" },
            { productId: "c9198783-862b-468c-aa4c-194e5bd8c5c5", slug: "small" },
          ],
          successUrl: "/dashboard",
          authenticatedUsersOnly: true,
        }),
        portal(),
        usage(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!, // `!` added

          onOrderPaid: async (order) => {
            // Field names changed in the new SDK; check with autocomplete on `order.data.`
            // (likely `customer.externalId` and `product.id` or `productId`)
            const externalCustomerId = order.data.customer.external_id   
            // customer.externalCustomerId;
            const productId = order.data.product_id;

            if (!externalCustomerId) {
              throw new Error("No external customer id found");
            }

            let creditsToAdd = 0;
            switch (productId) {
              case "c9198783-862b-468c-aa4c-194e5bd8c5c5": creditsToAdd = 50; break;
              case "797ee720-1a01-48fa-9cb2-5674c7eeec5d": creditsToAdd = 200; break;
              case "8de8147c-e9a8-431a-b560-90e668387252": creditsToAdd = 400; break;
              default: return; // unknown product: don't touch the DB
            }

            await db.user.update({
              where: { id: externalCustomerId },
              data: { credits: { increment: creditsToAdd } },
            });
          },
        }),
      ],
    }),
    nextCookies(), // keep this last; needed for server-action sign-in
  ],
});