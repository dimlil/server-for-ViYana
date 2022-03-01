import mongoose from "mongoose";

export function conectingToDataBase() {
  mongoose.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.error(err);
        throw err;
      }
      console.log("DateBase is setup successfuly");
    }
  );
}
