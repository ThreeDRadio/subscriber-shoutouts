import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Initialize the default app
const app = admin.initializeApp();

export const salesHook = functions.https.onRequest(
  async (request, response) => {
    functions.logger.info(request.body);

    const order = request.body;

    try {
      await app
        .firestore()
        .collection("orders")
        .add({
          created: new Date().toISOString(),
          firstName: order?.billing?.first_name,
          city: order?.billing?.city,
          items: order?.line_items?.map((item: any) => ({
            name: item.name,
            meta: item.meta_data,
            bandName:
              item.meta_data?.filter(
                (data: { key: string; value: string }) =>
                  data.key === "Band Name - Name:"
              )[0]?.value || null,
          })),
          total: order?.total,
          note: order?.customer_note,
        });
    } catch (error) {
      functions.logger.error(error);
    }

    response.sendStatus(200);
  }
);
